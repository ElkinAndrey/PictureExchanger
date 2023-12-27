using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Service.DTO;

namespace PictureExchangerAPI.Service.Abstractions
{
    /// <summary>
    /// Интерфейс для репозитория с постами
    /// </summary>
    public interface IPostService
    {
        /// <summary>
        /// Получить посты
        /// </summary>
        /// <param name="start">Начало отчета</param>
        /// <param name="length">Длина среза</param>
        /// <param name="postName">Часть имени поста</param>
        /// <param name="userName">Имя человека</param>
        /// <returns>Список постов</returns>
        public Task<List<Post>> GetAsync(
            int start,
            int length,
            string postName,
            string? userName = null);

        /// <summary>
        /// Получить количество постов
        /// </summary>
        /// <param name="postName">Часть имени поста</param>
        /// <param name="userName">Имя человека</param>
        /// <returns>Количество постов</returns>
        public Task<int> GetCountAsync(
            string postName,
            string? userName = null);
        
        /// <summary>
        /// Получить пост по Id
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Пост</returns>
        public Task<Post> GetByIdAsync(Guid id);

        /// <summary>
        /// Добавить пост
        /// </summary>
        /// <param name="name">Id пользователя</param>
        /// <param name="name">Имя поста</param>
        /// <param name="isPrivate">Приватный ли</param>
        /// <param name="tags">Список тэгов</param>
        /// <param name="images">Список картинок</param>
        public Task AddAsync(
            Guid userId,
            string name,
            bool isPrivate,
            IEnumerable<string> tags,
            IEnumerable<DownloadedFile> images);

        /// <summary>
        /// Изменить пост
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="name">Название поста</param>
        /// <param name="isPrivate">Приватный ли</param>
        /// <param name="isBanned">Забанен ли</param>
        /// <param name="tags">Тэги поста</param>
        /// <param name="userId">Id пользователя</param>
        public Task ChangeAsync(
            Guid postId,
            string? name = null,
            bool? isPrivate = null,
            bool? isBanned = null,
            IEnumerable<string>? tags = null,
            Guid? userId = null);

        /// <summary>
        /// Удалить пост
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="userId">Id пользователя</param>
        public Task DeleteAsync(
            Guid postId,
            Guid? userId = null);
    }
}
