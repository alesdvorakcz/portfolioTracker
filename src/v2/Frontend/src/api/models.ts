export interface Currency {
  id: string;
  name: string;
  lastValue?: CurrencyValueHistory;
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
  lastValue?: CryptoValueHistory;
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
  cumulativeTransactionsCZK: number;
  history: EtfValueHistoryEnhanced[];
}

export interface EtfValueHistoryEnhanced {
  id: number;
  date: string;
  currencyId: string;
  conversionRate?: number;
  valueBefore: number;
  valueBeforeCZK?: number;
  unitsChange: number;
  unitsTotal: number;
  unitPrice: number;
  fee: number;
  transaction: number;
  transactionCZK: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK: number;
}

export interface Account {
  id: string;
  name: string;
  currencyId: string;
  history: AccountTrade[];
  value: number;
  valueCZK?: number;
  cumulativeTransactionsCZK: number;
  cumulativeTransactions: number;
}

export interface AccountTrade {
  date: string;
  currencyId: string;
  conversionRate?: number;
  valueBefore: number;
  valueBeforeCZK?: number;
  transactionCZK: number;
  transaction: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactionsCZK: number;
  cumulativeTransactions: number;
}

export interface CryptoWallet {
  id: string;
  name: string;
  crypto: Crypto;
  history: CryptoWalletTrade[];
  value: number;
  valueCZK?: number;
  unitsTotal?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK?: number;
  stakedUnits: number;
}

export interface CryptoWalletTrade {
  id: number;
  date: string;
  currencyId: string;
  conversionRate?: number;
  unitPrice: number;
  unitsChange: number;
  unitsTotal: number;
  transaction: number;
  transactionCZK: number;
  valueAfter: number;
  valueAfterCZK?: number;
  stakedUnits: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK: number;
  cumulativeStakedUnits: number;
}

export interface RealEstate {
  id: string;
  name: string;
  startingPrice: number;
  ownStartingCapital: number;
  history: RealEstateHistory[];
  ownValue: number;
  totalValue: number;
  remainingMortage: number;
  totalIncome: number;
}

export interface RealEstateHistory {
  date: string;
  income: number;
  remainingMortage: number;
  estimatedPrice: number;
  ownValue: number;
  totalValueIncludingIncome: number;
  cumulativeIncome: number;
}
