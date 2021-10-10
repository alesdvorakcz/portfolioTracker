namespace PortfolioTracker.WebApi.Database.Views;

public class AccountValueHistoryEnhanced
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public string AccountName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public decimal? ConversionRate { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public decimal TransactionCzk { get; set; }
    public decimal? ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
}