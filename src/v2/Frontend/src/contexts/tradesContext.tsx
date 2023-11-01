import React, { PropsWithChildren, useState } from 'react';

import { Account, CryptoWallet, EtfDetailWithTrades, RealEstate } from '../api/models';

export interface TradesState {
  netWorth: NetWorth;
  etfData: EtfData;
  accountData: AccountData;
  cryptoData: CryptoData;
  realEstateData: RealEstateData;
}

export interface AccountData {
  accounts: Account[];
  history: NetWorthHistoryAggregated[];
  monthlyHistory: NetWorthHistoryAggregated[];
  yearlyHistory: NetWorthHistoryAggregated[];
  totalValueCZK: number;
  cumulativeTransactionsCZK: number;
  cumulativeProfitCZK: number;
  profitPercentagePlainCZK: number;
  profitPercentageCZK: number;
  profitPercentagePaCZK: number;
}

export interface CryptoData {
  cryptoWallets: CryptoWallet[];
  cryptoCurrenciesHistory: CryptoWithHistory[];
  history: NetWorthHistory[];
  monthlyHistory: NetWorthHistory[];
  totalValueCZK: number;
  totalTransactionsCZK: number;
}

export interface CryptoWithHistory {
  id: number;
  unitsTotal: number;
  value: number;
  valueCZK: number;
  cumulativeStakedUnits: number;
  cumulativeTransactionsCZK: number;
  cumulativeTransactions: number;
  allWalletsHistory: CryptoHistoryAggregatedRow[];
}

export interface CryptoHistoryAggregatedRow {
  dateStart: string;
  dateEnd: string;
  conversionRate?: number;
  unitPrice: number;
  unitsChange: number;
  unitsTotal: number;
  transaction: number;
  transactionCZK: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK: number;
  stakedUnits: number;
  cumulativeStakedUnits: number;
}

export interface EtfData {
  etfs: EtfDetailWithTrades[];
  totalValueCZK: number;
  totalTransactionsCZK: number;
}

export interface RealEstateData {
  realEstates: RealEstate[];
  ownValue: number;
  totalValue: number;
  remainingMortage: number;
  totalIncome: number;
}

export interface NetWorth {
  history: NetWorthHistory[];
  monthlyHistory: NetWorthHistory[];
  totalValueCZK: number;
  totalTransactionsCZK: number;
}

export interface NetWorthHistoryAggregated {
  dateStart: string;
  dateEnd: string;
  valueBeforeCZK: number;
  transactionCZK: number;
  valueAfterCZK: number;
  cumulativeTransactionsCZK: number;
  profitCZK: number;
  profitPercentageCZK: number;
  cumulativeProfitCZK: number;
}

export interface NetWorthHistory {
  date: string;
  valueCZK: number;
  transactionsCZK: number;
}

interface TradesContextValue {
  tradesData: TradesState;
  setTradesData: (data: TradesState) => void;
  clearData: () => void;
}

const defaultValue: TradesState = {
  netWorth: {
    history: [],
    monthlyHistory: [],
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
  },
  etfData: {
    etfs: [],
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
  },
  accountData: {
    accounts: [],
    history: [],
    monthlyHistory: [],
    yearlyHistory: [],
    totalValueCZK: 0,
    cumulativeTransactionsCZK: 0,
    cumulativeProfitCZK: 0,
    profitPercentagePlainCZK: 0,
    profitPercentageCZK: 0,
    profitPercentagePaCZK: 0,
  },
  cryptoData: {
    cryptoWallets: [],
    cryptoCurrenciesHistory: [],
    history: [],
    monthlyHistory: [],
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
  },
  realEstateData: {
    realEstates: [],
    ownValue: 0,
    totalValue: 0,
    remainingMortage: 0,
    totalIncome: 0,
  },
};

const TradesContext = React.createContext<TradesContextValue | undefined>(undefined);

export const TradesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tradesData, setTradesData] = useState<TradesState>(defaultValue);
  const clearData = () => setTradesData(defaultValue);
  return (
    <TradesContext.Provider value={{ tradesData, setTradesData, clearData }}>
      {children}
    </TradesContext.Provider>
  );
};

export const useTradesContext = () => {
  const context = React.useContext(TradesContext);
  if (context === undefined)
    throw new Error('useTradesContext must be used within a TradesContextProvider');

  return context;
};
