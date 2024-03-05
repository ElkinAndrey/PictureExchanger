using PictureExchangerAPI.Domain.Enums;

namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Неправильное написание электронной почты
    /// </summary>
    public sealed class MisspelledEmailException : Exception
    {
        /// <summary>
        /// Cлучай, когда email введен неверно
        /// </summary>
        public WrongEmail WrongEmail { get; set; } = WrongEmail.Сorrectly;

        public override string Message
        {
            get
            {
                switch (WrongEmail)
                {
                    case WrongEmail.InvalidCharacters:
                        return "В электронной почте содержатся некорректные символы";
                    case WrongEmail.InvalidFormat:
                        return "Электронная почта имеет неверный формат";
                }
                return "Email введен верно";
            }
        }

        /// <summary>
        /// Ошибка. Неправильное написание электронной почты
        /// </summary>
        public MisspelledEmailException(
            WrongEmail wrongEmail = WrongEmail.Сorrectly)
        {
            WrongEmail = wrongEmail;
        }
    }
}
