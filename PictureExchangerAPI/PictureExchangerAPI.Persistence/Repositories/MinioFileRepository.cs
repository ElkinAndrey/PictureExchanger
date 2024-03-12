using Minio;
using Minio.DataModel.Args;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Persistence.Exceptions;
using System.Reactive.Linq;

namespace PictureExchangerAPI.Persistence.Repositories
{
    /// <summary>
    /// Репозиторий для работы с файлами при помощи MinIO
    /// </summary>
    public class MinioFileRepository : IFileRepository
    {
        /// <summary>
        /// Клиент для работы с MinIO
        /// </summary>
        private readonly IMinioClient _minioClient;

        /// <summary>
        /// Имя бакета для постов
        /// </summary>
        private readonly string _postBucket = "images";

        /// <summary>
        /// Репозиторий для работы с файлами при помощи MinIO
        /// </summary>
        /// <param name="minioClient">Клиент для работы с MinIO</param>
        public MinioFileRepository(IMinioClient minioClient)
        {
            _minioClient = minioClient;
        }

        public async Task AddPostImageAsync(
            Guid id,
            int number,
            Stream stream,
            string contentType)
        {
            string name = GetObjectName(id, number);
            var args = new PutObjectArgs()
                .WithObjectSize(stream.Length)
                .WithStreamData(stream)
                .WithBucket(_postBucket)
                .WithObject(name)
                .WithContentType(contentType);
            await _minioClient.PutObjectAsync(args);
        }

        public async Task DeletePostImagesAsync(Guid id)
        {
            var listArgs = new ListObjectsArgs()
                .WithBucket(_postBucket)
                .WithPrefix($"{id}/");
            var list = await _minioClient
                .ListObjectsAsync(listArgs)
                .Select(item => item.Key)
                .ToList();
            RemoveObjectsArgs rmArgs = new RemoveObjectsArgs()
                .WithBucket(_postBucket)
                .WithObjects(list);
            await _minioClient.RemoveObjectsAsync(rmArgs);
        }

        public async Task<Stream> GetPostImageStreamAsync(
            Guid postId,
            int number)
        {
            string objectName = GetObjectName(postId, number);
            MemoryStream stream = new MemoryStream();
            var args = new GetObjectArgs()
                .WithBucket(_postBucket)
                .WithObject(objectName)
                .WithCallbackStream(stream.CopyTo);
            await _minioClient.GetObjectAsync(args);
            stream.Position = 0;
            return stream;
        }

        public async Task<string> GetPostImageUrlAsync(
            Guid postId,
            int number)
        {
            string objectName = GetObjectName(postId, number);
            var args = new PresignedGetObjectArgs()
                .WithBucket(_postBucket)
                .WithObject(objectName)
                .WithExpiry(1200);
            var stat = new StatObjectArgs()
                .WithBucket(_postBucket)
                .WithObject(objectName);

            var urlTask = _minioClient.PresignedGetObjectAsync(args);
            var foundTask = _minioClient.StatObjectAsync(stat);
            var url = await urlTask;
            var found = await foundTask;
            if (found.Size == 0) throw new ImageNotFoundException();

            return url;
        }

        /// <summary>
        /// Получить имя файла
        /// </summary>
        /// <param name="postId">Id поста</param>
        /// <param name="number">Номер картинки</param>
        /// <returns>Полное имя файла</returns>
        private string GetObjectName(Guid postId, int number) 
            => $"{postId}/{number}";
    }
}
