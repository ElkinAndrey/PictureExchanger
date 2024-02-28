using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence;
using PictureExchangerAPI.Service.Exceptions;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Service.Functions;
using System.Data;
using System.Runtime.CompilerServices;

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
                IQueryable<User> users = _context.Users
                    .Include(u => u.Role)
                    .Where(p =>
                        p.Name.Contains(name) &&
                        (isBanned == null || p.IsBanned == (bool)isBanned));
                if (isSortByRegistrationDate)
                    users = users.OrderByDescending(p => p.RegistrationDate);
                else if (isSortByBannedDate)
                    users = users.OrderByDescending(p => p.BannedDate);
                else
                    users = users.OrderBy(p => p.Name);
                users = users.Skip(start).Take(length);

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

        public async Task<User> GetByIdAsync(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) throw new UserNotFoundException();

            return user;
        }

        public async Task ChangeRoleByNameAsync(
            string name,
            string role,
            string roleChanger)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            if (roleChanger is null) throw new RoleChangerNotShownException();
            if (!Roles.FirstRoleBigger(roleChanger, user.Role.Name)) throw new ThereAreNotEnoughRightsToIssueRoleException();
            var newRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.Name == role);
            if (newRole is null) throw new RoleNotFoundException();
            user.Role = newRole;

            _context.SaveChanges();
        }

        public async Task BanUserByName(string name, bool isBanned)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == name);

            if (user is null) throw new UserNotFoundException(name);

            user.IsBanned = isBanned;
            user.BannedDate = isBanned ? DateTime.Now : null;

            _context.SaveChanges();
        }

        public async Task ChangePasswordById(Guid id, string password, string newPassword)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
                throw new UserNotFoundException();
            if (!Password.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                throw new WrongPasswordException(); // Если пароль введен неверно, то выдать исключение

            var hashAndSalt = Password.CreatePassword(newPassword); // Сгенерировать хэш и соль пароля
            user.PasswordHash = hashAndSalt.PasswordHash;
            user.PasswordSalt = hashAndSalt.PasswordSalt;

            _context.SaveChanges();
        }

        public async Task ChangeNameById(Guid id, string name)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) throw new UserNotFoundException();

            user.Name = name;

            _context.SaveChanges();
        }

        public async Task ChangeEmailById(Guid id, string email)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) throw new UserNotFoundException();

            user.Email = email;

            _context.SaveChanges();
        }

        public async Task ChangeById(
            Guid id,
            bool? isEmailHidden = null,
            bool? isRegistrationDateHidden = null)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) throw new UserNotFoundException();

            if (isEmailHidden is not null)
                user.IsEmailHidden = (bool)isEmailHidden;
            if (isRegistrationDateHidden is not null)
                user.IsRegistrationDateHidden = (bool)isRegistrationDateHidden;

            _context.SaveChanges();
        }
    }
}
