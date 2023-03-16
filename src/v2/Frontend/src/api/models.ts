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
  lastValue?: CryptoValueHistoryRow;
}

export interface CryptoDetail {
  id: number;
  ticker: string;
  name: string;
  currencyId: string;
  history: CryptoValueHistoryRow[];
}

export interface CryptoValueHistoryRow {
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
  history: EtfDetailHistoryRow[];
}

export interface EtfDetailHistoryRow {
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
  history: AccountHistoryRow[];
  monthlyHistory: AccountHistoryAggregatedRow[];
  yearlyHistory: AccountHistoryAggregatedRow[];
  value: number;
  valueCZK?: number;
  cumulativeTransactionsCZK: number;
  cumulativeTransactions: number;
}

export interface AccountHistoryRow {
  dateStart: string;
  dateEnd: string;
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
  profit: number;
  profitCZK?: number;
  profitPercentage?: number;
  profitPercentageCZK?: number;
  cumulativeProfit: number;
  cumulativeProfitCZK?: number;
}

export interface AccountHistoryAggregatedRow {
  dateStart: string;
  dateEnd: string;
  valueBefore: number;
  valueBeforeCZK?: number;
  transactionCZK: number;
  transaction: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactionsCZK: number;
  cumulativeTransactions: number;
  profit: number;
  profitCZK?: number;
  profitPercentage?: number;
  profitPercentageCZK?: number;
  cumulativeProfit: number;
  cumulativeProfitCZK?: number;
}

export interface CryptoWallet {
  id: string;
  name: string;
  crypto: Crypto;
  history: CryptoWalletHistoryRow[];
  value: number;
  valueCZK?: number;
  unitsTotal?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK?: number;
  stakedUnits: number;
}

export interface CryptoWalletHistoryRow {
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
  history: RealEstateHistoryRow[];
  ownValue: number;
  totalValue: number;
  remainingMortage: number;
  totalIncome: number;
}

export interface RealEstateHistoryRow {
  date: string;
  income: number;
  remainingMortage: number;
  estimatedPrice: number;
  ownValue: number;
  totalValueIncludingIncome: number;
  cumulativeIncome: number;
}
