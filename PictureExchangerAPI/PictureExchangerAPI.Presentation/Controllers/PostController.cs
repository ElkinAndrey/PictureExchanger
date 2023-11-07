using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Presentation.DTO.Posts;

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
        [HttpPost("")]
        public IActionResult Get(GetPostsDto model)
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
        [HttpPost("count")]
        public IActionResult Count(GetPostsCountDto model)
        {
            var count = 31;
            return Ok(count);
        }

        /// <summary>
        /// Получить пост по id
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Пост</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
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
        public IActionResult Add([FromForm] AddPostDto model)
        {
            return Ok();
        }
    }
}
