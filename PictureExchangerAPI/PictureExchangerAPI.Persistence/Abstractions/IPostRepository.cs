using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.DTO;

namespace PictureExchangerAPI.Persistence.Abstractions
{
    /// <summary>
    /// Интерфейс для репозитория с постами
    /// </summary>
    public interface IPostRepository
    {
        /// <summary>
        /// Получить посты
        /// </summary>
        /// <param name="start">Начало отчета</param>
        /// <param name="length">Длина среза</param>
        /// <param name="postName">Часть имени поста</param>
        /// <param name="userName">Имя человека</param>
        /// <returns>Список постов</returns>
        public Task<List<Post>> Get(
            int start,
            int length,
            string postName,
            string? userName);

        /// <summary>
        /// Получить количество постов
        /// </summary>
        /// <param name="postName">Часть имени поста</param>
        /// <param name="userName">Имя человека</param>
        /// <returns>Количество постов</returns>
        public Task<int> GetCount(
            string postName,
            string? userName);
        
        /// <summary>
        /// Получить пост по Id
        /// </summary>
        /// <param name="id">Id поста</param>
        /// <returns>Пост</returns>
        public Task<Post> GetById(Guid id);

        /// <summary>
        /// Добавить пост
        /// </summary>
        /// <param name="name">Id пользователя</param>
        /// <param name="name">Имя поста</param>
        /// <param name="isPrivate">Приватный ли</param>
        /// <param name="tags">Список тэгов</param>
        /// <param name="images">Список картинок</param>
        public Task Add(
            Guid userId,
            string name,
            bool isPrivate,
            List<string> tags,
            List<DownloadedFile> images);

        /// <summary>
        /// Изменить пост
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="name">Название поста</param>
        /// <param name="isPrivate">Приватный ли</param>
        /// <param name="isBanned">Забанен ли</param>
        /// <param name="tags">Тэги поста</param>
        /// <param name="userId">Id пользователя</param>
        public Task Change(
            Guid postId,
            string? name,
            bool? isPrivate,
            bool? isBanned,
            List<string>? tags,
            Guid? userId);

        /// <summary>
        /// Удалить пост
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="userId">Id пользователя</param>
        public Task Delete(
            Guid postId,
            Guid? userId);
    }
}
