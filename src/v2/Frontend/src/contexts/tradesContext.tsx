import React, { PropsWithChildren, useState } from 'react';

import { EtfDetailWithTrades } from '../api/models';

export interface TradesState {
  etfData: EtfData;
  netWorth: NetWorth;
}

export interface EtfData {
  etfs: EtfDetailWithTrades[];
  totalValueCZK: number;
  totalTransactionsCZK: number;
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
  etfData: {
    etfs: [],
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
  },
  netWorth: {
    totalTransactionsCZK: 0,
    totalValueCZK: 0,
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
