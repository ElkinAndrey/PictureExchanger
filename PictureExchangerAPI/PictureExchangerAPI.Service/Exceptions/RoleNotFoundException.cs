namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Роль не найдена
    /// </summary>
    public sealed class RoleNotFoundException : Exception
    {
        /// <summary>
        /// Ошибка. Роль не найдена
        /// </summary>
        public RoleNotFoundException() :
            base($"Роль не найдена")
        {

        }

        /// <summary>
        /// Ошибка. Роль не найдена
        /// </summary>
        /// <param name="name">Имя роли</param>
        public RoleNotFoundException(string name) :
            base($"Роль \"{name}\" не найдена")
        {

        }
    }
}
