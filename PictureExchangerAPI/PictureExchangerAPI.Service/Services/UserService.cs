using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence;
using PictureExchangerAPI.Service.Exceptions;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Domain.Constants;

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
            if (isBanned is not null) // Изменение бана
            {
                user.IsBanned = (bool)isBanned; 
                if ((bool)isBanned)
                    user.BannedDate = DateTime.Now;
                else
                    user.BannedDate = null;
            }

            _context.SaveChanges();
        }

        public async Task ChangeByNameAsync(
            string name,
            string? newName = null,
            string? email = null,
            bool? isBanned = null,
            string? role = null,
            string? roleChanger = null)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            if (newName is not null) user.Name = (string)newName; // Изменение имени
            if (email is not null) user.Email = (string)email; // Изменение приватности
            if (isBanned is not null) // Изменение бана
            {
                user.IsBanned = (bool)isBanned;
                if ((bool)isBanned)
                    user.BannedDate = DateTime.Now;
                else
                    user.BannedDate = null;
            }
            if (role is not null)
            {
                if (roleChanger is null) throw new RoleChangerNotShownException();
                if (!Roles.FirstRoleBigger(roleChanger, user.Role.Name)) throw new ThereAreNotEnoughRightsToIssueRoleException();
                var newRole = await _context.Roles
                    .FirstOrDefaultAsync(r => r.Name == role);
                if (newRole is null) throw new RoleNotFoundException();
                user.Role = newRole;
            }

            _context.SaveChanges();
        }

        public async Task<List<User>> GetAsync(
            int start,
            int length,
            string name,
            bool isSortByRegistrationDate,
            bool isSortByBannedDate,
            bool? isBanned = null)
        {
            return await Task.Run(() =>
            {
                var users = _context.Users
                    .Include(u => u.Role)
                    .Where(p =>
                        p.Name.Contains(name) &&
                        (isBanned == null || p.IsBanned == (bool)isBanned));

                if (isSortByRegistrationDate)
                    users.OrderByDescending(p => p.RegistrationDate);
                else if (isSortByBannedDate)
                    users.OrderByDescending(p => p.BannedDate);

                users.Skip(start).Take(length);

                return users.ToList();
            });
        }

        public async Task<User> GetByNameAsync(string name)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            return user;
        }

        public async Task<int> GetCountAsync(
            string name,
            bool isSortByRegistrationDate,
            bool isSortByBannedDate,
            bool? isBanned = null)
        {
            return await Task.Run(() =>
            {
                var users = _context.Users
                    .Include(u => u.Role)
                    .Where(p =>
                        p.Name.Contains(name) &&
                        (isBanned == null || p.IsBanned == (bool)isBanned));

                if (isSortByRegistrationDate)
                    users.OrderByDescending(p => p.RegistrationDate);
                else if (isSortByBannedDate)
                    users.OrderByDescending(p => p.BannedDate);

                return users.Count();
            });
        }
    }
}
