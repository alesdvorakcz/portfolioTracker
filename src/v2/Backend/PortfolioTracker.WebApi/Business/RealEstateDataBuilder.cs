using PortfolioTracker.WebApi.Business.Models;

namespace PortfolioTracker.WebApi.Business;

public static class RealEstateDataBuilder
{
    public static RealEstateData GetData(IEnumerable<Excel.Models.RealEstate> estates, IEnumerable<Excel.Models.RealEstateHistory> estateHistory)
    {
        var realEstates = new List<RealEstate>();
        foreach (var estate in estates)
        {
            var history = estateHistory.Where(x => x.RealEstateId == estate.Id);

            realEstates.Add(PrepareRealEstateData(estate, history));
        }

        var result = new RealEstateData();
        result.RealEstates = realEstates;

        result.OwnValue = result.RealEstates.Sum(x => x.OwnValue);
        result.TotalValue = result.RealEstates.Sum(x => x.TotalValue);
        result.RemainingMortage = result.RealEstates.Sum(x => x.RemainingMortage);
        result.TotalIncome = result.RealEstates.Sum(x => x.TotalIncome);

        return result;
    }

    private static RealEstate PrepareRealEstateData(Excel.Models.RealEstate estate, IEnumerable<Excel.Models.RealEstateHistory> estateHistory)
    {
        var realEstate = new RealEstate
        {
            Id = estate.Id,
            Name = estate.Name,
            StartingPrice = estate.StartingPrice,
            OwnStartingCapital = estate.OwnStartingCapital
        };

        var cumulativeIncome = 0m;
        var lastPrice = 0m;
        var lastRemainingMortage = 0m;

        var history = new List<RealEstateHistoryRow>();
        foreach (var historyRow in estateHistory)
        {
            var realEstateHistoryRow = new RealEstateHistoryRow
            {
                Date = historyRow.Date,
                Income = historyRow.Income,
                RemainingMortage = historyRow.RemainingMortage,
                EstimatedPrice = historyRow.EstimatedPrice
            };

            lastPrice = realEstateHistoryRow.EstimatedPrice;
            lastRemainingMortage = realEstateHistoryRow.RemainingMortage;
            cumulativeIncome += realEstateHistoryRow.Income;
            realEstateHistoryRow.CumulativeIncome = cumulativeIncome;
            realEstateHistoryRow.OwnValue = realEstateHistoryRow.EstimatedPrice - realEstateHistoryRow.RemainingMortage;
            realEstateHistoryRow.TotalValueIncludingIncome = realEstateHistoryRow.EstimatedPrice + cumulativeIncome;

            history.Add(realEstateHistoryRow);
        }

        realEstate.History = history.OrderByDescending(x => x.Date).ToList();

        realEstate.RemainingMortage = lastRemainingMortage;
        realEstate.OwnValue = lastPrice - lastRemainingMortage; ;
        realEstate.TotalValue = lastPrice;
        realEstate.TotalIncome = cumulativeIncome;

        return realEstate;
    }
}
