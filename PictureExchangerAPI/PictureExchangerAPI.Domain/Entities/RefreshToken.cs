namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Токен обновления
    /// </summary>
    public class RefreshToken
    {
        /// <summary>
        /// Номер устройства
        /// </summary>
        public int Number { get; set; } = 0;

        /// <summary>
        /// Токен
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// IP адрес
        /// </summary>
        public string IP { get; set; } = string.Empty;

        /// <summary>
        /// Данные об устройстве
        /// </summary>
        public string DeviceData { get; set; } = string.Empty;

        /// <summary>
        /// Дата входа на устройстве
        /// </summary>
        public DateTime LoginDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Дата обновления токена
        /// </summary>
        public DateTime RefreshDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Пользователь
        /// </summary>
        public User User { get; set; } = new User();
    }
}
