namespace PictureExchangerAPI.Presentation.DTO.Posts
{
    /// <summary>
    /// Dto для изменения поста
    /// </summary>
    /// <param name="name">Название</param>
    /// <param name="isPrivate">Сделать пост приватным</param>
    /// <param name="tags">Теги</param>
    public record class ChangePostDto(
        string name = "",
        bool isPrivate = false,
        List<string> tags = null!
        );
}
