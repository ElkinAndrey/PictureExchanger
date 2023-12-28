namespace PictureExchangerAPI.Presentation.DTO.Settings
{
    /// <summary>
    /// Dto для изменения настроек аккаунта
    /// </summary>
    /// <param name="CurrentPassword">Текущий пароль</param>
    /// <param name="Name">Новое имя</param>
    /// <param name="Email">Новая электронная почта</param>
    /// <param name="Password">Новый пароль</param>
    /// <param name="IsEmailHidden">Новые параметры скрытности Email</param>
    /// <param name="IsRegistrationDateHidden">Новые параметры скрытности даты регистрации</param>
    public record class ChangeSettingsDto(
        string CurrentPassword,
        string? Name,
        string? Email,
        string? Password,
        bool? IsEmailHidden,
        bool? IsRegistrationDateHidden);
}
