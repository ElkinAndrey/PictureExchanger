using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PictureExchangerAPI.Domain.Constants
{
    public static class Roles
    {
        /// <summary>
        /// Обычный пользователь
        /// </summary>
        public const string User = "User";

        /// <summary>
        /// Менеджер
        /// </summary>
        public const string Manager = "Manager";

        /// <summary>
        /// Cуперменеджер
        /// </summary>
        public const string SuperManager = "SuperManager";

        /// <summary>
        /// Администратор
        /// </summary>
        public const string Admin = "Admin";

        /// <summary>
        /// Суперадминистратор
        /// </summary>
        public const string SuperAdmin = "SuperAdmin";
    }
}
