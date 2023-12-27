using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Service.DTO;
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

        /// <summary>
        /// Получить данные из JWT токена
        /// </summary>
        /// <param name="token">Токен</param>
        /// <returns>Данные в виде клаймов</returns>
        public static DataFromJWT GetData(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var claims = jwtSecurityToken.Claims;

            var dataFromJWT = new DataFromJWT();
            foreach (var claim in claims)
            {
                if (claim.Type == ClaimTypes.NameIdentifier)
                    dataFromJWT.Id = new Guid(claim.Value);
                else if (claim.Type == ClaimTypes.Name)
                    dataFromJWT.Name = claim.Value;
                else if (claim.Type == ClaimTypes.Email)
                    dataFromJWT.Email = claim.Value;
                else if (claim.Type == ClaimTypes.Role)
                    dataFromJWT.Role = claim.Value;
            }
            return dataFromJWT;
        }
    }
}
