namespace PictureExchangerAPI.Service.Exceptions
{
    /// <summary>
    /// Ошибка. Не хватает прав на выдачу роли
    /// </summary>
    public sealed class ThereAreNotEnoughRightsToIssueRoleException : Exception
    {
        /// <summary>
        /// Ошибка. Не хватает прав на выдачу роли
        /// </summary>
        public ThereAreNotEnoughRightsToIssueRoleException() :
            base($"Не хватает прав на выдачу роли")
        {

        }
    }
}
