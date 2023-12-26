namespace PictureExchangerAPI.Presentation.Exceptions
{
    /// <summary>
    /// Ошибка. Токена обновления нет в куках
    /// </summary>
    public sealed class RefreshTokenNotInCookieException : Exception
    {
        /// <summary>
        /// Ошибка. Токена обновления нет в куках
        /// </summary>
        public RefreshTokenNotInCookieException() :
            base($"Вы не авторизованы")
        {

        }
    }
}
