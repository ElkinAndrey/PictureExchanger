﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Service.DTO;
using PictureExchangerAPI.Presentation.DTO.Posts;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.Functions;
using PictureExchangerAPI.Persistence.Abstractions;

namespace PictureExchangerAPI.Presentation.Controllers
{
    /// <summary>
    /// Контроллер для работы с постами
    /// </summary>
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        /// <summary>
        /// Сервис для работы с файлами
        /// </summary>
        private readonly IFileRepository _fileService;

        /// <summary>
        /// Репозиторий для работы с постами
        /// </summary>
        private readonly IPostService _postRepository;

        /// <summary>
        /// Контроллер для работы с авторизацией
        /// </summary>
        /// <param name="postRepository">Репозиторий для работы с постами</param>
        /// <param name="fileService">Сервис для работы с файлами</param>
        public PostController(IPostService postRepository, IFileRepository fileService)
        {
            _postRepository = postRepository;
            _fileService = fileService;
        }

        /// <summary>
        /// Получить список постов
        /// </summary>
        /// <param name="model">Начало отчета, конец отчета, часть названия</param>
        /// <returns>Список постов</returns>
        [AllowAnonymous]
        [HttpPost("")]
        public async Task<IActionResult> Get(GetPostsDto model)
        {
            var role = await GetUserRole();
            bool hideBanned = role is null || role == Roles.User;
            bool hidePrivate = role is null || role == Roles.User;
            List<Post> posts = await _postRepository.GetAsync(model.start, model.length, model.name, hideBanned, hidePrivate);
            var response = posts.Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Date = p.DateOfCreation,
                IsPrivate = p.IsPrivate,
                IsBanned = p.IsBanned,
                Tags = p.Tags.OrderBy(t => t.Number).Select(t => t.Text),
                Images = p.Images.OrderBy(t => t.Number).Select(t => t.Number),
                User = new
                {
                    Id = p.User.Id,
                    Name = p.User.Name,
                    IsBanned = p.User.IsBanned,
                    BannedDate = p.User.BannedDate,
                },
            });

            return Ok(response);
        }

        /// <summary>
        /// Получить количество постов
        /// </summary>
        /// <param name="model">Название</param>
        /// <returns>Количество постов</returns>
        [AllowAnonymous]
        [HttpPost("count")]
        public async Task<IActionResult> Count(GetPostsCountDto model)
        {
            var role = await GetUserRole();
            bool hideBanned = role is null || role == Roles.User;
            bool hidePrivate = role is null || role == Roles.User;
            var count = await _postRepository.GetCountAsync(model.name, hideBanned, hidePrivate);
            return Ok(count);
        }

        /// <summary>
        /// Получить пост по id
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Пост</returns>
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            Post post = await _postRepository.GetByIdAsync(id);
            var response = new
            {
                Id = post.Id,
                Name = post.Name,
                Date = post.DateOfCreation,
                IsPrivate = post.IsPrivate,
                IsBanned = post.IsBanned,
                Tags = post.Tags.OrderBy(t => t.Number).Select(t => t.Text),
                Images = post.Images.OrderBy(t => t.Number).Select(t => t.Number),
                User = new
                {
                    Id = post.User.Id,
                    Name = post.User.Name,
                    IsBanned = post.User.IsBanned,
                    BannedDate = post.User.BannedDate,
                },
            };

            return Ok(response);
        }

        /// <summary>
        /// Добавить файл
        /// </summary>
        /// <param name="model">Данные для добавления модели</param>
        /// <returns>Все хорошо</returns>
        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromForm] AddPostDto model)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Ok();

            var userId = JWT.GetData(accessToken).Id;

            IEnumerable<DownloadedFile> images = new List<DownloadedFile>();
            if (model.Files is not null)
                images = model.Files.Select(f => new DownloadedFile(
                    f.OpenReadStream(),
                    f.ContentType,
                    f.FileName));

            await _postRepository.AddAsync(userId, model.Name, model.IsPrivate, model.Tags, images);

            return Ok();
        }

        /// <summary>
        /// Изменить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <param name="model">Название, приватный ли пост, теги</param>
        /// <returns>Все хорошо</returns>
        [Authorize]
        [HttpPut("{id}/change")]
        public async Task<IActionResult> Change(Guid id, ChangePostDto model)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Ok();
            var userId = JWT.GetData(accessToken).Id;

            await _postRepository.ChangeAsync(id, model.Name, model.IsPrivate, null, model.Tags, userId);

            return Ok();
        }

        /// <summary>
        /// Удалить пост по id
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Все хорошо</returns>
        [Authorize]
        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Ok();
            var userId = JWT.GetData(accessToken).Id;

            await _postRepository.DeleteAsync(id, userId);

            return Ok();
        }

        /// <summary>
        /// Получить картинку по посту и номеру
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <param name="number">Номер картинки</param>
        /// <returns>Картинка</returns>
        [AllowAnonymous]
        [HttpGet("{id}/{number}")]
        public async Task<IActionResult> GetImage(Guid id, int number)
        {
            var url = await _fileService.GetPostImageUrlAsync(id, number);
            return Redirect(url);
        }

        /// <summary>
        /// Забанить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = Policies.Manager)]
        [HttpPut("{id}/banned")]
        public async Task<IActionResult> Banned(Guid id)
        {
            await _postRepository.ChangeAsync(id, null, null, true, null, null);
            return Ok();
        }

        /// <summary>
        /// Разбанить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = Policies.Manager)]
        [HttpPut("{id}/unbanned")]
        public async Task<IActionResult> Unbanned(Guid id)
        {
            await _postRepository.ChangeAsync(id, null, null, false, null, null);
            return Ok();
        }

        /// <summary>
        /// Получить Id пользователя из JWT
        /// </summary>
        /// <returns></returns>
        private async Task<string?> GetUserRole()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return null;
            var role = JWT.GetData(accessToken).Role;
            return role;
        }
    }
}
