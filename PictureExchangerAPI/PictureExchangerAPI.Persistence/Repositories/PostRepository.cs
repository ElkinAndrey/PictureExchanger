using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Persistence.DTO;
using PictureExchangerAPI.Persistence.Exceptions;
using static System.Net.Mime.MediaTypeNames;
using System.Runtime.CompilerServices;
using System.Collections.Generic;

namespace PictureExchangerAPI.Persistence.Repositories
{
    /// <summary>
    /// Репозиторий с постами
    /// </summary>
    public class PostRepository : IPostRepository
    {
        /// <summary>
        /// Контекст базы данных
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Репозиторий с постами
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Add(
            Guid userId,
            string name,
            bool isPrivate,
            List<string> tags,
            List<DownloadedFile> images)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) throw new UserNotFoundException();

            var imgs = images.Select((i, num) => new Domain.Entities.Image
            {
                Number = num,
                СontentType = i.ContentType,
                Name = i.FileDownloadName,
            }).ToList();

            var tgs = tags.Select((t, num) => new Tag
            {
                Number = num,
                Text = t,
            }).ToList();

            var post = new Post
            {
                Id = Guid.NewGuid(),
                Name = name,
                DateOfCreation = DateTime.Now,
                IsPrivate = isPrivate,
                IsBanned = false,
                Images = imgs,
                Tags = tgs,
                UserId = userId,
            };

            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }

        public async Task Change(
            Guid postId,
            string? name,
            bool? isPrivate,
            bool? isBanned,
            List<string>? tags,
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
                post.Tags = tags.Select((t, num) => new Tag
                {
                    Number = num,
                    Text = t,
                }).ToList();

            _context.SaveChanges();
        }

        public async Task Delete(
            Guid postId,
            Guid? userId = null)
        {
            var post = await _context.Posts
                .FirstOrDefaultAsync(t => t.Id == postId);

            if (post is not null)
            {
                if (userId is not null) // Если указан пользователь поста
                {
                    var user = await _context.Users // Ищем пользователя
                        .FirstOrDefaultAsync(u => u.Id == userId);
                    if (user is null) throw new UserNotFoundException(); // Если пользователь не найден, то выдать ошибку
                    if (user.Id != post.UserId) throw new UserDoesNotHaveRightsToEditPostException(); // Если пост написал другой человек, то выдать ошибку
                }

                _context.Posts.Remove(post);
            }
        }

        public async Task<List<Post>> Get(
            int start,
            int length,
            string postName,
            string? userName = null)
        {
            return await Task.Run(() =>
            {
                var posts = _context.Posts
                    .Where(p => 
                        p.Name.Contains(postName) && 
                        (userName == null || p.User.Name == userName))
                    .Skip(start)
                    .Take(length);

                return posts.ToList();
            });
        }

        public async Task<Post> GetById(Guid id)
        {
            var post = await _context.Posts
                .FirstOrDefaultAsync(t => t.Id == id);

            if (post is null) throw new PostNotFoundException(); // Ошибка если пост не найден

            return post;
        }

        public async Task<int> GetCount(
            string postName,
            string? userName = null)
        {
            return await Task.Run(() =>
            {
                var count = _context.Posts
                    .Where(p =>
                        p.Name.Contains(postName) &&
                        (userName == null || p.User.Name == userName))
                    .Count();

                return count;
            });
        }
    }
}
