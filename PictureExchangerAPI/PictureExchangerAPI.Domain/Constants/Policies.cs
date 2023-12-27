namespace PictureExchangerAPI.Domain.Constants
{
    public class Policies
    {
        /// <summary>
        /// Менеджер (роли: менеджер)
        /// </summary>
        public const string Manager = "Manager";

        /// <summary>
        /// Cуперменеджер (роли: менеджер, суперменеджер)
        /// </summary>
        public const string SuperManager = "SuperManager";

        /// <summary>
        /// Администратор (роли: менеджер, суперменеджер, администратор)
        /// </summary>
        public const string Admin = "Admin";

        /// <summary>
        /// Суперадминистратор (роли: менеджер, суперменеджер, администратор, суперадминистратор)
        /// </summary>
        public const string SuperAdmin = "SuperAdmin";
    }
}
