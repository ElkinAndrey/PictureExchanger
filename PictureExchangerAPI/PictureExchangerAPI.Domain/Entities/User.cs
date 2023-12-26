namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Пользователь
    /// </summary>
    public class User
    {
        /// <summary>
        /// Id пользователя
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Имя пользователя
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Электронная почта пользователя
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Хэш пароля
        /// </summary>
        public string PasswordHash { get; set; } = string.Empty;

        /// <summary>
        /// Соль пароля
        /// </summary>
        public byte[] PasswordSalt { get; set; } = new byte[32];

        /// <summary>
        /// Дата регистрации
        /// </summary>
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Забанен ли
        /// </summary>
        public bool IsBanned { get; set; } = false;

        /// <summary>
        /// Посты
        /// </summary>
        public List<Post> Posts { get; set; } = new List<Post>();

        /// <summary>
        /// Роль пользователя
        /// </summary>
        public Role Role { get; set; } = new Role();

        /// <summary>
        /// Токены обновления
        /// </summary>
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
