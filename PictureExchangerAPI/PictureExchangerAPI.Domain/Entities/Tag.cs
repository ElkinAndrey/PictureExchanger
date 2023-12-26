namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Тег
    /// </summary>
    public class Tag
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
        /// Текст
        /// </summary>
        public string Text { get; set; } = string.Empty;
    }
}
