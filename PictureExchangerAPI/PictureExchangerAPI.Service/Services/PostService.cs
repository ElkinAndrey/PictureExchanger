using Microsoft.EntityFrameworkCore;
using Minio;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.DTO;
using PictureExchangerAPI.Service.Exceptions;
using System;

namespace PictureExchangerAPI.Service.Repositories
{
    /// <summary>
    /// Репозиторий с постами
    /// </summary>
    public class PostService : IPostService
    {
        /// <summary>
        /// Контекст базы данных
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Сервис взаимодействия с файлами
        /// </summary>
        private readonly IFileRepository _fileService;

        /// <summary>
        /// Репозиторий с постами
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public PostService(ApplicationDbContext context, IFileRepository fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task AddAsync(
            Guid userId,
            string name,
            bool isPrivate,
            IEnumerable<string> tags,
            IEnumerable<DownloadedFile> images)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null) throw new UserNotFoundException();
            if (images is null) images = new List<DownloadedFile>();
            if (tags is null) tags = new List<string>();

            Guid id = Guid.NewGuid();

            int imageNumber = 1;
            var imgs = new List<Domain.Entities.Image>();
            var tasks = new List<Task>();
            foreach (var image in images)
            {
                var img = new Domain.Entities.Image
                {
                    Number = imageNumber,
                    СontentType = image.ContentType,
                    Name = image.FileDownloadName,
                };
                imgs.Add(img);
                tasks.Add(_fileService.AddPostImageAsync(id, imageNumber, image.Stream, image.ContentType));
                ++imageNumber;
            }

            var tgs = tags.Select((t, num) => new Tag
            {
                Number = num,
                Text = t,
            }).ToList();

            var post = new Post
            {
                Id = id,
                Name = name,
                DateOfCreation = DateTime.Now,
                IsPrivate = isPrivate,
                IsBanned = false,
                Images = imgs,
                Tags = tgs,
                UserId = userId,
            };

            async Task Add()
            {
                await _context.Posts.AddAsync(post);
                await _context.SaveChangesAsync();
            }
            tasks.Add(Add());
            await Task.WhenAll(tasks);
            var a = "1";
            await Console.Out.WriteLineAsync(a);
        }

        public async Task ChangeAsync(
            Guid postId,
            string? name,
            bool? isPrivate,
            bool? isBanned,
            IEnumerable<string>? tags,
            Guid? userId = null)
        {
            var post = await _context.Posts // Находим пост
                .FirstOrDefaultAsync(p => p.Id == postId);

            if (post is null) throw new PostNotFoundException(); // Ошибка если пост не найден
            if (userId is not null) // Если указан пользователь поста
            {
                var user = await _context.Users // Ищем пользователя
                    .FirstOrDefaultAsync(u => u.Id == userId);
                if (user is null) throw new UserNotFoundException(); // Если пользователь не найден, то выдать ошибку
                if (user.Id != post.UserId) throw new UserDoesNotHaveRightsToEditPostException(); // Если пост написал другой человек, то выдать ошибку
            }

            if (name is not null) post.Name = (string)name; // Изменение имени
            if (isPrivate is not null) post.IsPrivate = (bool)isPrivate; // Изменение приватности
            if (isBanned is not null) post.IsBanned = (bool)isBanned; // Изменение бана
            if (tags is not null) // Изменение тэгов
            {
                var oldTags = _context.Tags.Where(t => t.PostId == postId);
                _context.Tags.RemoveRange(oldTags);
                post.Tags = tags.Select((t, num) => new Tag
                {
                    Number = num,
                    Text = t,
                }).ToList();
            }

            _context.SaveChanges();
        }

        public async Task DeleteAsync(
            Guid postId,
            Guid? userId = null)
        {
            var post = await _context.Posts
                .FirstOrDefaultAsync(t => t.Id == postId);
            if (post is null) return;

            if (userId is not null) // Если указан пользователь поста
            {
                var user = await _context.Users // Ищем пользователя
                    .FirstOrDefaultAsync(u => u.Id == userId);
                if (user is null) throw new UserNotFoundException(); // Если пользователь не найден, то выдать ошибку
                if (user.Id != post.UserId) throw new UserDoesNotHaveRightsToEditPostException(); // Если пост написал другой человек, то выдать ошибку
            }

            async Task Remove()
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
            }

            var removeTask = Remove();
            var imageTask = _fileService.DeletePostImagesAsync(post.Id);
            await Task.WhenAll(removeTask, imageTask);
        }

        public async Task<List<Post>> GetAsync(
            int start,
            int length,
            string postName,
            bool hideBanned = false,
            bool hidePrivate = false,
            string? userName = null)
        {
            return await Task.Run(() =>
            {
                var posts = _context.Posts
                    .Include(p => p.User)
                    .Include(p => p.Tags)
                    .Include(p => p.Images)
                    .Where(p =>
                        p.Name.Contains(postName) &&
                        (userName == null || p.User.Name == userName) &&
                        (!hideBanned || !p.IsBanned) &&
                        (!hidePrivate || !p.IsPrivate))
                    .OrderByDescending(p => p.DateOfCreation)
                    .Skip(start)
                    .Take(length);

                return posts.ToList();
            });
        }

        public async Task<Post> GetByIdAsync(Guid id)
        {
            var post = await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Tags)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (post is null) throw new PostNotFoundException(); // Ошибка если пост не найден

            return post;
        }

        public async Task<int> GetCountAsync(
            string postName,
            bool hideBanned = false,
            bool hidePrivate = false,
            string? userName = null)
        {
            return await Task.Run(() =>
            {
                var count = _context.Posts
                    .Where(p =>
                        p.Name.Contains(postName) &&
                        (userName == null || p.User.Name == userName) &&
                        (!hideBanned || !p.IsBanned) &&
                        (!hidePrivate || !p.IsPrivate))
                    .Count();

                return count;
            });
        }
    }
}
