using Microsoft.EntityFrameworkCore;
using PictureExchangerAPI.Domain.Entities;

namespace PictureExchangerAPI.Persistence
{
    /// <summary>
    /// Контекст базы данных
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        #region Данные

        /// <summary>
        /// Данные
        /// </summary>
        public DbSet<Image> Images { get; set; }

        /// <summary>
        /// Проверки данных
        /// </summary>
        public DbSet<Post> Posts { get; set; }

        /// <summary>
        /// Роли
        /// </summary>
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        /// <summary>
        /// Пользователи
        /// </summary>
        public DbSet<Role> Roles { get; set; }

        /// <summary>
        /// Пользователи
        /// </summary>
        public DbSet<Tag> Tags { get; set; }

        /// <summary>
        /// Пользователи
        /// </summary>
        public DbSet<User> Users { get; set; }

        #endregion

        /// <summary>
        /// Контекст базы данных
        /// </summary>
        /// <param name="options">Настройки</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Конфигурации
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Добавление уникальных атрибутов
            modelBuilder.Entity<Role>()
                .HasAlternateKey(r => r.Name);

            // Добавление двух первичных
            modelBuilder.Entity<Post>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<Role>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<User>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<Image>()
                .HasKey(i => new { i.PostId, i.Number });
            modelBuilder.Entity<RefreshToken>()
                .HasKey(i => new { i.UserId, i.Number });
            modelBuilder.Entity<Tag>()
                .HasKey(i => new { i.PostId, i.Number });

            // Добавление ролей в базу данных
            modelBuilder.Entity<Role>().HasData(DataForDB.Roles);

            // Инициализация данных по умолчанию
            CreateData(modelBuilder);
        }

        /// <summary>
        /// Создание данных для БД
        /// </summary>
        /// <param name="modelBuilder"></param>
        private void CreateData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RefreshToken>().HasData(DataForDB.RefreshTokens);
            modelBuilder.Entity<User>().HasData(DataForDB.Users);
            modelBuilder.Entity<Post>().HasData(DataForDB.Posts);
            modelBuilder.Entity<Tag>().HasData(DataForDB.Tags);
            modelBuilder.Entity<Image>().HasData(DataForDB.Images);
        }
    }
}
