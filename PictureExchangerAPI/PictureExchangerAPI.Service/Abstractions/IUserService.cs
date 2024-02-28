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
        Task<User> GetByNameAsync(string name);

        /// <summary>
        /// Получить пользователя по id
        /// </summary>
        /// <param name="Id">Id пользователя</param>
        /// <returns>Пользователь</returns>
        Task<User> GetByIdAsync(Guid id);

        /// <summary>
        /// Будет ли забанен пользователь
        /// </summary>
        /// <param name="name">Имя пользователя</param>
        /// <param name="isBanned">true - пользователь будет забанен; fasle - пользователь будет разбанен</param>
        Task BanUserByName(
            string name,
            bool isBanned);

        /// <summary>
        /// Поменять роль у человека (роль выдающего должна быть больше роли принимающего)
        /// </summary>
        /// <param name="name">Имя человека</param>
        /// <param name="role">Новая роль</param>
        /// <param name="roleChanger">Роль выдающего</param>
        Task ChangeRoleByNameAsync(
            string name,
            string role,
            string roleChanger);

        /// <summary>
        /// Поменять пароль по id
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <param name="password">Старый пароль</param>
        /// <param name="newPassword">Новый пароль</param>
        Task ChangePasswordById(
            Guid id,
            string password,
            string newPassword);

        /// <summary>
        /// Поменять имя по id
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <param name="name">Новое имя</param>
        Task ChangeNameById(
            Guid id,
            string name);

        /// <summary>
        /// Поменять электронную почту по id
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <param name="email">Новая электронная почта</param>
        Task ChangeEmailById(
            Guid id,
            string email);

        /// <summary>
        /// Поменять параметры аккаунта по id
        /// </summary>
        /// <param name="id">Id пользователя</param>
        /// <param name="isEmailHidden">Скрыт ли Email</param>
        /// <param name="isRegistrationDateHidden">Скрыта ли дата регистрации</param>
        Task ChangeById(
            Guid id,
            bool? isEmailHidden = null,
            bool? isRegistrationDateHidden = null);

        /// <summary>
        /// Получить список пользователей
        /// </summary>
        /// <param name="start">Начало отчета</param>
        /// <param name="length">Длина среза</param>
        /// <param name="name">Часть имени</param>
        /// <param name="isBanned">Забанен ли</param>
        /// <param name="isSortByRegistrationDate">Сортировать по дате регистрации</param>
        /// <param name="isSortByBannedDate">Сортировать по дате бана</param>
        /// <returns>Список пользователей</returns>
        Task<List<User>> GetAsync(
            int start,
            int length,
            string name,
            bool isSortByRegistrationDate,
            bool isSortByBannedDate,
            bool? isBanned = null);

        /// <summary>
        /// Получить количество пользователей
        /// </summary>
        /// <param name="name">Часть имени</param>
        /// <param name="isBanned">Забанен ли</param>
        /// <param name="isSortByRegistrationDate">Сортировать по дате регистрации</param>
        /// <param name="isSortByBannedDate">Сортировать по дате бана</param>
        /// <returns>Количество пользователей</returns>
        Task<int> GetCountAsync(
            string name,
            bool isSortByRegistrationDate,
            bool isSortByBannedDate,
            bool? isBanned = null);
    }
}
