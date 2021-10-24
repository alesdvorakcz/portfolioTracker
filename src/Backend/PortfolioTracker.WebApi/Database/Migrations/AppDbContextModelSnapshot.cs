﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.AccountValueHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("TransactionCzk")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal>("ValueBefore")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("AccountValueHistory");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Currency", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.CurrencyValueHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("ConversionRate")
                        .HasColumnType("decimal(18,4)");

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.ToTable("CurrencyValueHistory");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfInstrument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Isin")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.ToTable("EtfInstruments");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfInstrumentValueHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("EtfInstrumentId")
                        .HasColumnType("int");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("Id");

                    b.HasIndex("EtfInstrumentId");

                    b.ToTable("EtfInstrumentValueHistory");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfTradeHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("EtfInstrumentId")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("Id");

                    b.HasIndex("EtfInstrumentId");

                    b.ToTable("EtfTradeHistory");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Portfolio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Portfolios");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Views.AccountEnhanced", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("ConversionRate")
                        .HasColumnType("decimal(18,4)");

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("TransactionCzk")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueAfter")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueAfterCZK")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueBefore")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("Id");

                    b.ToView("View_AccountsEnhanced");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Views.AccountValueHistoryEnhanced", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<decimal?>("ConversionRate")
                        .HasColumnType("decimal(18,4)");

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TransactionCzk")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueAfter")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueAfterCZK")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal>("ValueBefore")
                        .HasColumnType("decimal(18,4)");

                    b.Property<decimal?>("ValueBeforeCZK")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("Id");

                    b.ToView("View_AccountValueHistoryEnhanced");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Views.CurrencyEnhanced", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal?>("ConversionRate")
                        .HasColumnType("decimal(18,4)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToView("View_CurrenciesEnhanced");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Account", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Currency");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.AccountValueHistory", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.Account", "Account")
                        .WithMany("History")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.CurrencyValueHistory", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.Currency", "Currency")
                        .WithMany("History")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Currency");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfInstrument", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Currency");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfInstrumentValueHistory", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.EtfInstrument", "EtfInstrument")
                        .WithMany("ValueHistory")
                        .HasForeignKey("EtfInstrumentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EtfInstrument");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfTradeHistory", b =>
                {
                    b.HasOne("PortfolioTracker.WebApi.Database.Entity.EtfInstrument", "EtfInstrument")
                        .WithMany("TradeHistory")
                        .HasForeignKey("EtfInstrumentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EtfInstrument");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Account", b =>
                {
                    b.Navigation("History");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.Currency", b =>
                {
                    b.Navigation("History");
                });

            modelBuilder.Entity("PortfolioTracker.WebApi.Database.Entity.EtfInstrument", b =>
                {
                    b.Navigation("TradeHistory");

                    b.Navigation("ValueHistory");
                });
#pragma warning restore 612, 618
        }
    }
}
