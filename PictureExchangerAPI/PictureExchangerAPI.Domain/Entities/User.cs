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
        /// Дата бана
        /// </summary>
        public DateTime? BannedDate { get; set; } = null;

        /// <summary>
        /// Посты
        /// </summary>
        public List<Post> Posts { get; set; } = null!;

        /// <summary>
        /// Id роли пользователя
        /// </summary>
        public Guid RoleId { get; set; }

        /// <summary>
        /// Роль пользователя
        /// </summary>
        public Role Role { get; set; } = null!;

        /// <summary>
        /// Токены обновления
        /// </summary>
        public List<RefreshToken> RefreshTokens { get; set; } = null!;

        /// <summary>
        /// Скрыт ли Email для других пользователей
        /// </summary>
        public bool IsEmailHidden { get; set; } = true;

        /// <summary>
        /// Скрыта ли дата регистрации для других пользователей
        /// </summary>
        public bool IsRegistrationDateHidden { get; set; } = false;
    }
}
