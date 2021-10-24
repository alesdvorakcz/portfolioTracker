using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioTracker.WebApi.Database.Migrations
{
    public partial class AddEtfInstrumentEnhancedView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW View_EtfInstrumentEnhanced AS
                    SELECT 
                        ETF.Id,
                        ETF.Slug,
                        ETF.Name,
                        ETF.Isin,
                        ETF.CurrencyId,
                        AggregationTable.LastDay AS [Date],
                        ISNULL(AggregationTable.TotalAmount, 0) AS TotalAmount,
                        ISNULL(AggregationTable.CumulativeTransactions, 0) AS CumulativeTransactions,
                        AggregationTable.CumulativeTransactionsCZK,
                        ISNULL(TradeHistory.UnitPrice, ValueHistory.Value) AS UnitPrice,
                        CurrencyValueHistory.ConversionRate AS ConversionRate,
                        ISNULL(AggregationTable.TotalAmount * ISNULL(TradeHistory.UnitPrice, ValueHistory.Value), 0) AS [Value],
                        AggregationTable.TotalAmount * ISNULL(TradeHistory.UnitPrice, ValueHistory.Value) * CurrencyValueHistory.ConversionRate AS ValueCZK
                    FROM [EtfInstruments] ETF
                    LEFT JOIN 
                        (SELECT
                                ETF.Id AS Id,
                                SUM(TradeHistory.Amount) AS TotalAmount,
                                SUM(TradeHistory.Amount * TradeHistory.UnitPrice) AS CumulativeTransactions,
                                SUM(TradeHistory.Amount * TradeHistory.UnitPrice * CurrencyValueHistory.ConversionRate) AS CumulativeTransactionsCZK,
                                MAX(ValueHistory.Date) AS LastDay
                            FROM 
                                EtfInstrumentValueHistory ValueHistory
                            LEFT JOIN [EtfInstruments] ETF 
                                ON  ValueHistory.EtfInstrumentId = ETF.Id
                            LEFT JOIN CurrencyValueHistory CurrencyValueHistory
                                ON  CurrencyValueHistory.CurrencyId = ETF.CurrencyId AND 
                                    CurrencyValueHistory.Date = ValueHistory.Date
                            LEFT JOIN EtfTradeHistory TradeHistory
                                ON  TradeHistory.EtfInstrumentId = ETF.Id AND
                                    TradeHistory.Date = ValueHistory.Date
                            GROUP BY 
                                ETF.Id
                        ) AS AggregationTable ON AggregationTable.Id = ETF.Id
                    LEFT JOIN [EtfInstrumentValueHistory] ValueHistory
                        ON ValueHistory.Date = AggregationTable.LastDay AND ValueHistory.EtfInstrumentId = ETF.Id
                    LEFT JOIN [EtfTradeHistory] TradeHistory
                        ON TradeHistory.Date = AggregationTable.LastDay AND TradeHistory.EtfInstrumentId = ETF.Id
                    LEFT JOIN [CurrencyValueHistory] CurrencyValueHistory
                        ON CurrencyValueHistory.Date = AggregationTable.LastDay AND CurrencyValueHistory.CurrencyId = ETF.CurrencyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW View_EtfInstrumentEnhanced");
        }
    }
}
