using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddEtfInstrumentTradeHistoryEnhancedView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW View_EtfInstrumentTradeHistoryEnhanced AS
                    SELECT
                        [EtfInstrumentValueHistory].[Id],
                        [EtfInstrumentValueHistory].[EtfInstrumentId],
                        [EtfInstruments].[Name],
                        [EtfInstrumentValueHistory].[Date],
                        [EtfInstruments].[CurrencyId],
                        [CurrencyValueHistory].[ConversionRate],
                        ISNULL([EtfTradeHistory].[UnitPrice], [EtfInstrumentValueHistory].[Value]) AS [UnitPrice],
                        ISNULL([EtfTradeHistory].[Amount], 0) as [AmountChange]
                    FROM [EtfInstrumentValueHistory]
                    LEFT JOIN [EtfInstruments] 
                        ON  [EtfInstrumentId] = [EtfInstruments].[Id]
                    LEFT JOIN [CurrencyValueHistory] 
                        ON  [CurrencyValueHistory].[CurrencyId] = [EtfInstruments].[CurrencyId] AND 
                            [CurrencyValueHistory].[Date] = [EtfInstrumentValueHistory].[Date]
                    LEFT JOIN [EtfTradeHistory]
                        ON  [EtfTradeHistory].[EtfInstrumentId] = [EtfInstruments].[Id] AND
                            [EtfTradeHistory].[Date] = [EtfInstrumentValueHistory].[Date]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW View_EtfInstrumentTradeHistoryEnhanced");
        }
    }
}
