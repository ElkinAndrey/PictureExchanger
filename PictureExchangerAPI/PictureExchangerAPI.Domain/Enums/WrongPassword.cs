namespace PictureExchangerAPI.Domain.Enums
{
    /// <summary>
    /// Cлучаи, когда пароль введен неверно
    /// </summary>
    public enum WrongPassword
    {
        /// <summary>
        /// Корректное значение
        /// </summary>
        Сorrectly,

        /// <summary>
        /// Пароль не содержит специального символа
        /// </summary>
        NotContainSpecialCharacter,

        /// <summary>
        /// Пароль не содержит цифры
        /// </summary>
        NotContainNumber,

        /// <summary>
        /// Пароль слишком короткий
        /// </summary>
        Short,

        /// <summary>
        /// Пароль слишком длинный
        /// </summary>
        Long,
    }
}
