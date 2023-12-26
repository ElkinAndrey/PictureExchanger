namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Токен обновления устарел
    /// </summary>
    public sealed class RefreshTokenObsoleteException : Exception
    {
        /// <summary>
        /// Ошибка. Токен обновления устарел
        /// </summary>
        public RefreshTokenObsoleteException() :
            base($"Вы слишком долго не заходили на аккаунт")
        {

        }
    }
}
