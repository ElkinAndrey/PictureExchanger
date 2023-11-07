namespace PictureExchangerAPI.Presentation.DTO.Posts
{
    /// <summary>
    /// Dto для добавления поста
    /// </summary>
    /// <param name="name">Название</param>
    /// <param name="isPrivate">Сделать пост приватным</param>
    /// <param name="tags">Теги</param>
    /// <param name="files">Картинки</param>
    public record class AddPostDto(
        string name = "",
        bool isPrivate = false,
        List<string> tags = null!,
        List<IFormFile> files = null!
        );
}
