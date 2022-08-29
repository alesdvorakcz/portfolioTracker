using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortfolioTracker.WebApi.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CurrencyValueHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConversionRate = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    CurrencyId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencyValueHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrencyValueHistory_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Etfs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ticker = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ISIN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etfs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Etfs_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EtfValueHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    EtfId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EtfValueHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EtfValueHistory_Etfs_EtfId",
                        column: x => x.EtfId,
                        principalTable: "Etfs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CurrencyValueHistory_CurrencyId",
                table: "CurrencyValueHistory",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Etfs_CurrencyId",
                table: "Etfs",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_EtfValueHistory_EtfId",
                table: "EtfValueHistory",
                column: "EtfId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrencyValueHistory");

            migrationBuilder.DropTable(
                name: "EtfValueHistory");

            migrationBuilder.DropTable(
                name: "Etfs");

            migrationBuilder.DropTable(
                name: "Currencies");
        }
    }
}
