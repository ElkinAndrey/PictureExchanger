using PictureExchangerAPI.Domain.Entities;

namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Неверный пароль
    /// </summary>
    public sealed class WrongPasswordException : Exception
    {
        /// <summary>
        /// Ошибка. Неверный пароль
        /// </summary>
        public WrongPasswordException() :
            base($"Пароль введен неверно")
        {

        }
    }
}
