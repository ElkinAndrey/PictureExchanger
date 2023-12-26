namespace PictureExchangerAPI.Service.DTO
{
    /// <summary>
    /// Хэш и соль пароля
    /// </summary>
    /// <param name="passwordHash">Хэш пароля</param>
    /// <param name="passwordSalt">Соль пароля</param>
    public partial record class HashAndSalt(
        string PasswordHash,
        byte[] PasswordSalt);
}
