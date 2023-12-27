﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PictureExchangerAPI.Persistence;

#nullable disable

namespace PictureExchangerAPI.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Image", b =>
                {
                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("СontentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PostId", "Number");

                    b.ToTable("Images");

                    b.HasData(
                        new
                        {
                            PostId = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"),
                            Number = 2,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"),
                            Number = 2,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"),
                            Number = 2,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            Number = 2,
                            Name = "123.png",
                            СontentType = "image/png"
                        },
                        new
                        {
                            PostId = new Guid("c6bf7649-07b1-42b7-85cf-67452a262dba"),
                            Number = 1,
                            Name = "123.png",
                            СontentType = "image/png"
                        });
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateOfCreation")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsBanned")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");

                    b.HasData(
                        new
                        {
                            Id = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"),
                            DateOfCreation = new DateTime(2023, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = true,
                            Name = "post1",
                            UserId = new Guid("35434031-0853-472c-8c87-3b7831e0fd17")
                        },
                        new
                        {
                            Id = new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"),
                            DateOfCreation = new DateTime(2024, 1, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = true,
                            IsPrivate = false,
                            Name = "post2",
                            UserId = new Guid("35434031-0853-472c-8c87-3b7831e0fd17")
                        },
                        new
                        {
                            Id = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"),
                            DateOfCreation = new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = true,
                            Name = "post3",
                            UserId = new Guid("f725550b-b2b0-4509-85bd-556535471756")
                        },
                        new
                        {
                            Id = new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"),
                            DateOfCreation = new DateTime(2023, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post4",
                            UserId = new Guid("f725550b-b2b0-4509-85bd-556535471756")
                        },
                        new
                        {
                            Id = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            DateOfCreation = new DateTime(2023, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post5",
                            UserId = new Guid("f725550b-b2b0-4509-85bd-556535471756")
                        },
                        new
                        {
                            Id = new Guid("c6bf7649-07b1-42b7-85cf-67452a262dba"),
                            DateOfCreation = new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post6",
                            UserId = new Guid("2efa388c-584b-4e8d-9c5d-29fa600cfac9")
                        },
                        new
                        {
                            Id = new Guid("4728eb74-839f-4e22-973a-0eaee29ea960"),
                            DateOfCreation = new DateTime(2024, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post7",
                            UserId = new Guid("ead9e0c0-395b-4489-a82b-416562905957")
                        },
                        new
                        {
                            Id = new Guid("e4e87360-4002-4a59-835e-1ca5e7d6868f"),
                            DateOfCreation = new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post8",
                            UserId = new Guid("adca4721-3a4c-44ca-80a6-de74abc7450e")
                        },
                        new
                        {
                            Id = new Guid("c8ccb7c4-fce6-48a7-a7b8-4068cee25116"),
                            DateOfCreation = new DateTime(2024, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsBanned = false,
                            IsPrivate = false,
                            Name = "post9",
                            UserId = new Guid("f5080b8b-9b17-497b-8fe3-9470978b0ab1")
                        });
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.RefreshToken", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("DeviceData")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LoginDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("RefreshDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "Number");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("67f7c180-23df-4985-b243-5223c69fa797"),
                            Name = "User"
                        },
                        new
                        {
                            Id = new Guid("b32f93a5-b2d9-4d59-ba83-e9a672f67dde"),
                            Name = "Manager"
                        },
                        new
                        {
                            Id = new Guid("5357d05f-e484-4a52-907e-3710fc71a64b"),
                            Name = "SuperManager"
                        },
                        new
                        {
                            Id = new Guid("9198cf7c-486e-4003-a176-3cde363f656a"),
                            Name = "Admin"
                        },
                        new
                        {
                            Id = new Guid("6009b44e-9b19-4c0c-9cb6-52d91169ad96"),
                            Name = "SuperAdmin"
                        });
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Tag", b =>
                {
                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PostId", "Number");

                    b.ToTable("Tags");

                    b.HasData(
                        new
                        {
                            PostId = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"),
                            Number = 1,
                            Text = "tag1"
                        },
                        new
                        {
                            PostId = new Guid("78dec745-66f1-4c41-8e5d-ea9969267155"),
                            Number = 2,
                            Text = "tag2"
                        },
                        new
                        {
                            PostId = new Guid("22c467db-c11c-40b9-b3b0-225c88b16d82"),
                            Number = 1,
                            Text = "tag3"
                        },
                        new
                        {
                            PostId = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"),
                            Number = 1,
                            Text = "tag4"
                        },
                        new
                        {
                            PostId = new Guid("292f61ab-ab96-4c6c-b64c-3c74f1350883"),
                            Number = 2,
                            Text = "tag5"
                        },
                        new
                        {
                            PostId = new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"),
                            Number = 1,
                            Text = "tag6"
                        },
                        new
                        {
                            PostId = new Guid("06453552-c990-4a33-ab0a-bd5b7ecb1451"),
                            Number = 2,
                            Text = "tag7"
                        },
                        new
                        {
                            PostId = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            Number = 1,
                            Text = "tag8"
                        },
                        new
                        {
                            PostId = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            Number = 2,
                            Text = "tag9"
                        },
                        new
                        {
                            PostId = new Guid("cae8a07a-c230-48e6-b431-0f15e3ec76ff"),
                            Number = 3,
                            Text = "tag10"
                        });
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsBanned")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("35434031-0853-472c-8c87-3b7831e0fd17"),
                            Email = "1@1.1",
                            IsBanned = false,
                            Name = "user1",
                            PasswordHash = "yE3UT3m6W4KlkNLJdTAM4UQYIZuS7QIU/6kWcAjU/mc=",
                            PasswordSalt = new byte[] { 118, 75, 18, 36, 222, 48, 190, 38, 185, 49, 119, 151, 113, 34, 164, 228 },
                            RegistrationDate = new DateTime(2023, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("67f7c180-23df-4985-b243-5223c69fa797")
                        },
                        new
                        {
                            Id = new Guid("f725550b-b2b0-4509-85bd-556535471756"),
                            Email = "2@2.2",
                            IsBanned = false,
                            Name = "user2",
                            PasswordHash = "KjK/J9gOLsJ5Qi8MQlpn7+G5YcU1ZnQtuZI1X+TTzy0=",
                            PasswordSalt = new byte[] { 137, 110, 127, 108, 129, 137, 155, 42, 178, 110, 230, 77, 29, 222, 131, 149 },
                            RegistrationDate = new DateTime(2023, 5, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("67f7c180-23df-4985-b243-5223c69fa797")
                        },
                        new
                        {
                            Id = new Guid("2efa388c-584b-4e8d-9c5d-29fa600cfac9"),
                            Email = "3@3.3",
                            IsBanned = false,
                            Name = "user3",
                            PasswordHash = "mVJOzj048UABroLpqaiOCXC7ov4rY/bHqr8zYznk+2I=",
                            PasswordSalt = new byte[] { 34, 54, 150, 248, 77, 23, 108, 37, 149, 29, 207, 94, 119, 12, 110, 183 },
                            RegistrationDate = new DateTime(2023, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("b32f93a5-b2d9-4d59-ba83-e9a672f67dde")
                        },
                        new
                        {
                            Id = new Guid("ead9e0c0-395b-4489-a82b-416562905957"),
                            Email = "4@4.4",
                            IsBanned = false,
                            Name = "user4",
                            PasswordHash = "Kfqg0txtZSqNkmeQbOosmGadf/IIaB2z3WaeMr3C1o0=",
                            PasswordSalt = new byte[] { 205, 233, 1, 141, 87, 98, 77, 54, 135, 152, 169, 87, 148, 116, 188, 201 },
                            RegistrationDate = new DateTime(2023, 7, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("5357d05f-e484-4a52-907e-3710fc71a64b")
                        },
                        new
                        {
                            Id = new Guid("adca4721-3a4c-44ca-80a6-de74abc7450e"),
                            Email = "5@5.5",
                            IsBanned = false,
                            Name = "user5",
                            PasswordHash = "4PDjB8dRo5n/m9N7vnYR8tM/PdyB0M7wV+dHNRAD3YQ=",
                            PasswordSalt = new byte[] { 51, 48, 107, 15, 165, 157, 219, 223, 108, 49, 81, 49, 152, 219, 5, 159 },
                            RegistrationDate = new DateTime(2023, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("9198cf7c-486e-4003-a176-3cde363f656a")
                        },
                        new
                        {
                            Id = new Guid("f5080b8b-9b17-497b-8fe3-9470978b0ab1"),
                            Email = "6@6.6",
                            IsBanned = false,
                            Name = "user6",
                            PasswordHash = "Pmuehs/dEiTauUtjQXqPWSjr4XombKHPuqgZBW1JYhM=",
                            PasswordSalt = new byte[] { 128, 183, 146, 79, 41, 2, 134, 246, 132, 144, 191, 89, 214, 199, 85, 70 },
                            RegistrationDate = new DateTime(2023, 11, 14, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleId = new Guid("6009b44e-9b19-4c0c-9cb6-52d91169ad96")
                        });
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Image", b =>
                {
                    b.HasOne("PictureExchangerAPI.Domain.Entities.Post", "Post")
                        .WithMany("Images")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Post", b =>
                {
                    b.HasOne("PictureExchangerAPI.Domain.Entities.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.RefreshToken", b =>
                {
                    b.HasOne("PictureExchangerAPI.Domain.Entities.User", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Tag", b =>
                {
                    b.HasOne("PictureExchangerAPI.Domain.Entities.Post", "Post")
                        .WithMany("Tags")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.User", b =>
                {
                    b.HasOne("PictureExchangerAPI.Domain.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Post", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Tags");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("PictureExchangerAPI.Domain.Entities.User", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("RefreshTokens");
                });
#pragma warning restore 612, 618
        }
    }
}
