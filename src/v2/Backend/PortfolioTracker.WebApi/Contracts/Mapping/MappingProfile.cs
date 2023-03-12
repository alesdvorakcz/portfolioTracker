using AutoMapper;

namespace PortfolioTracker.WebApi.Contracts.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Database.Entity.Currency, Result.Currency>()
            .ForMember(d => d.LastValue, opt => opt.Ignore());
        CreateMap<Database.Entity.Currency, Result.CurrencyDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Entity.Etf, Result.Etf>();
        CreateMap<Database.Entity.Etf, Result.EtfDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Entity.Crypto, Result.Crypto>()
            .ForMember(d => d.LastValue, opt => opt.Ignore());
        CreateMap<Database.Entity.Crypto, Result.CryptoDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Entity.CurrencyValueHistory, Result.CurrencyValueHistoryRow>();
        CreateMap<Database.Entity.EtfValueHistory, Result.EtfValueHistoryRow>();
        CreateMap<Database.Entity.CryptoValueHistory, Result.CryptoValueHistoryRow>();
    }
}