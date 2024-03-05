using PictureExchangerAPI.Domain.Enums;

namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Неправильное написание имени
    /// </summary>
    public sealed class MisspelledNameException : Exception
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
        /// Cлучай, когда имя введено неверно
        /// </summary>
        public WrongName WrongName { get; set; } = WrongName.Сorrectly;

        public override string Message 
        { 
            get
            {
                switch (WrongName)
                {
                    case WrongName.InvalidCharacters:
                        return "В имени содержатся некорректные символы";
                    case WrongName.StartsWithNumber:
                        return "Имя не может начинаться с цифры";
                    case WrongName.Short:
                        if (minlength is null)
                            return "Имя слишком короткое";
                        return $"Имя слишком короткое, минимальная длина \"{minlength}\"";
                    case WrongName.Long:
                        if (maxlength is null)
                            return "Имя слишком длинное";
                        return $"Имя слишком длинное, максимальная длина \"{maxlength}\"";
                }
                return "Сообщение введено верно";
            }
        }

        /// <summary>
        /// Ошибка. Неправильное написание имени
        /// </summary>
        public MisspelledNameException(
            WrongName wrongName = WrongName.Сorrectly,
            int? min = null,
            int? max = null)
        {
            WrongName = wrongName;
            minlength = min;
            maxlength = max;
        }
    }
}
