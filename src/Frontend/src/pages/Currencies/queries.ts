import { useQuery } from 'react-query';

import apiClient from '../../api';

export const currenciesQueryKeyBuilder = () => 'currency';

export const useCurrenciesQuery = () => {
  return useQuery(currenciesQueryKeyBuilder(), () => apiClient.currencies.getCurrencies());
};

export const currencyDetailQueryKeyBuilder = (id: string) => ['currency', id];

export const useCurrencyDetailQuery = (id: string) => {
  return useQuery(currencyDetailQueryKeyBuilder(id), () =>
    apiClient.currencies.getCurrencyDetail(id)
  );
};
