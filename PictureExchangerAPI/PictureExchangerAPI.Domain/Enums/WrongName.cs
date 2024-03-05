namespace PictureExchangerAPI.Domain.Enums
{
    /// <summary>
    /// Cлучаи, когда имя введено неверно
    /// </summary>
    public enum WrongName
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
        /// Имя начинается с цифры
        /// </summary>
        StartsWithNumber,

        /// <summary>
        /// Имя слишком короткое
        /// </summary>
        Short,

        /// <summary>
        /// Имя слишком длинное
        /// </summary>
        Long,
    }
}
