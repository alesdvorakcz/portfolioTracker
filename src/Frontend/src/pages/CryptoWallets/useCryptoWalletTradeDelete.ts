import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CryptoCurrencyTrade } from '../../api/models';
import { cryptoWalletDetailQueryKeyBuilder, cryptoWalletsQueryKeyBuilder } from './queries';

export const useCryptoWalletTradeDelete = (cryptoWalletId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.cryptoCurrencyWallets.deleteTrade(cryptoWalletId, id);
  });

  const onDelete = async (historyValue: CryptoCurrencyTrade) => {
    await mutation.mutateAsync(historyValue.id);
    queryClient.invalidateQueries(cryptoWalletDetailQueryKeyBuilder(cryptoWalletId));
    queryClient.invalidateQueries(cryptoWalletsQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
