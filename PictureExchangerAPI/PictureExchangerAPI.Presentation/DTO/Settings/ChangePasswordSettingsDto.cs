namespace PictureExchangerAPI.Presentation.DTO.Settings
{
    /// <summary>
    /// Dto для изменения пароля аккаунта
    /// </summary>
    /// <param name="Password">Текущий пароль</param>
    /// <param name="NewPassword">Новый пароль</param>
    public record class ChangePasswordSettingsDto(
        string Password = "",
        string NewPassword = "");
}
