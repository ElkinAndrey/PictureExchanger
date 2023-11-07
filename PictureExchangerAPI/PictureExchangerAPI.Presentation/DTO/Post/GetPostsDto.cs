namespace PictureExchangerAPI.Presentation.DTO.Posts
{
    /// <summary>
    /// Dto для получения постов
    /// </summary>
    /// <param name="start">Начало отчета</param>
    /// <param name="length">Длина среза</param>
    /// <param name="name">Часть названия</param>
    public record class GetPostsDto(
        int start,
        int length,
        string name);
}
