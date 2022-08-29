import { useQuery } from 'react-query';

import apiClient from '../../api';

export const cryptosQueryKeyBuilder = () => 'crypto';

export const useCryptosQuery = () => {
  return useQuery(cryptosQueryKeyBuilder(), () => apiClient.cryptos.getCryptos());
};

export const cryptoDetailQueryKeyBuilder = (id: number) => ['crypto', id];

export const useCryptoDetailQuery = (id: number) => {
  return useQuery(cryptoDetailQueryKeyBuilder(id), () => apiClient.cryptos.getCryptoDetail(id));
};
