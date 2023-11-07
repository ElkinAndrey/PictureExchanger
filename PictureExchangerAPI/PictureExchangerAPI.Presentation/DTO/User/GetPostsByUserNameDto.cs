namespace PictureExchangerAPI.Presentation.DTO.User
{
    /// <summary>
    /// Dto для получения постов у пользователя
    /// </summary>
    /// <param name="start">Начало отчета</param>
    /// <param name="length">Длина среза</param>
    /// <param name="name">Часть названия</param>
    public record class GetPostsByUserNameDto(
        int start,
        int length,
        string name);
}
