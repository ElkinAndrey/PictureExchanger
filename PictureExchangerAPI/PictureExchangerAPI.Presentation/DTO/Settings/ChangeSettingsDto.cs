namespace PictureExchangerAPI.Presentation.DTO.Settings
{
    /// <summary>
    /// Dto для изменения настроек аккаунта
    /// </summary>
    /// <param name="IsEmailHidden">Новые параметры скрытности Email</param>
    /// <param name="IsRegistrationDateHidden">Новые параметры скрытности даты регистрации</param>
    public record class ChangeSettingsDto(
        bool? IsEmailHidden = null,
        bool? IsRegistrationDateHidden = null);
}
