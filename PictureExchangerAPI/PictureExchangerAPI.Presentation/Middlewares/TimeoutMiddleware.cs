namespace PictureExchangerAPI.Presentation.Middlewares
{
    /// <summary>
    /// Задержка для каждой конечной точки
    /// </summary>
    public class TimeoutMiddleware
    {
        private readonly RequestDelegate _next;

        public TimeoutMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await Task.Delay(1000); 
            await _next.Invoke(context);
        }
    }
}
