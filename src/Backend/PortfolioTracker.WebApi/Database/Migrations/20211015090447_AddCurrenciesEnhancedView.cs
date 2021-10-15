using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddCurrenciesEnhancedView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW View_CurrenciesEnhanced AS
                    SELECT 
                        [Currencies].[Id],
                        [Currencies].[Name],
                        ValueHistory.[Date],
                        ValueHistory.[ConversionRate]
                    FROM [Currencies]
                    LEFT JOIN [CurrencyValueHistory] ValueHistory
                        ON ValueHistory.[CurrencyId] = [Currencies].[Id]
                    LEFT JOIN [CurrencyValueHistory] ValueHistory2
                        ON ValueHistory2.[CurrencyId] = [Currencies].[Id] AND ValueHistory.[Date] < ValueHistory2.[Date]
                    WHERE
                        ValueHistory2.[Id] is null");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW View_CurrenciesEnhanced");
        }
    }
}
