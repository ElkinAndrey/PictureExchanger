namespace PictureExchangerAPI.Presentation.DTO.User
{
    /// <summary>
    /// Dto для получения пользователей
    /// </summary>
    /// <param name="Start">Начало отчета</param>
    /// <param name="Length">Длина среза</param>
    /// <param name="Name">Часть имени</param>
    /// <param name="IsBanned">Забанен ли</param>
    /// <param name="IsSortByRegistrationDate">Сортировать по дате регистрации</param>
    /// <param name="IsSortByBannedDate">Сортировать по дате бана</param>
    public record class GetUsersDto(
        int Start,
        int Length,
        string Name,
        bool? IsBanned,
        bool IsSortByRegistrationDate,
        bool IsSortByBannedDate);
}
