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
        string Name = "",
        bool IsPrivate = false,
        List<string> Tags = null!,
        List<IFormFile> Files = null!
        );
}
