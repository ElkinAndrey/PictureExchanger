namespace PictureExchangerAPI.Service.DTO
{
    /// <summary>
    /// Пара токенов
    /// </summary>
    /// <param name="AccessToken">Токен доступа</param>
    /// <param name="RefreshToken">Токен обновления</param>
    /// <param name="DateOfCreation">Дата создания</param>
    public partial record class PairOfTokens(
        string AccessToken,
        string RefreshToken,
        DateTime DateOfCreation);
}
