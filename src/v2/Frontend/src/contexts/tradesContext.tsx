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
  totalValueCZK: number;
  totalTransactionsCZK: number;
}

export interface CryptoData {
  cryptoWallets: CryptoWallet[];
  totalValueCZK: number;
  totalTransactionsCZK: number;
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
  totalValueCZK: number;
  totalTransactionsCZK: number;
}

interface TradesContextValue {
  tradesData: TradesState;
  setTradesData: (data: TradesState) => void;
  clearData: () => void;
}

const defaultValue: TradesState = {
  netWorth: {
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
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
  },
  cryptoData: {
    cryptoWallets: [],
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
