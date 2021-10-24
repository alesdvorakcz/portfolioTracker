export type AssetClass = 'Stocks' | 'Bonds' | 'Cash' | 'RealEstates' | 'Commodities' | 'Crypto';
export const AssetClasses = ['Stocks', 'Bonds', 'Cash', 'RealEstates', 'Commodities', 'Crypto'];

export interface GetAllAccountsResult {
  accounts: Account[];
  totalValueCZK?: number;
  totalTransactionsCZK?: number;
}

export interface Account {
  id: number;
  slug: string;
  name: string;
  category: AssetClass;
  currencyId: string;
  date?: string;
  transactionCzk?: number;
  valueBefore?: number;
  valueAfter?: number;
  valueAfterCZK?: number;
  conversionRate?: number;
  transactionsCZKTotal?: number;
}

export interface AccountDetail {
  id: number;
  slug: string;
  name: string;
  category: AssetClass;
  currencyId: string;
  date?: string;
  transactionCzk?: number;
  valueBefore?: number;
  valueAfter?: number;
  valueAfterCZK?: number;
  conversionRate?: number;
  transactionsCZKTotal?: number;
  history: AccountValueHistory[];
}

export interface AccountToAdd {
  slug: string;
  name: string;
  category: AssetClass;
  currencyId: string;
}

export interface AccountToEdit {
  slug: string;
  name: string;
  category: AssetClass;
  currencyId: string;
}

export interface AccountValueHistory {
  id: number;
  accountId: number;
  date: string;
  conversionRate?: number;
  valueBefore: number;
  valueBeforeCZK?: number;
  transactionCzk: number;
  valueAfter?: number;
  valueAfterCZK?: number;
  cumulativeTransactionsCZK: number;
}

export interface AccountValueHistoryToAdd {
  date: string;
  valueBefore: number;
  transactionCzk: number;
}

export interface AccountValueHistoryToEdit {
  date: string;
  valueBefore: number;
  transactionCzk: number;
}

export interface Currency {
  id: string;
  name: string;
  date?: string;
  conversionRate?: number;
}
export interface CurrencyDetail {
  id: string;
  name: string;
  date?: string;
  conversionRate?: number;
  history: CurrencyValueHistory[];
}

export interface CurrencyValueHistory {
  id: number;
  date: string;
  conversionRate: number;
}

export interface CurrencyValueHistoryToAdd {
  date: string;
  conversionRate: number;
}

export interface CurrencyValueHistoryToEdit {
  date: string;
  conversionRate: number;
}

export interface CurrencyHistoryImportRequest {
  currencyIds: string[];
  from: string;
  to: string;
}

export interface GetDataForDashboardResult {
  totalTransactionsCZK?: number;
  totalValueCZK?: number;
  accounts: DashboardAccount[];
  allAccountsHistory: AllAccountsHistoryValue[];
}

export interface DashboardAccount {
  id: number;
  name: string;
  category: AssetClass;
  currencyId: string;
  totalTransactionsCZK?: number;
  totalValueCZK?: number;
  history: AccountValueHistory[];
}

export interface AllAccountsHistoryValue {
  date: string;
  totalTransactionsCZK: number;
  totalValueCZK: number;
}

export interface EtfInstrument {
  id: number;
  slug: string;
  name: string;
  isin: string;
  currencyId: string;
}

export interface EtfInstrumentDetail {
  id: number;
  slug: string;
  name: string;
  isin: string;
  currencyId: string;
  valueHistory: EtfInstrumentValueHistory[];
  tradeHistory: EtfTradeHistory[];
  tradeHistoryEnhanced: EtfTradeHistoryEnhanced[];
}

export interface EtfInstrumentToAdd {
  slug: string;
  name: string;
  isin: string;
  currencyId: string;
}

export interface EtfInstrumentToEdit {
  slug: string;
  name: string;
  isin: string;
  currencyId: string;
}

export interface EtfInstrumentValueHistory {
  id: number;
  date: string;
  value: number;
}

export interface EtfInstrumentValueHistoryToAdd {
  date: string;
  value: number;
}

export interface EtfInstrumentValueHistoryToEdit {
  date: string;
  value: number;
}

export interface EtfTradeHistory {
  id: number;
  date: string;
  amount: number;
  unitPrice: number;
}

export interface EtfTradeHistoryEnhanced {
  id: number;
  date: string;
  conversionRate?: number;
  valueBefore: number;
  valueBeforeCZK?: number;
  amountChange: number;
  amountTotal: number;
  unitPrice: number;
  valueAfter: number;
  valueAfterCZK?: number;
  cumulativeTransactions: number;
  cumulativeTransactionsCZK?: number;
}

export interface EtfTradeHistoryToAdd {
  date: string;
  amount: number;
  unitPrice: number;
}

export interface EtfTradeHistoryToEdit {
  date: string;
  amount: number;
  unitPrice: number;
}
