﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Presentation.DTO.Auth;
using PictureExchangerAPI.Presentation.Exceptions;
using PictureExchangerAPI.Service.Abstractions;

namespace PictureExchangerAPI.Presentation.Controllers
{
    /// <summary>
    /// Контроллер для работы с авторизацией
    /// </summary>
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Конфигурации
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Сервис для авторизации
        /// </summary>
        private readonly IAuthService _authService;

        /// <summary>
        /// Контроллер для работы с авторизацией
        /// </summary>
        /// <param name="configuration">Конфигурации</param>
        /// <param name="authService">Сервис для авторизации</param>
        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        /// <summary>
        /// Зарегистрироваться
        /// </summary>
        /// <param name="model">Имя, электронная почта и пароль</param>
        /// <returns>Токен</returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            string secretKey = _configuration.GetSection("AppSettings:Token").Value!; // Секретный ключ
            string ip = HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString()!; // IP адрес
            string deviceData = HttpContext.Request.Headers["User-Agent"]!; // Данные об устройстве

            var tokens = await _authService.RegisterAsync(model.Name, model.Email, model.Password, secretKey, ip, deviceData); // Получение пары токенов

            var cookieOptions = GetCookieOptions(tokens.DateOfCreation);
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

            return Ok(tokens.AccessToken);
        }

        /// <summary>
        /// Войти в аккаунт
        /// </summary>
        /// <param name="model">Имя или электронная почта и пароль</param>
        /// <returns>Токен</returns>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            string secretKey = _configuration.GetSection("AppSettings:Token").Value!; // Секретный ключ
            string ip = HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString()!; // IP адрес
            string deviceData = HttpContext.Request.Headers["User-Agent"]!; // Данные об устройстве

            var tokens = await _authService.LoginAsync(model.NameOrEmail, model.Password, secretKey, ip, deviceData); // Получение пары токенов

            var cookieOptions = GetCookieOptions(tokens.DateOfCreation);
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

            return Ok(tokens.AccessToken);
        }

        /// <summary>
        /// Выйти с аккаунта
        /// </summary>
        /// <returns>Все хорошо</returns>
        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            string? refreshToken = Request.Cookies["refreshToken"]; // Получаем токен обновления
            if (refreshToken is null) return Ok(); // Если токена обновления нет, то ничего не делать

            await _authService.DeleteTokenAsync(refreshToken); // Удалить токен из базы дынных

            var cookieOptions = GetCookieOptionsDelete();
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

            return Ok();
        }

        /// <summary>
        /// Обновить токены по токену обновления
        /// </summary>
        /// <returns>Токен</returns>
        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            string? refreshToken = Request.Cookies["refreshToken"]; // Достать токен обновления из куки
            if (string.IsNullOrEmpty(refreshToken)) throw new RefreshTokenNotInCookieException(); // Если токена нет, то выдать ошибку

            string secretKey = _configuration.GetSection("AppSettings:Token").Value!; // Секретный ключ
            string ip = HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString()!; // IP адрес
            string deviceData = HttpContext.Request.Headers["User-Agent"]!; // Данные об устройстве

            // Токен обновления записывается в куки

            try
            {
                var tokens = await _authService.RefreshTokenAsync(refreshToken, secretKey, ip, deviceData); // Получение пары токенов
                var cookieOptions = GetCookieOptions(tokens.DateOfCreation);
                Response.Cookies.Append("refreshToken", tokens.RefreshToken, cookieOptions);

                return Ok(tokens.AccessToken);
            }
            catch (Exception ex)
            {
                var cookieOptions = GetCookieOptionsDelete();
                Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
                throw ex;
            }
        }

        /// <summary>
        /// Получить опции для куки
        /// </summary>
        /// <param name="dateOfCreation">Дата создания</param>
        /// <returns>Опции для куки</returns>
        private CookieOptions GetCookieOptions(DateTime dateOfCreation)
        {
            var timeSpan = JwtLifetime.RefreshTimeSpan;
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true, // Куки можно будет изменить только при помощи бекенда, а не при помощи JS
                Secure = true,
                SameSite = SameSiteMode.None, // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = dateOfCreation + timeSpan, // До какого числа будет жить токен
                MaxAge = timeSpan, // До какого числа будет жить токен
            };
            return cookieOptions;
        }

        /// <summary>
        /// Получить опции для удаления куки
        /// </summary>
        /// <returns>Опции для удаления куки</returns>
        private CookieOptions GetCookieOptionsDelete()
        {
            var timeSpan = new TimeSpan(-1, 0, 0, 0);
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true, // Куки можно будет изменить только при помощи бекенда, а не при помощи JS
                Secure = true,
                SameSite = SameSiteMode.None,  // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = DateTime.Now + timeSpan, // Время жизни куков (-1 для удаления)
            };
            return cookieOptions;
        }
    }
}

