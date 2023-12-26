﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PictureExchangerAPI.Presentation.DTO.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;

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
        private readonly IConfiguration configuration;

        /// <summary>
        /// Контроллер для работы с авторизацией
        /// </summary>
        /// <param name="configuration">Конфигурации</param>
        public AuthController(IConfiguration configuration)
        {
            this.configuration = configuration;
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
            var secretKey = configuration.GetSection("AppSettings:Token").Value!;

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "123"),
                new Claim(ClaimTypes.Name, "456"),
                new Claim(ClaimTypes.Email, "789"),
                new Claim(ClaimTypes.Role, model.name)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.Add(new TimeSpan(0, 0, 0, 5)), // Время жизни токена доступа
                signingCredentials: creds);
            var access = new JwtSecurityTokenHandler().WriteToken(token);
            var refresh = "123";

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,  // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = DateTime.Now.Add(new TimeSpan(0, 0, 0, 15)), // Время жизни куков
            };
            Response.Cookies.Append("refreshToken", refresh, cookieOptions);
            return Ok(access);
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
            var secretKey = configuration.GetSection("AppSettings:Token").Value!;

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "123"),
                new Claim(ClaimTypes.Name, "456"),
                new Claim(ClaimTypes.Email, "789"),
                new Claim(ClaimTypes.Role, model.nameOrEmail),
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.Add(new TimeSpan(0, 0, 0, 5)),
                signingCredentials: creds);
            var access = new JwtSecurityTokenHandler().WriteToken(token);
            var refresh = "123";

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,  // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = DateTime.Now.Add(new TimeSpan(0, 0, 0, 15)), // Время жизни куков
            };
            Response.Cookies.Append("refreshToken", refresh, cookieOptions);
            return Ok(access);
        }

        /// <summary>
        /// Выйти с аккаунта
        /// </summary>
        /// <returns>Все хорошо</returns>
        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            string? refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken is null)
                return Ok();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,  // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = DateTime.Now.Add(new TimeSpan(-1, 0, 0, 0)), // Время жизни куков (-1 для удаления)
            };
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
            // Достать токен обновления из куки
            string? refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken is null)
            {
                Response.StatusCode = 401;
                return Ok();
            }

            var secretKey = configuration.GetSection("AppSettings:Token").Value!;

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "123"),
                new Claim(ClaimTypes.Name, "456"),
                new Claim(ClaimTypes.Email, "789"),
                new Claim(ClaimTypes.Role, "Manager"),
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.Add(new TimeSpan(0, 0, 0, 5)),
                signingCredentials: creds);
            var access = new JwtSecurityTokenHandler().WriteToken(token);
            var refresh = "123";

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,  // Установите значение SameSite в зависимости от ваших требований безопасности
                Expires = DateTime.Now.Add(new TimeSpan(0, 0, 0, 15)), // Время жизни куков
            };
            Response.Cookies.Append("refreshToken", refresh, cookieOptions);
            return Ok(access);
        }
    }
}

