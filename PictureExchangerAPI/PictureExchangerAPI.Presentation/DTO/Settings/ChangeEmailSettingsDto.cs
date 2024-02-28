namespace PictureExchangerAPI.Presentation.DTO.Settings
{
    /// <summary>
    /// Dto для изменения электронной почты аккаунта
    /// </summary>
    /// <param name="Email">Новая электронная почта</param>
    public record class ChangeEmailSettingsDto(
        string Email = "");
}
