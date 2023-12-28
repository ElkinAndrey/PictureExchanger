namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Не указана роль изменителя роли
    /// </summary>
    public sealed class RoleChangerNotShownException : Exception
    {
        /// <summary>
        /// Ошибка. Не указана роль изменителя роли
        /// </summary>
        public RoleChangerNotShownException() :
            base($"Не указана роль изменителя роли")
        {

        }
    }
}
