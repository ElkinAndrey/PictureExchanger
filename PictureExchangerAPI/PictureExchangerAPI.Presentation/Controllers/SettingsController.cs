using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Presentation.DTO.Settings;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.Functions;
using System.Runtime.CompilerServices;

namespace PictureExchangerAPI.Presentation.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        /// <summary>
        /// Сервис для работы с пользователями
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Контроллер для работы с авторизацией
        /// </summary>
        /// <param name="userService">Сервис для работы с пользователями</param>
        public SettingsController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Получить настройки пользователя
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            var userId = await GetUserId();
            if (userId is null) return Ok();

            var user = await _userService.GetByIdAsync((Guid)userId);

            return Ok(new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                RegistrationDate = user.RegistrationDate,
                Role = user.Role?.Name,
                IsBanned = user.IsBanned,
                BannedDate = user.BannedDate,
                IsEmailHidden = user.IsEmailHidden,
                IsRegistrationDateHidden = user.IsRegistrationDateHidden,
            });
        }

        /// <summary>
        /// Изменить пароль аккаунта
        /// </summary>
        /// <param name="model">Данные для изменения</param>
        [Authorize]
        [HttpPut("change/password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordSettingsDto model)
        {
            var userId = await GetUserId();
            if (userId is null) return Ok();

            await _userService.ChangePasswordById((Guid)userId, model.Password, model.NewPassword);

            return Ok();
        }

        /// <summary>
        /// Изменить имя аккаунта
        /// </summary>
        /// <param name="model">Данные для изменения</param>
        [Authorize]
        [HttpPut("change/name")]
        public async Task<IActionResult> ChangeName(ChangeNameSettingsDto model)
        {
            var userId = await GetUserId();
            if (userId is null) return Ok();

            await _userService.ChangeNameById((Guid)userId, model.Name);

            return Ok();
        }

        /// <summary>
        /// Изменить электронную почту аккаунта
        /// </summary>
        /// <param name="model">Данные для изменения</param>
        [Authorize]
        [HttpPut("change/email")]
        public async Task<IActionResult> ChangeEmail(ChangeEmailSettingsDto model)
        {
            var userId = await GetUserId();
            if (userId is null) return Ok();

            await _userService.ChangeEmailById((Guid)userId, model.Email);

            return Ok();
        }

        /// <summary>
        /// Изменить параметры аккаунта
        /// </summary>
        /// <param name="model">Данные для изменения</param>
        [Authorize]
        [HttpPut("change")]
        public async Task<IActionResult> Change(ChangeSettingsDto model)
        {
            var userId = await GetUserId();
            if (userId is null) return Ok();

            await _userService.ChangeById((Guid)userId, model.IsEmailHidden, model.IsRegistrationDateHidden);

            return Ok();
        }

        /// <summary>
        /// Получить Id пользователя из JWT
        /// </summary>
        /// <returns></returns>
        private async Task<Guid?> GetUserId()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return null;
            var userId = JWT.GetData(accessToken).Id;
            return userId;
        }
    }
}
