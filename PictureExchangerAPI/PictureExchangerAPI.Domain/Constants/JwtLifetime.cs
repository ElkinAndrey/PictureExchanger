namespace PictureExchangerAPI.Domain.Constants
{
    /// <summary>
    /// Время жизни токенов
    /// </summary>
    public static class JwtLifetime
    {
        /// <summary>
        /// Время жизни токена доступа
        /// </summary>
        public static TimeSpan AccessTimeSpan { get; } = new TimeSpan(
            days: 0,
            hours: 1,
            minutes: 0,
            seconds: 0);

        /// <summary>
        /// Время жизни токена обновления
        /// </summary>
        public static TimeSpan RefreshTimeSpan { get; } = new TimeSpan(
            days: 60,
            hours: 0,
            minutes: 0,
            seconds: 0);
    }
}
