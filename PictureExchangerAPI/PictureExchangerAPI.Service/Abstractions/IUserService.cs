using PictureExchangerAPI.Domain.Entities;

namespace PictureExchangerAPI.Service.Abstractions
{
    /// <summary>
    /// Интерфейс для сервиса работы с польователями
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Получить пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <returns>Пользователь</returns>
        public Task<User> GetByNameAsync(string name);

        /// <summary>
        /// Изменить пользователя
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <param name="name">Имя пользователя</param>
        /// <param name="email">Электронная почта пользователя</param>
        /// <param name="isBanned">Забанен ли</param>
        public Task ChangeAsync(
            Guid id,
            string? name = null,
            string? email = null,
            bool? isBanned = null);

        /// <summary>
        /// Изменить пользователя по имени
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="newName">Новое имя пользователя</param>
        /// <param name="email">Электронная почта пользователя</param>
        /// <param name="isBanned">Забанен ли</param>
        public Task ChangeByNameAsync(
            string name,
            string? newName = null,
            string? email = null,
            bool? isBanned = null,
            string? role = null,
            string? roleChanger = null);
    }
}
