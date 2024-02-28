using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.Functions;

namespace PictureExchangerAPI.Presentation.Controllers
{
    /// <summary>
    /// Контроллер для работы с ролями
    /// </summary>
    [Route("api/users")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        /// <summary>
        /// Сервис для работы с пользователями
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Контроллер для работы с ролями
        /// </summary>
        /// <param name="userService">Сервис для работы с пользователями</param>
        public RoleController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Выдать роль пользователя
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        [Authorize(Policy = Policies.SuperManager)]
        [HttpPut("{name}/role/user")]
        public async Task<IActionResult> GiveUser(string name)
        {
            var roleChanger = await GetRoleJWT();
            await _userService.ChangeRoleByNameAsync(name, Roles.User, roleChanger ?? "");
            return Ok();
        }

        /// <summary>
        /// Выдать роль менеджера
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        [Authorize(Policy = Policies.SuperManager)]
        [HttpPut("{name}/role/manager")]
        public async Task<IActionResult> GiveManager(string name)
        {
            var roleChanger = await GetRoleJWT();
            await _userService.ChangeRoleByNameAsync(name, Roles.Manager, roleChanger ?? "");
            return Ok();
        }

        /// <summary>
        /// Выдать роль суперменеджера
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        [Authorize(Policy = Policies.Admin)]
        [HttpPut("{name}/role/supermanager")]
        public async Task<IActionResult> GiveSuperManager(string name)
        {
            var roleChanger = await GetRoleJWT();
            await _userService.ChangeRoleByNameAsync(name, Roles.SuperManager, roleChanger ?? "");
            return Ok();
        }

        /// <summary>
        /// Выдать роль администратора
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        [Authorize(Policy = Policies.SuperAdmin)]
        [HttpPut("{name}/role/admin")]
        public async Task<IActionResult> GiveAdmin(string name)
        {
            var roleChanger = await GetRoleJWT();
            await _userService.ChangeRoleByNameAsync(name, Roles.Admin, roleChanger ?? "");
            return Ok();
        }

        /// <summary>
        /// Получить роль из JWT токена
        /// </summary>
        /// <returns>Роль</returns>
        private async Task<string?> GetRoleJWT()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return null;
            var role = JWT.GetData(accessToken).Role;
            return role;
        }
    }
}
