namespace PictureExchangerAPI.Persistence.DTO
{
    /// <summary>
    /// Файл
    /// </summary>
    /// <param name="stream">Стрим файла</param>
    /// <param name="contentType">MIME тип файла</param>
    /// <param name="fileDownloadName">Имя файла</param>
    public sealed record class DownloadedFile(
        Stream stream,
        string contentType,
        string? fileDownloadName);
}
