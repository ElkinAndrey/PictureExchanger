namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Картинка
    /// </summary>
    public class Image
    {
        /// <summary>
        /// Номер картинки в посте
        /// </summary>
        public int Number { get; set; } = 0;

        /// <summary>
        /// Пост
        /// </summary>
        public Post Post { get; set; } = null!;

        /// <summary>
        /// Id поста
        /// </summary>
        public Guid PostId { get; set; }

        /// <summary>
        /// MIME тип
        /// </summary>
        public string СontentType { get; set; } = string.Empty;

        /// <summary>
        /// Имя файла
        /// </summary>
        public string Name { get; set; } = string.Empty;
    }
}
