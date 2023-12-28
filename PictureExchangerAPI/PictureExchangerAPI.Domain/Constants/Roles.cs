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

        /// <summary>
        /// Больше ли первая роль, чем вторая
        /// </summary>
        /// <param name="roleFirst">Первая роль</param>
        /// <param name="roleSecond">Вторая роль</param>
        /// <returns>true - первая больше, fasle - первая меньше или равна</returns>
        public static bool FirstRoleBigger(string roleFirst, string roleSecond)
        {
            List<string> roles = new List<string>() { User, Manager, SuperManager, Admin, SuperAdmin };
            int roleFirstIndex = 0;
            int roleSecondIndex = 0;
            for (int i = 0; i < roles.Count; i++)
            {
                if (roles[i] == roleFirst) roleFirstIndex = i;
                if (roles[i] == roleSecond) roleSecondIndex = i;
            }
            return roleFirstIndex > roleSecondIndex;
        }
    }
}
