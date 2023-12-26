using PictureExchangerAPI.Domain.Entities;

namespace PictureExchangerAPI.Persistence.Abstractions
{
    /// <summary>
    /// Интерфейс для репозитория с пользователями
    /// </summary>
    public interface IUserRepository
    {
        /// <summary>
        /// Удалить токен из базы данных
        /// </summary>
        /// <param name="token">Токен</param>
        public Task DeleteTokenAsync(string token);

        /// <summary>
        /// Получить пользователя по имени или электронной почте
        /// </summary>
        /// <param name="nameOrEmail">Имя или электронная почта</param>
        /// <returns>Пользователь</returns>
        public Task<User?> GetUserByNameOrEmailAsync(string nameOrEmail);

        /// <summary>
        /// Получить токен с пользователем по токену
        /// </summary>
        /// <param name="token">Токен</param>
        /// <returns>Токен с пользователем</returns>
        public Task<RefreshToken?> GetTokenWithUserByTokenAsync(string token);

        /// <summary>
        /// Есть ли пользователь с таким именем
        /// </summary>
        /// <param name="name">Имя</param>
        /// <returns>true - есть, fasle - нет</returns>
        public Task<bool> IsThereSuchNameAsync(string name);

        /// <summary>
        /// Есть ли пользователь с такой электронной почтой
        /// </summary>
        /// <param name="name">Электронная почта</param>
        /// <returns>true - есть, fasle - нет</returns>
        public Task<bool> IsThereSuchEmailAsync(string email);

        /// <summary>
        /// Добавить пользователя
        /// </summary>
        /// <param name="user">Пользователь</param>
        public Task AddUserAsync(User user);

        /// <summary>
        /// Получить роль пользователя по имени роли
        /// </summary>
        /// <param name="name">Имя роли</param>
        /// <returns>Роль</returns>
        public Task<Role?> GetRoleByName(string name);

        /// <summary>
        /// Внести изменения
        /// </summary>
        public Task SaveAsync();
    }
}
