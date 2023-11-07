namespace PictureExchangerAPI.Presentation.DTO.Posts
{
    /// <summary>
    /// Dto для получения количества постов
    /// </summary>
    /// <param name="name">Часть названия</param>
    public record class GetPostsCountDto(string name);
}
