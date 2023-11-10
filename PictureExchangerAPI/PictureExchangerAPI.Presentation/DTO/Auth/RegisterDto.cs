namespace PictureExchangerAPI.Presentation.DTO.Auth
{
    /// <summary>
    /// Dto для регистрации
    /// </summary>
    /// <param name="name">Имя пользователя</param>
    /// <param name="email">Электронная почта</param>
    /// <param name="password">Пароль</param>
    public record class RegisterDto(
        string name = "",
        string email = "",
        string password= "");
}
