export interface Account {
  id: number;
  slug: string;
  name: string;
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
  currencyId: string;
}

export interface AccountToEdit {
  slug: string;
  name: string;
  currencyId: string;
}

export interface AccountValueHistory {
  id: number;
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
