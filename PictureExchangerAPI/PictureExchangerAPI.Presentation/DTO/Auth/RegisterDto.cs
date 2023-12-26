namespace PictureExchangerAPI.Presentation.DTO.Auth
{
    /// <summary>
    /// Dto для регистрации
    /// </summary>
    /// <param name="Name">Имя пользователя</param>
    /// <param name="Email">Электронная почта</param>
    /// <param name="Password">Пароль</param>
    public record class RegisterDto(
        string Name = "",
        string Email = "",
        string Password= "");
}
