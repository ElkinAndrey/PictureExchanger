using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.DTO;
using PictureExchangerAPI.Service.Exceptions;
using PictureExchangerAPI.Service.Functions;
using System.Security.Claims;
using System.Security.Cryptography;

namespace PictureExchangerAPI.Service.Services
{
    /// <summary>
    /// Сервис авторизации
    /// </summary>
    public class AuthService : IAuthService
    {
        /// <summary>
        /// Репозиторий для работы с пользователями
        /// </summary>
        private IUserRepository _userRepository;

        /// <summary>
        /// Сервис авторизации
        /// </summary>
        /// <param name="userRepository">Репозиторий для работы с пользователями</param>
        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task DeleteTokenAsync(string token)
        {
            await _userRepository.DeleteTokenAsync(token);
            await _userRepository.SaveAsync();
        }

        public async Task<PairOfTokens> LoginAsync(
            string nameOrEmail,
            string password,
            string secretKey,
            string ip = "",
            string deviceData = "")
        {
            var user = await _userRepository.GetUserByNameOrEmailAsync(nameOrEmail); // Находим пользователя по имени или email в базе данных
            if (user is null) throw new UserNotFoundException(nameOrEmail); // Если пользователь не найден, то выдать исключение!!!
            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt)) throw new WrongPasswordException(); // Если пароль введен неверно, то выдать исключение
            var tokens = GenerateTokens(user.Id, user.Name, user.Email, user.Role?.Name ?? "", secretKey); // Сгенерировать пару токенов
            var refresh = new RefreshToken(1, tokens.RefreshToken, ip, deviceData, tokens.DateOfCreation, tokens.DateOfCreation, user, user.Id); // Создание refresh токена для базы данных
            if (user.RefreshTokens.Count != 0) refresh.Number = user.RefreshTokens.Max(u => u.Number) + 1;
            user.RefreshTokens.Add(refresh); // Добавить пользователю токен обновления
            await _userRepository.SaveAsync();// Обновить базу данных
            return tokens;// Вернуть пару токенов
        }

        public async Task<PairOfTokens> RefreshTokenAsync(
            string token,
            string secretKey,
            string ip = "",
            string deviceData = "")
        {
            var refreshToken = await _userRepository.GetTokenWithUserByTokenAsync(token); // Находим токен с пользователем по токену в базе данных
            if (refreshToken?.User is null) throw new UserNotFoundException(); // Если пользователь не найден, то выдать исключение
            if (DateTime.Now > refreshToken.RefreshDate.Add(JwtLifetime.RefreshTimeSpan)) // Если токен устарел, удалить токен и выдать исключение!!!
            {
                await DeleteTokenAsync(token);
                throw new RefreshTokenObsoleteException();
            }
            var user = refreshToken.User;
            var tokens = GenerateTokens(user.Id, user.Name, user.Email, user.Role?.Name ?? "", secretKey); // Сгенерировать пару токенов
            
            // Обновление данных refresh токена в базе данных
            refreshToken.Token = tokens.RefreshToken;
            refreshToken.IP = ip;
            refreshToken.DeviceData = deviceData;
            refreshToken.RefreshDate = tokens.DateOfCreation;

            await _userRepository.SaveAsync();// Обновить базу данных
            return tokens;// Вернуть пару токенов
        }

        public async Task<PairOfTokens> RegisterAsync(
            string name,
            string email,
            string password,
            string secretKey,
            string ip = "",
            string deviceData = "")
        {
            var isThereSuchName = await  _userRepository.IsThereSuchNameAsync(name);
            var isThereSuchEmail = await  _userRepository.IsThereSuchEmailAsync(name);
            if (isThereSuchName) throw new UserWithThisNameExistsException(); // Если такое имя занято, то выдать исключение
            if (isThereSuchEmail) throw new UserWithThisEmailExistsException(); // Если такой email занят, то выдать исключение

            var role = await _userRepository.GetRoleByName(Roles.User); // Получить роль пользователя из базы данных
            if (role is null) role = new Role { Id = Guid.NewGuid(), Name = Roles.User }; // Если роли пользователя нет в базе данных, то добавить
            var hashAndSalt = CreatePassword(password); // Сгенерировать хэш и соль пароля
            var tokens = GenerateTokens(Guid.NewGuid(), name, email, role.Name, secretKey); // Сгенерировать пару токенов
            var user = new User // Создать пользователя
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email,
                PasswordHash = hashAndSalt.PasswordHash,
                PasswordSalt = hashAndSalt.PasswordSalt,
                RegistrationDate = tokens.DateOfCreation,
                IsBanned = false,
                Role = role,
                RefreshTokens = new List<RefreshToken>(),
            };
            var refresh = new RefreshToken(1, tokens.RefreshToken, ip, deviceData, tokens.DateOfCreation, tokens.DateOfCreation, user, user.Id); // Создание refresh токена для базы данных
            user.RefreshTokens.Add(refresh); // Добавить пользователю токен обновления
            await _userRepository.AddUserAsync(user); // Добавить пользователя
            await _userRepository.SaveAsync();// Обновить базу данных
            return tokens;// Вернуть пару токенов
        }

        /// <summary>
        /// Получить хэш
        /// </summary>
        /// <param name="password">Пароль</param>
        /// <param name="passwordSalt">Соль</param>
        /// <returns>Хэш</returns>
        private static string GetHash(string password, byte[] passwordSalt)
            => Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password!,
                salt: passwordSalt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

        /// <summary>
        /// Создать хэш
        /// </summary>
        /// <param name="password">Пароль</param>
        /// <param name="passwordHash">Хэш</param>
        /// <param name="passwordSalt">Соль</param>
        private HashAndSalt CreatePassword(string password)
        {
            byte[] passwordSalt = RandomNumberGenerator.GetBytes(128 / 8);
            string passwordHash = GetHash(password, passwordSalt);
            return new HashAndSalt(passwordHash, passwordSalt);
        }

        /// <summary>
        /// Проверить пароль
        /// </summary>
        /// <param name="password">пароль</param>
        /// <param name="passwordHash">хэш, с которым нужно сравнить пароль</param>
        /// <param name="passwordSalt">соль</param>
        /// <returns>True - пароль верный, False - пароль не верный</returns>
        private static bool VerifyPassword(string password, string passwordHash, byte[] passwordSalt)
            => passwordHash == GetHash(password, passwordSalt);

        /// <summary>
        /// Сгенерировать пару токенов
        /// </summary>
        /// <returns>Пара токенов</returns>
        private PairOfTokens GenerateTokens(
            Guid id,
            string name,
            string email,
            string role,
            string secretKey)
        {
            List<Claim> claims = new List<Claim> // Данные, которые будут записаны в токен
            {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()), // Имя пользователя
                new Claim(ClaimTypes.Email, email), // Имя пользователя
                new Claim(ClaimTypes.Role, role) // Роль пользователя
            };

            var time = DateTime.Now; // Время создания токенов
            var accessToken = JWT.CreateAccessToken(claims, secretKey, time); // Генерируется токен доступа (часто обновляется)
            var refreshToken = JWT.CreateRefreshToken(); // Генерируется токен обновления (редко обновляется)

            return new PairOfTokens(accessToken, refreshToken, time);
        }
    }
}
