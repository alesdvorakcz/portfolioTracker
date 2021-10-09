export interface Account {
  id: number;
  slug: string;
  name: string;
  currencyId: string;
}

export interface AccountDetail {
  id: number;
  slug: string;
  name: string;
  currencyId: string;
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
  valueBefore: number;
  transactionCzk: number;
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
