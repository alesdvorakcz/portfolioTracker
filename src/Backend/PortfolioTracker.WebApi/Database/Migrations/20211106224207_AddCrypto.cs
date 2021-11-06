using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddCrypto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "BTC", "Bitcoin" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "LTC", "Litecoin" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "ETH", "Ethereum" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "ADA", "Cardano ADA" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "NANO", "Nano" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "NexoEur", "Nexo EUR" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "Nexo", "Cardano ADA" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "SOL", "Solana" });
            migrationBuilder.InsertData("CryptoCurrencies", new[] { "Id", "Name" }, new[] { "LRC", "Loopring" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [CryptoCurrencies]");
        }
    }
}
