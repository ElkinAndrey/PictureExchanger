namespace PictureExchangerAPI.Presentation.DTO.User
{
    /// <summary>
    /// Dto для получения количества постов у пользователя
    /// </summary>
    /// <param name="name">Часть названия</param>
    public record class GetPostsCountByUserNameDto(string name);
}
