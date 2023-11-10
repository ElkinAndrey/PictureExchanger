using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Presentation.DTO.Posts;
using PictureExchangerAPI.Presentation.DTO.User;

namespace PictureExchangerAPI.Presentation.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Получить пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Пользователь</returns>
        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var user = new
            {
                Id = new Guid("00000000-0000-0000-0000-000000000000"),
                Name = "Vasya000",
                Email = "1@2.3",
                IsBanned = false,
            };

            return Ok(user);
        }

        /// <summary>
        /// Получить список постов у пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="model">Начало отчета, конец отчета, часть названия</param>
        /// <returns>Список постов</returns>
        [HttpPost("{name}/posts")]
        public async Task<IActionResult> GetPosts(string name, GetPostsByUserNameDto model)
        {
            var posts = new List<object>()
            {
                new
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000001"),
                    Name = "Аниме картинки",
                    Date = new DateTime(2023, 6, 13, 20, 30, 59),
                    IsPrivate = false,
                    IsBanned = false,
                    Tags = new List<object>() { "аниме", "картинка" },
                    Images = new List<object>() { 1, 2, 3 },
                },
                new
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000002"),
                    Name = "CS GO",
                    Date = new DateTime(2023, 6, 13, 20, 30, 59),
                    IsPrivate = false,
                    IsBanned = false,
                    Tags = new List<object>() { "cs go", "cs", "go" },
                    Images = new List<object>() { 1, 2 },
                },
            };

            return Ok(posts);
        }

        /// <summary>
        /// Получить количество постов у пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="model">Часть названия</param>
        /// <returns>Количество постов</returns>
        [HttpPost("{name}/posts/count")]
        public async Task<IActionResult> GetPostsCount(string name, GetPostsCountByUserNameDto model)
        {
            var count = 13;
            return Ok(count);
        }

        /// <summary>
        /// Забанить пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Все хорошо</returns>
        [HttpPut("{name}/banned")]
        public async Task<IActionResult> Banned(string name)
        {
            return Ok();
        }

        /// <summary>
        /// Разбанить пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Все хорошо</returns>
        [HttpPut("{name}/unbanned")]
        public async Task<IActionResult> Unbanned(string name)
        {
            return Ok();
        }
    }
}
