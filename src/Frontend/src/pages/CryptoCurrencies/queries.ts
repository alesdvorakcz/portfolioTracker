import { useQuery } from 'react-query';

import apiClient from '../../api';

export const cryptoCurrenciesQueryKeyBuilder = () => 'cryptoCurrency';

export const useCryptoCurrenciesQuery = () => {
  return useQuery(cryptoCurrenciesQueryKeyBuilder(), () =>
    apiClient.cryptoCurrencies.getCryptoCurrencies()
  );
};

export const cryptoCurrencyDetailQueryKeyBuilder = (id: string) => ['cryptoCurrency', id];

export const useCryptoCurrencyDetailQuery = (id: string) => {
  return useQuery(cryptoCurrencyDetailQueryKeyBuilder(id), () =>
    apiClient.cryptoCurrencies.getCryptoCurrencyDetail(id)
  );
};
