using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddAccountValueHistoryEnhancedView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW View_AccountValueHistoryEnhanced AS
                    SELECT
                        [AccountValueHistory].[Id],
                        [AccountValueHistory].[AccountId],
                        [Accounts].[Name],
                        [AccountValueHistory].[Date],
                        [Accounts].[CurrencyId],
                        [CurrencyValueHistory].[ConversionRate],
                        [AccountValueHistory].[ValueBefore],
                        [AccountValueHistory].[ValueBefore] * [CurrencyValueHistory].[ConversionRate] AS ValueBeforeCZK,
                        [AccountValueHistory].[TransactionCzk],
                        [AccountValueHistory].[ValueBefore] + [AccountValueHistory].[TransactionCzk] / [CurrencyValueHistory].[ConversionRate] AS ValueAfter,
                        [AccountValueHistory].[ValueBefore] * [CurrencyValueHistory].[ConversionRate] + [AccountValueHistory].[TransactionCzk] AS ValueAfterCZK
                    FROM [AccountValueHistory]
                    LEFT JOIN [Accounts] 
                        ON  [AccountId] = [Accounts].[Id]
                    LEFT JOIN [CurrencyValueHistory] 
                        ON  [CurrencyValueHistory].[CurrencyId] = [Accounts].[CurrencyId] AND 
                            [CurrencyValueHistory].[Date] = [AccountValueHistory].[Date]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW View_AccountValueHistoryEnhanced");
        }
    }
}
