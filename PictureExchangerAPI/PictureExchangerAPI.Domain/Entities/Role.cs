namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Роль пользователя
    /// </summary>
    public class Role
    {
        /// <summary>
        /// Id роли
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Список пользователей с такой ролью
        /// </summary>
        public List<User> Users { get; set; } = null!;
    }
}
