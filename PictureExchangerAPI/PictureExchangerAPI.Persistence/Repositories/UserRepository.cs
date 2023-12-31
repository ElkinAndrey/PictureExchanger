﻿using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.Abstractions;

namespace PictureExchangerAPI.Persistence.Repositories
{
    /// <summary>
    /// Репозиторий с пользователями
    /// </summary>
    public class UserRepository : IUserRepository
    {
        /// <summary>
        /// Контекст базы данных
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Репозиторий с пользователями
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task DeleteTokenAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == token);

            if (refreshToken is not null)
                _context.RefreshTokens.Remove(refreshToken);
        }

        public async Task<Role?> GetRoleByName(string name)
        {
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Name == name);

            return role;
        }

        public async Task<RefreshToken?> GetTokenWithUserByTokenAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens
                .Include(t => t.User)
                .ThenInclude(u=> u.Role)
                .FirstOrDefaultAsync(t => t.Token == token);

            return refreshToken;
        }

        public async Task<User?> GetUserByNameOrEmailAsync(string nameOrEmail)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.Name == nameOrEmail || u.Email == nameOrEmail);

            return user;
        }

        public async Task<bool> IsThereSuchEmailAsync(string email)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            return user != null;
        }

        public async Task<bool> IsThereSuchNameAsync(string name)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == name);

            return user != null;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
