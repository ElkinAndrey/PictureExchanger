namespace PictureExchangerAPI.Persistence.Exceptions
{
    /// <summary>
    /// Ошибка. У пользователя нет прав на изменение поста
    /// </summary>
    public sealed class UserDoesNotHaveRightsToEditPostException : Exception
    {
        /// <summary>
        /// Ошибка. У пользователя нет прав на изменение поста
        /// </summary>
        public UserDoesNotHaveRightsToEditPostException() :
            base($"У вас нет прав на изменение поста")
        {

        }
    }
}
