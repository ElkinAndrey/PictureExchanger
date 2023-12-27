using PictureExchangerAPI.Domain.Entities;

namespace PictureExchangerAPI.Persistence
{
    public static class DataForDB
    {
        /// <summary>
        /// Роли
        /// </summary>
        public static List<Role> Roles { get; } = new List<Role>()
        {
            new Role { Id = new Guid("67f7c180-23df-4985-b243-5223c69fa797"), Name = Domain.Constants.Roles.User },
            new Role { Id = new Guid("b32f93a5-b2d9-4d59-ba83-e9a672f67dde"), Name = Domain.Constants.Roles.Manager },
            new Role { Id = new Guid("5357d05f-e484-4a52-907e-3710fc71a64b"), Name = Domain.Constants.Roles.SuperManager },
            new Role { Id = new Guid("9198cf7c-486e-4003-a176-3cde363f656a"), Name = Domain.Constants.Roles.Admin },
            new Role { Id = new Guid("6009b44e-9b19-4c0c-9cb6-52d91169ad96"), Name = Domain.Constants.Roles.SuperAdmin },
        };

        /// <summary>
        /// Токены доступа
        /// </summary>
        public static List<RefreshToken> RefreshTokens { get; } = new List<RefreshToken>()
        {
        };

        /// <summary>
        /// Пользователи
        /// </summary>
        public static List<User> Users { get; } = new List<User>()
        {
            new User() { Id = new Guid("35434031-0853-472c-8c87-3b7831e0fd17"), Name = "user1", Email = "1@1.1", RoleId = Roles[0].Id, PasswordHash = "yE3UT3m6W4KlkNLJdTAM4UQYIZuS7QIU/6kWcAjU/mc=", PasswordSalt = new byte[] { 118 ,75 ,18 ,36 ,222 ,48 ,190 ,38 ,185 ,49 ,119 ,151 ,113 ,34 ,164 ,228 }, RegistrationDate = new DateTime(2023, 4, 6), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
            new User() { Id = new Guid("f725550b-b2b0-4509-85bd-556535471756"), Name = "user2", Email = "2@2.2", RoleId = Roles[0].Id, PasswordHash = "KjK/J9gOLsJ5Qi8MQlpn7+G5YcU1ZnQtuZI1X+TTzy0=", PasswordSalt = new byte[] { 137 ,110 ,127 ,108 ,129 ,137 ,155 ,42 ,178 ,110 ,230 ,77 ,29 ,222 ,131 ,149 }, RegistrationDate = new DateTime(2023, 5, 8), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
            new User() { Id = new Guid("2efa388c-584b-4e8d-9c5d-29fa600cfac9"), Name = "user3", Email = "3@3.3", RoleId = Roles[1].Id, PasswordHash = "mVJOzj048UABroLpqaiOCXC7ov4rY/bHqr8zYznk+2I=", PasswordSalt = new byte[] { 34 ,54 ,150 ,248 ,77 ,23 ,108 ,37 ,149 ,29 ,207 ,94 ,119 ,12 ,110 ,183 }, RegistrationDate = new DateTime(2023, 3, 10), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
            new User() { Id = new Guid("ead9e0c0-395b-4489-a82b-416562905957"), Name = "user4", Email = "4@4.4", RoleId = Roles[2].Id, PasswordHash = "Kfqg0txtZSqNkmeQbOosmGadf/IIaB2z3WaeMr3C1o0=", PasswordSalt = new byte[] { 205 ,233 ,1 ,141 ,87 ,98 ,77 ,54 ,135 ,152 ,169 ,87 ,148 ,116 ,188 ,201 }, RegistrationDate = new DateTime(2023, 7, 20), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
            new User() { Id = new Guid("adca4721-3a4c-44ca-80a6-de74abc7450e"), Name = "user5", Email = "5@5.5", RoleId = Roles[3].Id, PasswordHash = "4PDjB8dRo5n/m9N7vnYR8tM/PdyB0M7wV+dHNRAD3YQ=", PasswordSalt = new byte[] { 51 ,48 ,107 ,15 ,165 ,157 ,219 ,223 ,108 ,49 ,81 ,49 ,152 ,219 ,5 ,159 }, RegistrationDate = new DateTime(2023, 8, 2), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
            new User() { Id = new Guid("f5080b8b-9b17-497b-8fe3-9470978b0ab1"), Name = "user6", Email = "6@6.6", RoleId = Roles[4].Id, PasswordHash = "Pmuehs/dEiTauUtjQXqPWSjr4XombKHPuqgZBW1JYhM=", PasswordSalt = new byte[] { 128 ,183 ,146 ,79 ,41 ,2 ,134 ,246 ,132 ,144 ,191 ,89 ,214 ,199 ,85 ,70 }, RegistrationDate = new DateTime(2023, 11, 14), IsBanned=false, RefreshTokens = new List<RefreshToken>() },
        };

        /// <summary>
        /// Посты
        /// </summary>
        public static List<Post> Posts { get; } = new List<Post>()
        {
            new Post { Id = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"), Name = "post1", DateOfCreation = new DateTime(2023, 3, 8), IsPrivate = true, IsBanned = false, UserId = Users[0].Id },
            new Post { Id = new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"), Name = "post2", DateOfCreation = new DateTime(2024, 1, 8), IsPrivate = false, IsBanned = true, UserId = Users[0].Id },
            new Post { Id = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"), Name = "post3", DateOfCreation = new DateTime(2023, 1, 2), IsPrivate = true, IsBanned = false, UserId = Users[1].Id },
            new Post { Id = new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"), Name = "post4", DateOfCreation = new DateTime(2023, 3, 6), IsPrivate = false, IsBanned = false, UserId = Users[1].Id },
            new Post { Id = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"), Name = "post5", DateOfCreation = new DateTime(2023, 4, 3), IsPrivate = false, IsBanned = false, UserId = Users[1].Id },
            new Post { Id = new Guid("c6bf7649-07b1-42b7-85cf-67452a262dba"), Name = "post6", DateOfCreation = new DateTime(2024, 1, 2), IsPrivate = false, IsBanned = false, UserId = Users[2].Id },
            new Post { Id = new Guid("4728eb74-839f-4e22-973a-0eaee29ea960"), Name = "post7", DateOfCreation = new DateTime(2024, 7, 6), IsPrivate = false, IsBanned = false, UserId = Users[3].Id },
            new Post { Id = new Guid("e4e87360-4002-4a59-835e-1ca5e7d6868f"), Name = "post8", DateOfCreation = new DateTime(2024, 1, 2), IsPrivate = false, IsBanned = false, UserId = Users[4].Id },
            new Post { Id = new Guid("c8ccb7c4-fce6-48a7-a7b8-4068cee25116"), Name = "post9", DateOfCreation = new DateTime(2024, 3, 8), IsPrivate = false, IsBanned = false, UserId = Users[5].Id },
        };

        /// <summary>
        /// Тэги
        /// </summary>
        public static List<Tag> Tags { get; } = new List<Tag>()
        {
            new Tag { PostId = Posts[0].Id, Number = 1, Text = "tag1" },
            new Tag { PostId = Posts[0].Id, Number = 2, Text = "tag2" },
            new Tag { PostId = Posts[1].Id, Number = 1, Text = "tag3" },
            new Tag { PostId = Posts[2].Id, Number = 1, Text = "tag4" },
            new Tag { PostId = Posts[2].Id, Number = 2, Text = "tag5" },
            new Tag { PostId = Posts[3].Id, Number = 1, Text = "tag6" },
            new Tag { PostId = Posts[3].Id, Number = 2, Text = "tag7" },
            new Tag { PostId = Posts[4].Id, Number = 1, Text = "tag8" },
            new Tag { PostId = Posts[4].Id, Number = 2, Text = "tag9" },
            new Tag { PostId = Posts[4].Id, Number = 3, Text = "tag10" },
        };

        /// <summary>
        /// Картинки
        /// </summary>
        public static List<Image> Images { get; } = new List<Image>()
        {
            new Image { PostId = Posts[0].Id, Number = 1, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[0].Id, Number = 2, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[1].Id, Number = 1, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[1].Id, Number = 2, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[2].Id, Number = 1, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[2].Id, Number = 2, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[3].Id, Number = 1, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[4].Id, Number = 1, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[4].Id, Number = 2, СontentType="image/png", Name="123.png" },
            new Image { PostId = Posts[5].Id, Number = 1, СontentType="image/png", Name="123.png" },
        };
    }
}
