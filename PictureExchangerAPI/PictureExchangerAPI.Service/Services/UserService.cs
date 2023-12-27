using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence;
using PictureExchangerAPI.Service.Exceptions;
using PictureExchangerAPI.Service.Abstractions;

namespace PictureExchangerAPI.Service.Services
{
    /// <summary>
    /// Сервис для работы с пользователями
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// Контекст базы данных
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Репозиторий с пользователями
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ChangeAsync(
            Guid id,
            string? name = null,
            string? email = null,
            bool? isBanned = null)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(p => p.Id == id);

            if (user is null) throw new UserNotFoundException();

            if (name is not null) user.Name = (string)name; // Изменение имени
            if (email is not null) user.Email = (string)email; // Изменение приватности
            if (isBanned is not null) user.IsBanned = (bool)isBanned; // Изменение бана

            _context.SaveChanges();
        }

        public async Task ChangeByNameAsync(
            string name,
            string? newName = null,
            string? email = null,
            bool? isBanned = null)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(p => p.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            if (newName is not null) user.Name = (string)newName; // Изменение имени
            if (email is not null) user.Email = (string)email; // Изменение приватности
            if (isBanned is not null) user.IsBanned = (bool)isBanned; // Изменение бана

            _context.SaveChanges();
        }

        public async Task<User> GetByNameAsync(string name)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            return user;
        }
    }
}
