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

        public List<User> Users { get; set; } = new List<User>();
    }
}
