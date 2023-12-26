using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.DTO;
using System.Data;

namespace PictureExchangerAPI.Service.Services
{
    /// <summary>
    /// Сервис авторизации
    /// </summary>
    public class AuthService : IAuthService
    {
        /// <summary>
        /// Сервис авторизации
        /// </summary>
        public AuthService()
        {
            
        }

        public async Task DeleteTokenAsync(string token)
        {
            // Находим токен в базе данных
            // Удаляем токен у пользователя
            // Вносим изменения в базу данных
            throw new NotImplementedException();
        }

        public async Task<PairOfTokens> LoginAsync(
            string nameOrEmail,
            string password,
            string secretKey)
        {
            // Находим пользователя по имени или email в базе данных
            // Если пользователь не найден, то выдать исключение!!!
            // Если пароль введен неверно, то выдать исключение
            // Сгенерировать пару токенов
            // Добавить пользователю токен обновления
            // Обновить базу данных
            // Вернуть пару токенов
            throw new NotImplementedException();
        }

        public async Task<PairOfTokens> RefreshTokenAsync(
            string token,
            string secretKey)
        {
            // Находим пользователя по токену в базе данных
            // Если пользователь не найден, то выдать исключение!!!
            // Если токен устарел, удалить токен и выдать исключение!!!
            // Сгенерировать пару токенов
            // Обновить у пользователя токен обновления
            // Обновить базу данных
            // Вернуть пару токенов
            throw new NotImplementedException();
        }

        public async Task<PairOfTokens> RegisterAsync(
            string name,
            string email,
            string password,
            string secretKey)
        {
            // Если такое имя занято, то выдать исключение!!!
            // Если такой email занят, то выдать исключение!!!
            // Сгенерировать хэш и соль пароля
            // Создать пользователя
            // Выдать роль пользователю
            // Сгенерировать пару токенов
            // Добавить пользователю токен обновления
            // Обновить базу данных
            // Вернуть пару токенов
            throw new NotImplementedException();
        }
    }
}
