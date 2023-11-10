using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using PictureExchangerAPI.Presentation.DTO.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace PictureExchangerAPI.Presentation.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Зарегистрироваться
        /// </summary>
        /// <param name="model">Имя, электронная почта и пароль</param>
        /// <returns>Токен</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var secretKey = "secretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKeysecretKey";
            
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "123"), 
                new Claim(ClaimTypes.Email, "123"), 
                new Claim(ClaimTypes.Role, "123") 
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.Add(new TimeSpan(100, 0, 0, 0)),
                signingCredentials: creds);
            var access = new JwtSecurityTokenHandler().WriteToken(token);
            var refresh = "123";

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, 
                Expires = DateTime.Now.Add(new TimeSpan(200, 0, 0, 0)),
            };
            Response.Cookies.Append("refreshToken", refresh, cookieOptions);
            return Ok(access);
        }
    }
}
