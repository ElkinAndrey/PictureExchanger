namespace PictureExchangerAPI.Persistence.DTO
{
    /// <summary>
    /// Файл
    /// </summary>
    /// <param name="Stream">Стрим файла</param>
    /// <param name="ContentType">MIME тип файла</param>
    /// <param name="FileDownloadName">Имя файла</param>
    public sealed record class DownloadedFile(
        Stream Stream,
        string ContentType,
        string FileDownloadName);
}
