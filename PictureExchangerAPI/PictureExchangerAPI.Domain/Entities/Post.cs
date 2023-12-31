﻿namespace PictureExchangerAPI.Domain.Entities
{
    /// <summary>
    /// Пост
    /// </summary>
    public class Post
    {
        /// <summary>
        /// Id поста
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Дата создания
        /// </summary>
        public DateTime DateOfCreation { get; set; } = DateTime.Now;

        /// <summary>
        /// Приватен ли
        /// </summary>
        public bool IsPrivate { get; set; } = false;

        /// <summary>
        /// Забанен ли
        /// </summary>
        public bool IsBanned { get; set; } = false;

        /// <summary>
        /// Список картинок
        /// </summary>
        public List<Image> Images { get; set; } = null!;

        /// <summary>
        /// Список тегов
        /// </summary>
        public List<Tag> Tags { get; set; } = null!;

        /// <summary>
        /// Id пользователя
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Пользователь, оставивший пост
        /// </summary>
        public User User { get; set; } = null!;
    }
}
