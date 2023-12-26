using PictureExchangerAPI.Service.DTO;

namespace PictureExchangerAPI.Service.Abstractions
{
    /// <summary>
    /// Интерфейс для сервиса авторизации
    /// </summary>
    public interface IAuthService
    {
        /// <summary>
        /// Зарегистрироваться
        /// </summary>
        /// <param name="name">Имя</param>
        /// <param name="email">Электронная почта</param>
        /// <param name="password">Пароль</param
        /// <param name="secretKey">Секретный ключ</param>
        /// <returns>Пара токенов</returns>
        public Task<PairOfTokens> RegisterAsync(
            string name,
            string email,
            string password,
            string secretKey);

        /// <summary>
        /// Войти в аккаунт
        /// </summary>
        /// <param name="nameOrEmail">Имя пользователя или электронная почта</param>
        /// <param name="password">Пароль</param
        /// <param name="secretKey">Секретный ключ</param>
        /// <returns>Пара токенов</returns>
        public Task<PairOfTokens> LoginAsync(
            string nameOrEmail,
            string password,
            string secretKey);

        /// <summary>
        /// Удалить токен обновления из базы данных
        /// </summary>
        /// <param name="token">Токен</param>
        public Task DeleteTokenAsync(string token);

        /// <summary>
        /// Обновить токен
        /// </summary>
        /// <param name="token">Токен</param>
        /// <param name="secretKey">Секретный ключ для формирования Access токена</param>        
        /// <returns>Пара токенов</returns>
        public Task<PairOfTokens> RefreshTokenAsync(
            string token,
            string secretKey);
    }
}
