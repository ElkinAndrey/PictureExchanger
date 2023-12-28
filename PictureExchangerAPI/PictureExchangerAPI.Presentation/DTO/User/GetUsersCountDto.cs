namespace PictureExchangerAPI.Presentation.DTO.User
{
    /// <summary>
    /// Dto для получения количества пользователей
    /// </summary>
    /// <param name="Name">Часть имени</param>
    /// <param name="IsBanned">Забанен ли</param>
    /// <param name="IsSortByRegistrationDate">Сортировать по дате регистрации</param>
    /// <param name="IsSortByBannedDate">Сортировать по дате бана</param>
    public record class GetUsersCountDto(
        string Name,
        bool? IsBanned,
        bool IsSortByRegistrationDate,
        bool IsSortByBannedDate);
}
