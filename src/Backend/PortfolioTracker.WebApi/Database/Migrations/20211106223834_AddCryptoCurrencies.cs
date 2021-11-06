using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddCryptoCurrencies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CryptoCurrencies",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CryptoCurrencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CryptoCurrencyValueHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConverstionRateUSD = table.Column<decimal>(type: "decimal(18,8)", nullable: false),
                    ConverstionRateEUR = table.Column<decimal>(type: "decimal(18,8)", nullable: false),
                    CryptoCurrencyId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CryptoCurrencyValueHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CryptoCurrencyValueHistory_CryptoCurrencies_CryptoCurrencyId",
                        column: x => x.CryptoCurrencyId,
                        principalTable: "CryptoCurrencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CryptoCurrencyWallets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CryptoCurrencyId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CryptoCurrencyWallets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CryptoCurrencyWallets_CryptoCurrencies_CryptoCurrencyId",
                        column: x => x.CryptoCurrencyId,
                        principalTable: "CryptoCurrencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CryptoCurrencyTrades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChangeEUR = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Change = table.Column<decimal>(type: "decimal(18,8)", nullable: false),
                    AmountAfter = table.Column<decimal>(type: "decimal(18,8)", nullable: false),
                    WalletId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CryptoCurrencyTrades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CryptoCurrencyTrades_CryptoCurrencyWallets_WalletId",
                        column: x => x.WalletId,
                        principalTable: "CryptoCurrencyWallets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CryptoCurrencyTrades_WalletId",
                table: "CryptoCurrencyTrades",
                column: "WalletId");

            migrationBuilder.CreateIndex(
                name: "IX_CryptoCurrencyValueHistory_CryptoCurrencyId",
                table: "CryptoCurrencyValueHistory",
                column: "CryptoCurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_CryptoCurrencyWallets_CryptoCurrencyId",
                table: "CryptoCurrencyWallets",
                column: "CryptoCurrencyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CryptoCurrencyTrades");

            migrationBuilder.DropTable(
                name: "CryptoCurrencyValueHistory");

            migrationBuilder.DropTable(
                name: "CryptoCurrencyWallets");

            migrationBuilder.DropTable(
                name: "CryptoCurrencies");
        }
    }
}
