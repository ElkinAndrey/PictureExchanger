namespace PictureExchangerAPI.Presentation.DTO.Auth
{
    /// <summary>
    /// Dto для входа в аккаунт
    /// </summary>
    /// <param name="nameOrEmail">Имя пользователя или электронная почта</param>
    /// <param name="password">Пароль</param>
    public record class LoginDto(
        string nameOrEmail = "",
        string password = "");
}
