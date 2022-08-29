export const DEFAULT_LOCALE = 'cs-CZ';
export const DEFAULT_CURRENCY = 'CZK';

export const toCurrencyFormat = (x?: number | string | Date, currencyId?: string) => {
  return x?.toLocaleString(DEFAULT_LOCALE, {
    style: 'currency',
    currency: currencyId || DEFAULT_CURRENCY,
  });
};

export const toNumberFormat = (x: number) => {
  return x.toLocaleString(DEFAULT_LOCALE);
};
