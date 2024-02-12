namespace PictureExchangerAPI.Presentation.Middlewares
{
    /// <summary>
    /// Кастомные Middleware
    /// </summary>
    public static class MiddlewareExtensions
    {
        /// <summary>
        /// Глобальная обработка исключений
        /// </summary>
        public static void UseExceptionHandlerMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>();
        }

        public static void UseTimeDelayMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<TimeoutMiddleware>();
        }
    }
}
