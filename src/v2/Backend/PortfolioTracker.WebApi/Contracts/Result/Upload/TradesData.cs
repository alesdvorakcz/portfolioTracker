namespace PortfolioTracker.WebApi.Contracts.Result;

public class TradesData
{
    public Business.Models.NetWorthData NetWorth { get; set; } = new Business.Models.NetWorthData();
    public Business.Models.EtfData EtfData { get; set; } = new Business.Models.EtfData();
    public Business.Models.AccountData AccountData { get; set; } = new Business.Models.AccountData();
    public Business.Models.CryptoData CryptoData { get; set; } = new Business.Models.CryptoData();
    public Business.Models.RealEstateData RealEstateData { get; set; } = new Business.Models.RealEstateData();
}