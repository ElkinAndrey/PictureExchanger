using Microsoft.AspNetCore.Mvc;

namespace PictureExchangerAPI.Presentation.Controllers
{
    /// <summary>
    /// Контроллер
    /// </summary>
    [ApiController]
    [Route("api/home")]
    public class HomeController : ControllerBase
    {
        /// <summary>
        /// Привет мир
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult Get()
        {
            return Ok("Привет мир");
        }
    }
}