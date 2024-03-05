using PictureExchangerAPI.Domain.Enums;

namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Неправильное написание пароля
    /// </summary>
    public sealed class MisspelledPasswordException : Exception
    {
        /// <summary>
        /// Минимальная длина
        /// </summary>
        private readonly int? minlength = null;

        /// <summary>
        /// Максимальная длина
        /// </summary>
        private readonly int? maxlength = null;

        /// <summary>
        /// Cлучай, когда пароль введен неверно
        /// </summary>
        public WrongPassword WrongPassword { get; set; } = WrongPassword.Сorrectly;

        public override string Message
        {
            get
            {
                switch (WrongPassword)
                {
                    case WrongPassword.NotContainNumber:
                        return "В пароле должна быть цифра";
                    case WrongPassword.NotContainSpecialCharacter:
                        return "В пароле должен быть спецсимвол";
                    case WrongPassword.Short:
                        if (minlength is null)
                            return "Пароль слишком короткий";
                        return $"Пароль слишком короткий, минимальная длина \"{minlength}\"";
                    case WrongPassword.Long:
                        if (maxlength is null)
                            return "Пароль слишком длинный";
                        return $"Пароль слишком длинный, максимальная длина \"{maxlength}\"";
                }
                return "Сообщение введено верно";
            }
        }

        /// <summary>
        /// Ошибка. Неправильное написание имени
        /// </summary>
        public MisspelledPasswordException(
            WrongPassword wrongPassword = WrongPassword.Сorrectly,
            int? min = null,
            int? max = null)
        {
            WrongPassword = wrongPassword;
            minlength = min;
            maxlength = max;
        }
    }
}
