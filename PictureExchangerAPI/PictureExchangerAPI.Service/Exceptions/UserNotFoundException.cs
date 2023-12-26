namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Пользователь не найден
    /// </summary>
    public sealed class UserNotFoundException : Exception
    {
        /// <summary>
        /// Ошибка. Пользователь не найден
        /// </summary>
        public UserNotFoundException() :
            base($"Пользователь не найден")
        {

        }
        /// <summary>
        /// Ошибка. Пользователь не найден
        /// </summary>
        /// <param name="nameOrEmail">Имя или электронная почта</param>
        public UserNotFoundException(string nameOrEmail) :
            base($"Пользователь с данными \"{nameOrEmail}\" не найден")
        {

        }
    }
}
