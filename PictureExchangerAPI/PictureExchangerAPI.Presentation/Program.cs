using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Добавляем сервисы в контейнер.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Стандартный заголовок авторизации с использованием схемы Bearer (\"bearer {токен}\")",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    // Нужно для того, чтобы Swagger всегда прокидывал JWT токен в Header
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero, // Для нормальной работы времени в токене
        };
    });

builder.Services.AddAuthorization(options =>
{
    // Менеджер
    options.AddPolicy("Manager", builder =>
    {
        builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
        builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, "Manager")
                                   || x.User.HasClaim(ClaimTypes.Role, "Admin"));
    });

    // Администратор
    options.AddPolicy("Admin", builder =>
    {
        builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
        builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, "Admin"));
    });
});

var app = builder.Build();

// Настраиваем конвейер HTTP-запросов.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
    options.WithOrigins("http://localhost:3000") //  Кому можно получать данные с сервера
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()); // Разрешить отправку куки

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
