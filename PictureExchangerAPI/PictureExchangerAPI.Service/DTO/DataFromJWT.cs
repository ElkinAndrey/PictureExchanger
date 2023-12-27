namespace PictureExchangerAPI.Service.DTO
{
    /// <summary>
    /// Данные, получаемые из докена доступа
    /// </summary>
    /// <param name="Id">Id пользователя</param>
    /// <param name="Name">Имя пользователя</param>
    /// <param name="Email">Электронная почта</param>
    /// <param name="Role">Роль</param>
    public class DataFromJWT
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        public DataFromJWT() { }

        public DataFromJWT(Guid id, string name, string email, string role)
        {
            Id = id;
            Name = name;
            Email = email;
            Role = role;
        }
    }
}
