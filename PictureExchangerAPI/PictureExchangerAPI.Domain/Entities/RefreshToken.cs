namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Токен обновления
    /// </summary>
    public class RefreshToken
    {
        /// <summary>
        /// Токен обновления
        /// </summary>
        public RefreshToken() { }

        /// <summary>
        /// Токен обновления
        /// </summary>
        /// <param name="number">Номер устройства</param>
        /// <param name="token">Токен</param>
        /// <param name="ip">IP адрес</param>
        /// <param name="deviceData">Данные об устройстве</param>
        /// <param name="loginDate">Дата входа на устройстве</param>
        /// <param name="refreshDate">Дата обновления токена</param>
        /// <param name="user">Пользователь</param>
        /// <param name="userId">Id пользователя</param>
        public RefreshToken(
            int number,
            string token,
            string ip,
            string deviceData,
            DateTime loginDate,
            DateTime refreshDate,
            User user,
            Guid userId)
        {
            Number = number;
            Token = token;
            IP = ip;
            DeviceData = deviceData;
            LoginDate = loginDate;
            RefreshDate = refreshDate;
            User = user;
            UserId = userId;
        }

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
        public User User { get; set; } = null!;

        /// <summary>
        /// Id пользователя
        /// </summary>
        public Guid UserId { get; set; }
    }
}
