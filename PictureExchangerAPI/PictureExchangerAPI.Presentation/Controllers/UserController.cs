using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PictureExchangerAPI.Presentation.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Получить пользователя по id
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <returns>Пользователь</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var user = new
            {
                Id = new Guid("00000000-0000-0000-0000-000000000000"),
                Name = "Vasya000",
                IsBanned = false,
            };

            return Ok(user);
        }
    }
}
