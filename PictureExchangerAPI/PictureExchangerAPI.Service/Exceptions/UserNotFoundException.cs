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
        /// <param name="name">Имя пользователя</param>
        public UserNotFoundException(string name) :
            base($"Пользователь с данными \"{name}\" не найден")
        {

        }
    }
}
