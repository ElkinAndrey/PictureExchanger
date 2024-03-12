using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PictureExchangerAPI.Domain.Constants;
using PictureExchangerAPI.Domain.Entities;
using PictureExchangerAPI.Persistence.Abstractions;
using PictureExchangerAPI.Persistence;
using PictureExchangerAPI.Service.Abstractions;
using PictureExchangerAPI.Service.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Claims;
using System.Text;
using Minio;
using PictureExchangerAPI.Persistence.Repositories;
using PictureExchangerAPI.Service.Repositories;

namespace PictureExchangerAPI.Presentation.Configure
{
    /// <summary>
    /// Конфигурациии милдвейр
    /// </summary>
    public class ConfigureApplicationServices
    {
        /// <summary>
        /// Билдер
        /// </summary>
        private readonly WebApplicationBuilder builder;

        /// <summary>
        /// Конфигурациии милдвейр
        /// </summary>
        /// <param name="builder">Билдер</param>
        public ConfigureApplicationServices(WebApplicationBuilder builder)
        {
            this.builder = builder;
        }

        /// <summary>
        /// Настройки MinIO
        /// </summary>
        public void Minio()
        {
            builder.Services.AddMinio(options => options
                .WithEndpoint(builder.Configuration.GetSection("MinioUrl").Value!)
                .WithCredentials(
                    accessKey: builder.Configuration.GetSection("Minio:AccessKey").Value!,
                    secretKey: builder.Configuration.GetSection("Minio:SecretKey").Value!)
                .WithSSL(false)
            );
        }

        /// <summary>
        /// Настройки базы данных
        /// </summary>
        public void DataBase()
        {
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            );
        }

        /// <summary>
        /// Настройки Swagger
        /// </summary>
        public void SwaggerSettings()
        {
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
        }

        /// <summary>
        /// Настройки аутентификации
        /// </summary>
        public void AuthenticationSettings()
        {
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
        }

        /// <summary>
        /// Политики для авторизации
        /// </summary>
        public void AuthPolicy()
        {
            builder.Services.AddAuthorization(options =>
            {
                // Менеджер
                options.AddPolicy(Policies.Manager, builder =>
                {
                    builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, Roles.Manager)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.SuperManager)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.Admin)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.SuperAdmin));
                });

                // Суперменеджер
                options.AddPolicy(Policies.SuperManager, builder =>
                {
                    builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, Roles.SuperManager)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.Admin)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.SuperAdmin));
                });

                // Администратор
                options.AddPolicy(Policies.Admin, builder =>
                {
                    builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, Roles.Admin)
                                               || x.User.HasClaim(ClaimTypes.Role, Roles.SuperAdmin));
                });

                // Суперадминистратор
                options.AddPolicy(Policies.SuperAdmin, builder =>
                {
                    builder.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    builder.RequireAssertion(x => x.User.HasClaim(ClaimTypes.Role, Roles.SuperAdmin));
                });
            });
        }

        /// <summary>
        /// Внедрение зависимостей
        /// </summary>
        public void DependencyInjection()
        {
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IPostService, PostService>();
            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IFileRepository, MinioFileRepository>();
        }

        /// <summary>
        /// Выполнить всё
        /// </summary>
        public void Start()
        {
            Minio();
            DataBase();
            SwaggerSettings();
            AuthenticationSettings();
            AuthPolicy();
            DependencyInjection();
        }
    }
}
