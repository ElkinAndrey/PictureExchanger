﻿using PictureExchangerAPI.Domain.Entities;

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
        public Task<List<User>> GetAsync(
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
        public Task<int> GetCountAsync(
            string name,
            bool isSortByRegistrationDate,
            bool isSortByBannedDate,
            bool? isBanned = null);
    }
}
