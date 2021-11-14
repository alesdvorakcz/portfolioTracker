using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class FixTypo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConverstionRateUSD",
                table: "CryptoCurrencyValueHistory",
                newName: "ConversionRateUSD");

            migrationBuilder.RenameColumn(
                name: "ConverstionRateEUR",
                table: "CryptoCurrencyValueHistory",
                newName: "ConversionRateEUR");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConversionRateUSD",
                table: "CryptoCurrencyValueHistory",
                newName: "ConverstionRateUSD");

            migrationBuilder.RenameColumn(
                name: "ConversionRateEUR",
                table: "CryptoCurrencyValueHistory",
                newName: "ConverstionRateEUR");
        }
    }
}
