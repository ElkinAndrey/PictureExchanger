using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Presentation.DTO.Posts;
using static System.Net.Mime.MediaTypeNames;

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
        /// Получить список постов
        /// </summary>
        /// <param name="model">Начало отчета, конец отчета, часть названия</param>
        /// <returns>Список постов</returns>
        [AllowAnonymous]
        [HttpPost("")]
        public async Task<IActionResult> Get(GetPostsDto model)
        {
/*            var n = Request.Cookies["cookieName"];
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None  // Установите значение SameSite в зависимости от ваших требований безопасности
            };
            Response.Cookies.Append("cookieName", "cookieValue", cookieOptions);*/

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
                    User = new
                    {
                        Id = new Guid("00000000-0000-0000-0000-000000000002"),
                        Name = "Igor123",
                        IsBanned = true,
                    },
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
                    User = new
                    {
                        Id = new Guid("00000000-0000-0000-0000-000000000000"),
                        Name = "Vasya000",
                        IsBanned = false,
                    },
                },
            };

            return Ok(posts);
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
            var count = 31;
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
            var post = new
            {
                Id = new Guid("00000000-0000-0000-0000-000000000002"),
                Name = "CS GO",
                Date = new DateTime(2023, 6, 13, 20, 30, 59),
                IsPrivate = false,
                IsBanned = false,
                Tags = new List<object>() { "cs go", "cs", "go" },
                Images = new List<object>() { 1, 2 },
                User = new
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000000"),
                    Name = "Vasya000",
                    IsBanned = false,
                },
            };

            return Ok(post);
        }

        /// <summary>
        /// Добавить файл
        /// </summary>
        /// <param name="model">Данные для добавления модели</param>
        /// <returns>Все хорошо</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> Add([FromForm] AddPostDto model)
        {
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
            var image = new FileStream($"HelpFiles\\picture.png", FileMode.Open, FileAccess.Read, FileShare.Read);
            return File(image, "image/png");
        }

        /// <summary>
        /// Забанить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = "Manager")]
        [HttpPut("{id}/banned")]
        public async Task<IActionResult> Banned(Guid id)
        {
            return Ok();
        }

        /// <summary>
        /// Разбанить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Все хорошо</returns>
        [Authorize(Policy = "Manager")]
        [HttpPut("{id}/unbanned")]
        public async Task<IActionResult> Unbanned(Guid id)
        {
            return Ok();
        }
    }
}
