namespace PictureExchangerAPI.Persistence.Exceptions
{
    /// <summary>
    /// Ошибка. Картинка не найдена
    /// </summary>
    public sealed class ImageNotFoundException : Exception
    {
        /// <summary>
        /// Ошибка. Картинка не найдена
        /// </summary>
        public ImageNotFoundException() :
            base($"Картинка не найдена") { }
    }
}
