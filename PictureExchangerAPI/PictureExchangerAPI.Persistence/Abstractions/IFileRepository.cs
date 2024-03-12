namespace PictureExchangerAPI.Persistence.Abstractions
{
    /// <summary>
    /// Интерфейс репозитория для взаимодействия с файлами
    /// </summary>
    public interface IFileRepository
    {
        /// <summary>
        /// Добавить картинку у поста
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <param name="number">Номер картинки</param>
        /// <param name="stream">Стрим с файлом</param>
        /// <param name="contentType">MIME тип</param>
        Task AddPostImageAsync(
            Guid id,
            int number,
            Stream stream,
            string contentType);

        /// <summary>
        /// Удалить пост
        /// </summary>
        /// <param name="id">Id поста</param>
        Task DeletePostImagesAsync(Guid id);

        /// <summary>
        /// Получить картинку поста
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="number">Номер картинки</param>
        /// <returns>Картинка в виде стрима</returns>
        Task<Stream> GetPostImageStreamAsync(
            Guid postId,
            int number);

        /// <summary>
        /// Получить url-ссылку на картинку поста
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="number">Номер картинки</param>
        /// <returns>Url картинки</returns>
        Task<string> GetPostImageUrlAsync(
            Guid postId,
            int number);
    }
}
