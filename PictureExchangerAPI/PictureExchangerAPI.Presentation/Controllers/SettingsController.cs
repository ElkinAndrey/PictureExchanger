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

        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Ok();
            var userId = JWT.GetData(accessToken).Id;

            var user = await _userService.GetByIdAsync(userId);

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

        [Authorize]
        [HttpPut("/change")]
        public async Task<IActionResult> Change(ChangeSettingsDto model)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Ok();
            var userId = JWT.GetData(accessToken).Id;

            await _userService.ChangeByIdWithCheckingPasswordAsync(
                id: userId,
                currentPassword: model.CurrentPassword,
                newName: model.Name,
                email: model.Email,
                isBanned: null,
                role: null,
                roleChanger: null,
                isEmailHidden: model.IsEmailHidden,
                isRegistrationDateHidden: model.IsRegistrationDateHidden,
                password: model.Password);

            return Ok();
        }
    }
}
