namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Пользователь с таким именем существует
    /// </summary>
    public sealed class UserWithThisNameExistsException : Exception
    {
        /// <summary>
        /// Ошибка. Пользователь с таким именем существует
        /// </summary>
        public UserWithThisNameExistsException() :
            base($"Пользователь с таким именем уже существует")
        {

        }

        /// <summary>
        /// Ошибка. Пользователь с таким именем существует
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        public UserWithThisNameExistsException(string name) :
            base($"Пользователь с именем \"{name}\" уже существует")
        {

        }
    }
}
