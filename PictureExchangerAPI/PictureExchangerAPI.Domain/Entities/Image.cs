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
    }
}
