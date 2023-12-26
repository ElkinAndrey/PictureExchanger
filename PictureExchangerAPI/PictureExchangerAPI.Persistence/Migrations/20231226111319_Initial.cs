using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PictureExchangerAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.UniqueConstraint("AK_Roles_Name", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsBanned = table.Column<bool>(type: "bit", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfCreation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPrivate = table.Column<bool>(type: "bit", nullable: false),
                    IsBanned = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Number = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeviceData = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LoginDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RefreshDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => new { x.UserId, x.Number });
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Number = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => new { x.PostId, x.Number });
                    table.ForeignKey(
                        name: "FK_Images_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Number = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => new { x.PostId, x.Number });
                    table.ForeignKey(
                        name: "FK_Tags_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("5357d05f-e484-4a52-907e-3710fc71a64b"), "SuperManager" },
                    { new Guid("6009b44e-9b19-4c0c-9cb6-52d91169ad96"), "SuperAdmin" },
                    { new Guid("67f7c180-23df-4985-b243-5223c69fa797"), "User" },
                    { new Guid("9198cf7c-486e-4003-a176-3cde363f656a"), "Admin" },
                    { new Guid("b32f93a5-b2d9-4d59-ba83-e9a672f67dde"), "Manager" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsBanned", "Name", "PasswordHash", "PasswordSalt", "RegistrationDate", "RoleId" },
                values: new object[,]
                {
                    { new Guid("2efa388c-584b-4e8d-9c5d-29fa600cfac9"), "3@3.3", false, "user3", "mVJOzj048UABroLpqaiOCXC7ov4rY/bHqr8zYznk+2I=", new byte[] { 34, 54, 150, 248, 77, 23, 108, 37, 149, 29, 207, 94, 119, 12, 110, 183 }, new DateTime(2023, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("b32f93a5-b2d9-4d59-ba83-e9a672f67dde") },
                    { new Guid("35434031-0853-472c-8c87-3b7831e0fd17"), "1@1.1", false, "user1", "yE3UT3m6W4KlkNLJdTAM4UQYIZuS7QIU/6kWcAjU/mc=", new byte[] { 118, 75, 18, 36, 222, 48, 190, 38, 185, 49, 119, 151, 113, 34, 164, 228 }, new DateTime(2023, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("67f7c180-23df-4985-b243-5223c69fa797") },
                    { new Guid("adca4721-3a4c-44ca-80a6-de74abc7450e"), "5@5.5", false, "user5", "4PDjB8dRo5n/m9N7vnYR8tM/PdyB0M7wV+dHNRAD3YQ=", new byte[] { 51, 48, 107, 15, 165, 157, 219, 223, 108, 49, 81, 49, 152, 219, 5, 159 }, new DateTime(2023, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("9198cf7c-486e-4003-a176-3cde363f656a") },
                    { new Guid("ead9e0c0-395b-4489-a82b-416562905957"), "4@4.4", false, "user4", "Kfqg0txtZSqNkmeQbOosmGadf/IIaB2z3WaeMr3C1o0=", new byte[] { 205, 233, 1, 141, 87, 98, 77, 54, 135, 152, 169, 87, 148, 116, 188, 201 }, new DateTime(2023, 7, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("5357d05f-e484-4a52-907e-3710fc71a64b") },
                    { new Guid("f5080b8b-9b17-497b-8fe3-9470978b0ab1"), "6@6.6", false, "user6", "Pmuehs/dEiTauUtjQXqPWSjr4XombKHPuqgZBW1JYhM=", new byte[] { 128, 183, 146, 79, 41, 2, 134, 246, 132, 144, 191, 89, 214, 199, 85, 70 }, new DateTime(2023, 11, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6009b44e-9b19-4c0c-9cb6-52d91169ad96") },
                    { new Guid("f725550b-b2b0-4509-85bd-556535471756"), "2@2.2", false, "user2", "KjK/J9gOLsJ5Qi8MQlpn7+G5YcU1ZnQtuZI1X+TTzy0=", new byte[] { 137, 110, 127, 108, 129, 137, 155, 42, 178, 110, 230, 77, 29, 222, 131, 149 }, new DateTime(2023, 5, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("67f7c180-23df-4985-b243-5223c69fa797") }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "DateOfCreation", "IsBanned", "IsPrivate", "Name", "UserId" },
                values: new object[,]
                {
                    { new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"), new DateTime(2023, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post4", new Guid("f725550b-b2b0-4509-85bd-556535471756") },
                    { new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"), new DateTime(2024, 1, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), true, false, "post2", new Guid("35434031-0853-472c-8c87-3b7831e0fd17") },
                    { new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"), new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), false, true, "post3", new Guid("f725550b-b2b0-4509-85bd-556535471756") },
                    { new Guid("4728eb74-839f-4e22-973a-0eaee29ea960"), new DateTime(2024, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post7", new Guid("ead9e0c0-395b-4489-a82b-416562905957") },
                    { new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"), new DateTime(2023, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), false, true, "post1", new Guid("35434031-0853-472c-8c87-3b7831e0fd17") },
                    { new Guid("c6bf7649-07b1-42b7-85cf-67452a262dba"), new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post6", new Guid("2efa388c-584b-4e8d-9c5d-29fa600cfac9") },
                    { new Guid("c8ccb7c4-fce6-48a7-a7b8-4068cee25116"), new DateTime(2024, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post9", new Guid("f5080b8b-9b17-497b-8fe3-9470978b0ab1") },
                    { new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"), new DateTime(2023, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post5", new Guid("f725550b-b2b0-4509-85bd-556535471756") },
                    { new Guid("e4e87360-4002-4a59-835e-1ca5e7d6868f"), new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "post8", new Guid("adca4721-3a4c-44ca-80a6-de74abc7450e") }
                });

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Number", "PostId" },
                values: new object[,]
                {
                    { 1, new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451") },
                    { 1, new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82") },
                    { 2, new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82") },
                    { 1, new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883") },
                    { 2, new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883") },
                    { 1, new Guid("78dec745-66f1-4c41-8e5d-ea9969267155") },
                    { 2, new Guid("78dec745-66f1-4c41-8e5d-ea9969267155") },
                    { 1, new Guid("c6bf7649-07b1-42b7-85cf-67452a262dba") },
                    { 1, new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff") },
                    { 2, new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff") }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Number", "PostId", "Text" },
                values: new object[,]
                {
                    { 1, new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"), "tag6" },
                    { 2, new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"), "tag7" },
                    { 1, new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"), "tag3" },
                    { 1, new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"), "tag4" },
                    { 2, new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"), "tag5" },
                    { 1, new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"), "tag1" },
                    { 2, new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"), "tag2" },
                    { 1, new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"), "tag8" },
                    { 2, new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"), "tag9" },
                    { 3, new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"), "tag10" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
