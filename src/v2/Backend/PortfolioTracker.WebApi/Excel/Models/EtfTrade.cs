namespace PortfolioTracker.WebApi.Excel.Models;

public class EtfTrade
{
    public DateTime Date { get; set; }
    public string Ticker { get; set; } = string.Empty;
    public int UnitsChange { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Fee { get; set; }
};
