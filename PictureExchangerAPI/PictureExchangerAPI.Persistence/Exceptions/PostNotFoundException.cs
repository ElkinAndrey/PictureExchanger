namespace PictureExchangerAPI.Persistence.Exceptions
{
    /// <summary>
    /// Ошибка. Пост не найден
    /// </summary>
    public sealed class PostNotFoundException : Exception
    {
        /// <summary>
        /// Ошибка. Пост не найден
        /// </summary>
        public PostNotFoundException() :
            base($"Пост не найден")
        {

        }
    }
}
