using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddCurrencies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Currencies", new[] { "Id", "Name" }, new[] { "CZK", "Česká koruna" });
            migrationBuilder.InsertData("Currencies", new[] { "Id", "Name" }, new[] { "EUR", "Euro" });
            migrationBuilder.InsertData("Currencies", new[] { "Id", "Name" }, new[] { "USD", "Americký dolar" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Currencies]");
        }
    }
}
