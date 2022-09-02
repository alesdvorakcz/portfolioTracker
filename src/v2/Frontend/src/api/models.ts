export interface Currency {
  id: string;
  name: string;
}

export interface CurrencyDetail {
  id: string;
  name: string;
  history: CurrencyValueHistory[];
}

export interface CurrencyValueHistory {
  id: number;
  date: string;
  conversionRate: number;
}

export interface Crypto {
  id: number;
  ticker: string;
  name: string;
  currencyId: string;
}

export interface CryptoDetail {
  id: number;
  ticker: string;
  name: string;
  currencyId: string;
  history: CryptoValueHistory[];
}

export interface CryptoValueHistory {
  id: number;
  date: string;
  value: number;
}

export interface Etf {
  id: number;
  ticker: string;
  name: string;
  isin: string;
  currencyId: string;
}
export interface EtfDetail {
  id: number;
  ticker: string;
  name: string;
  isin: string;
  currencyId: string;
  history: EtfValueHistory[];
}

export interface EtfValueHistory {
  id: number;
  date: string;
  value: number;
}

export interface EtfDetailWithTrades {
  id: number;
  ticker: string;
  name: string;
  isin: string;
  currencyId: string;
  value: number;
  valueCZK?: number;
  unitsTotal: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK?: number;
  history: EtfValueHistoryEnhanced[];
}

export interface EtfValueHistoryEnhanced {
  id: number;
  date: string;
  currencyId: string;
  conversionRate?: number;
  valueBefore?: number;
  valueBeforeCZK?: number;
  unitsChange: number;
  unitsTotal: number;
  unitPrice: number;
  fee: number;
  transaction: number;
  transactionCZK?: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK?: number;
}
