using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using PictureExchangerAPI.Service.DTO;
using System.Security.Cryptography;

namespace PictureExchangerAPI.Service.Functions
{
    /// <summary>
    /// Класс для работы с паролями
    /// </summary>
    public static class Password
    {
        /// <summary>
        /// Получить хэш
        /// </summary>
        /// <param name="password">Пароль</param>
        /// <param name="passwordSalt">Соль</param>
        /// <returns>Хэш</returns>
        public static string GetHash(string password, byte[] passwordSalt)
            => Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password!,
                salt: passwordSalt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

        /// <summary>
        /// Создать хэш
        /// </summary>
        /// <param name="password">Пароль</param>
        /// <returns>Хэш и соль пароля</returns>
        public static HashAndSalt CreatePassword(string password)
        {
            byte[] passwordSalt = RandomNumberGenerator.GetBytes(128 / 8);
            string passwordHash = GetHash(password, passwordSalt);
            return new HashAndSalt(passwordHash, passwordSalt);
        }

        /// <summary>
        /// Проверить пароль
        /// </summary>
        /// <param name="password">пароль</param>
        /// <param name="passwordHash">хэш, с которым нужно сравнить пароль</param>
        /// <param name="passwordSalt">соль</param>
        /// <returns>True - пароль верный, False - пароль не верный</returns>
        public static bool VerifyPassword(string password, string passwordHash, byte[] passwordSalt)
            => passwordHash == GetHash(password, passwordSalt);
    }
}
