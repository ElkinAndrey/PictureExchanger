namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Пользователь с такой электронной почтой уже существует
    /// </summary>
    public sealed class UserWithThisEmailExistsException : Exception
    {
        /// <summary>
        /// Ошибка. Пользователь с такой электронной почтой уже существует
        /// </summary>
        public UserWithThisEmailExistsException() :
            base($"Пользователь с такой электронной почтой уже существует")
        {

        }

        /// <summary>
        /// Ошибка. Пользователь с такой электронной почтой уже существует
        /// </summary>
        /// <param name="email">Имя пользователя</param>
        public UserWithThisEmailExistsException(string email) :
            base($"Пользователь с электронной почтой \"{email}\" уже существует")
        {

        }
    }
}
