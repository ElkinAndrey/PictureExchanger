namespace PictureExchangerAPI.Domain.Enums
{
    /// <summary>
    /// Cлучаи, когда электронная почта введена неверно
    /// </summary>
    public enum WrongEmail
    {
        /// <summary>
        /// Корректное значение
        /// </summary>
        Сorrectly,

        /// <summary>
        /// Некоректные символы
        /// </summary>
        InvalidCharacters,

        /// <summary>
        /// Некоректный формат
        /// </summary>
        InvalidFormat,
    }
}
