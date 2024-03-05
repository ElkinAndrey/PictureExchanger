using PictureExchangerAPI.Domain.Enums;
using PictureExchangerAPI.Service.Exceptions;
using System.Text.RegularExpressions;

namespace PictureExchangerAPI.Service.Functions
{
    /// <summary>
    /// Проверить правильность
    /// </summary>
    public static class CheckCorrect
    {
        /// <summary>
        /// Проверить правильность имени
        /// </summary>
        /// <param name="name">Проверяемое имя</param>
        public static void Name(string name)
        {
            int minLen = 5;
            int maxLen = 40;
            var exception = new MisspelledNameException(min: minLen, max: maxLen);

            if (name.Length < minLen)
                exception.WrongName = WrongName.Short;
            else if (name.Length > maxLen)
                exception.WrongName = WrongName.Long;
            else if (Char.IsDigit(name[0]))
                exception.WrongName = WrongName.StartsWithNumber;
            else if (!Regex.IsMatch(name, @"^[a-zA-Z0-9]+$"))
                exception.WrongName = WrongName.InvalidCharacters;
            else
                return;

            throw exception;
        }

        /// <summary>
        /// Проверить правильность email
        /// </summary>
        /// <param name="email">Проверяемый email</param>
        /// <returns>Код ошибки</returns>
        public static void Email(string email)
        {
            var exception = new MisspelledEmailException();

            if (!Regex.IsMatch(email, @"^.+@.+\..+$"))
                exception.WrongEmail = WrongEmail.InvalidFormat;
            else if (!Regex.IsMatch(email, @"^[a-zA-Z0-9@\.]+$"))
                exception.WrongEmail = WrongEmail.InvalidCharacters;
            else
                return;

            throw exception;
        }

        /// <summary>
        /// Проверить правильность пароля
        /// </summary>
        /// <param name="password">Проверяемый пароль</param>
        /// <returns>Код ошибки</returns>
        public static void Password(string password)
        { 
            int minLen = 5;
            int maxLen = 40;
            
            var exception = new MisspelledPasswordException(min: minLen, max: maxLen);

            if (password.Length < minLen)
                exception.WrongPassword = WrongPassword.Short;
            else if (password.Length > maxLen)
                exception.WrongPassword = WrongPassword.Long;
            else
                return;

            throw exception;
        }
    }
}
