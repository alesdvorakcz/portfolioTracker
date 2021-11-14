import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

import apiClient from '../../api';
import { cryptoWalletsQueryKeyBuilder } from './queries';

export const useCryptoWalletDelete = (accountId: number) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const mutation = useMutation(() => {
    return apiClient.cryptoCurrencyWallets.deleteCryptoCurrencyWallet(accountId);
  });

  const onDelete = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(cryptoWalletsQueryKeyBuilder(), { exact: true });
    history.replace('/cryptoWallets');
  };

  return {
    onDelete,
  };
};
