using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddAccountsEnhancedView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW View_AccountsEnhanced AS
                    SELECT
                        [Accounts].[Id],
                        [Accounts].[Slug],
                        [Accounts].[Name],
                        [Accounts].[CurrencyId],
                        ValueHistory.[Date],
                        ValueHistory.[TransactionCzk],
                        ValueHistory.[ValueBefore],
                        ValueHistory.[ValueBefore] + ValueHistory.[TransactionCzk] / [CurrencyValueHistory].[ConversionRate] AS ValueAfter,
                        ValueHistory.[ValueBefore] * [CurrencyValueHistory].[ConversionRate] + ValueHistory.[TransactionCzk] AS ValueAfterCZK,
                        [CurrencyValueHistory].[ConversionRate]
                    FROM 
                        [Accounts]
                    LEFT JOIN [AccountValueHistory] ValueHistory 
                        ON ValueHistory.[AccountId] = [Accounts].[Id]
                    LEFT JOIN [AccountValueHistory] ValueHistory2
                        ON ValueHistory2.[AccountId] = [Accounts].[Id] AND ValueHistory.[Date] < ValueHistory2.[Date]
                    LEFT JOIN [CurrencyValueHistory] 
                        ON  [CurrencyValueHistory].[CurrencyId] = [Accounts].[CurrencyId] AND 
                            [CurrencyValueHistory].[Date] = ValueHistory.[Date]
                    WHERE
                        ValueHistory2.[Id] is null");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW View_AccountsEnhanced");
        }
    }
}
