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
  id: string;
  ticker: string;
  name: string;
  currencyId: string;
}

export interface CryptoDetail {
  id: string;
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
  id: string;
  ticker: string;
  name: string;
  isin: string;
  currencyId: string;
}
export interface EtfDetail {
  id: string;
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
