using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Presentation.DTO.User;
using PictureExchangerAPI.Service.Abstractions;

namespace PictureExchangerAPI.Presentation.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Репозиторий для работы с постами
        /// </summary>
        private readonly IPostService _postRepository;

        /// <summary>
        /// Сервис для работы с пользователями
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Контроллер для работы с авторизацией
        /// </summary>
        /// <param name="configuration">Конфигурации</param>
        /// <param name="postRepository">Репозиторий для работы с постами</param>
        public UserController(
            IPostService postRepository,
            IUserService userService)
        {
            _postRepository = postRepository;
            _userService = userService;
        }

        /// <summary>
        /// Получить пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Пользователь</returns>
        [AllowAnonymous]
        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = await _userService.GetByNameAsync(name);
            var responce = new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.Name,
                IsBanned = user.IsBanned,
            };

            return Ok(responce);
        }

        /// <summary>
        /// Получить список постов у пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="model">Начало отчета, конец отчета, часть названия</param>
        /// <returns>Список постов</returns>
        [AllowAnonymous]
        [HttpPost("{name}/posts")]
        public async Task<IActionResult> GetPosts(string name, GetPostsByUserNameDto model)
        {
            List<Post> posts = await _postRepository.GetAsync(model.start, model.length, model.name, name);
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
                },
            });

            return Ok(response);
        }

        /// <summary>
        /// Получить количество постов у пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="model">Часть названия</param>
        /// <returns>Количество постов</returns>
        [AllowAnonymous]
        [HttpPost("{name}/posts/count")]
        public async Task<IActionResult> GetPostsCount(string name, GetPostsCountByUserNameDto model)
        {
            var count = await _postRepository.GetCountAsync(model.name, name);
            return Ok(count);
        }

        /// <summary>
        /// Забанить пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = Policies.Admin)]
        [HttpPut("{name}/banned")]
        public async Task<IActionResult> Banned(string name)
        {
            await _userService.ChangeByNameAsync(name, null, null, true);
            return Ok();
        }

        /// <summary>
        /// Разбанить пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = Policies.Admin)]
        [HttpPut("{name}/unbanned")]
        public async Task<IActionResult> Unbanned(string name)
        {
            await _userService.ChangeByNameAsync(name, null, null, false);
            return Ok();
        }
    }
}
