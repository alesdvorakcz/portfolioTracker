using AutoMapper;

namespace PortfolioTracker.WebApi.Contracts.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Database.Entity.Account, Result.Account>();
        CreateMap<Database.Entity.Account, Result.AccountDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Views.AccountValueHistoryEnhanced, Result.AccountValueHistory>();

        CreateMap<Database.Entity.Currency, Result.Currency>();
        CreateMap<Database.Entity.Currency, Result.CurrencyDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());
        CreateMap<Database.Entity.CurrencyValueHistory, Result.CurrencyValueHistory>();

        CreateMap<Database.Entity.EtfInstrument, Result.EtfInstrument>();
        CreateMap<Database.Entity.EtfInstrument, Result.EtfInstrumentDetail>()
            .ForMember(d => d.TradeHistory, opt => opt.Ignore())
            .ForMember(d => d.ValueHistory, opt => opt.Ignore());
        CreateMap<Database.Entity.EtfInstrumentValueHistory, Result.EtfInstrumentValueHistory>();
        CreateMap<Database.Entity.EtfTradeHistory, Result.EtfTradeHistory>();
    }
}