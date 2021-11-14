import { useQuery } from 'react-query';

import apiClient from '../../api';

export const cryptoWalletsQueryKeyBuilder = () => 'cryptoWallet';

export const useCryptoWalletsQuery = () => {
  return useQuery(cryptoWalletsQueryKeyBuilder(), () =>
    apiClient.cryptoCurrencyWallets.getCryptoCurrencyWallets()
  );
};

export const cryptoWalletDetailQueryKeyBuilder = (id: number) => ['cryptoWallet', id];

export const useCryptoWalletDetailQuery = (id: number) => {
  return useQuery(cryptoWalletDetailQueryKeyBuilder(id), () =>
    apiClient.cryptoCurrencyWallets.getCryptoCurrencyWalletDetail(id)
  );
};
