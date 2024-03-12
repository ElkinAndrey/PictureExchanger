using PictureExchangerAPI.Presentation.Configure;
using PictureExchangerAPI.Presentation.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var configureApplicationServices = new ConfigureApplicationServices(builder);
configureApplicationServices.Start();

var app = builder.Build();

// Настраиваем конвейер HTTP-запросов.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
    options.WithOrigins(builder.Configuration.GetSection("ClientUrl").Value!) //  Кому можно получать данные с сервера
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()); // Разрешить отправку куки

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseExceptionHandlerMiddleware();
app.UseTimeDelayMiddleware();
app.Run();
