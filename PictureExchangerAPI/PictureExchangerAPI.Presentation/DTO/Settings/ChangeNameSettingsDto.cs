namespace PictureExchangerAPI.Presentation.DTO.Settings
{
    /// <summary>
    /// Dto для изменения имени аккаунта
    /// </summary>
    /// <param name="Name">Новое имя</param>
    public record class ChangeNameSettingsDto(
        string Name = "");
}
