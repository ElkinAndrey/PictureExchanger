using Microsoft.IdentityModel.Tokens;
using PictureExchangerAPI.Domain.Constants;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace PictureExchangerAPI.Service.Functions
{
    public static class JWT
    {
        /// <summary>
        /// Создать токен доступа
        /// </summary>
        /// <param name="claims">Параметры</param>
        /// <param name="secretKey">Секретный ключ</param>
        /// <returns>Токен доступа</returns>
        public static string CreateAccessToken(List<Claim> claims, string secretKey, DateTime date)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: date.Add(JwtLifetime.AccessTimeSpan),
                signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        /// <summary>
        /// Создать токен обновления
        /// </summary>
        /// <returns>Токен обновления</returns>
        public static string CreateRefreshToken()
            => Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}
