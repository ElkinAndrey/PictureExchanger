using PictureExchangerAPI.Service.Exceptions;
using PictureExchangerAPI.Presentation.Exceptions;

namespace PictureExchangerAPI.Presentation.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionMessageAsync(context, ex).ConfigureAwait(false);
            }
        }

        private static Task HandleExceptionMessageAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "text/plain;charset=utf-8";

            /// 400 - некорректный, не полный или пустой запрос (например, если в 
            ///       JSON не был передан какой то параметр)
            /// 401 - клиент не авторизован
            /// 403 - утрачено разрешение доступа
            /// 404 - страница или элемент не найден (например, если неверно 
            ///       указан ID)
            /// 409 - конфликт при выполнении запроса (например, если человека 
            ///       пытаются добавить в клуб, а он уже состоит в клубе или 
            ///       пользователь уже зарегистрирован по такой почте)   
            /// 422 - ошибка валидации (неверный формат введения Email или пароль 
            ///       слишком простой)

            if (exception is RefreshTokenNotInCookieException)
                return CreateError(context, 401, exception);
            if (exception is RefreshTokenObsoleteException)
                return CreateError(context, 401, exception);

            if (exception is UserDoesNotHaveRightsToEditPostException)
                return CreateError(context, 403, exception);

            if (exception is UserNotFoundException)
                return CreateError(context, 404, exception);
            if (exception is PostNotFoundException)
                return CreateError(context, 404, exception);
            if (exception is WrongPasswordException)
                return CreateError(context, 404, exception);

            if (exception is UserWithThisEmailExistsException)
                return CreateError(context, 409, exception);
            if (exception is UserWithThisNameExistsException)
                return CreateError(context, 409, exception);

            return CreateError(context, 500, exception);
        }

        /// <summary>
        /// Создать ошибку
        /// </summary>
        /// <remarks>
        /// Вынос повторяющейся информации
        /// </remarks>
        /// <param name="context">HttpContext</param>
        /// <param name="statusCode">Статус код</param>
        /// <param name="message">Сообщение</param>
        /// <returns></returns>
        private static Task CreateError(HttpContext context, int statusCode, string message)
        {
            context.Response.StatusCode = statusCode;
            return context.Response.WriteAsync(message);
        }

        /// <summary>
        /// Создать ошибку
        /// </summary>
        /// <remarks>
        /// Вынос повторяющейся информации
        /// </remarks>
        /// <param name="context">HttpContext</param>
        /// <param name="statusCode">Статус код</param>
        /// <param name="exception">Возникшая ошибка</param>
        /// <returns></returns>
        private static Task CreateError(HttpContext context, int statusCode, Exception exception)
        {
            return CreateError(context, statusCode, exception.Message);
        }
    }
}
