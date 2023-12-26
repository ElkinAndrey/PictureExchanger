namespace PictureExchangerAPI.Presentation.Middlewares
{
    /// <summary>
    /// Кастомные Middleware
    /// </summary>
    public static class ExceptionHandlerMiddlewareExtensions
    {
        /// <summary>
        /// Глобальная обработка исключений
        /// </summary>
        public static void UseExceptionHandlerMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>();
        }
    }
}
