import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CryptoCurrencyValueHistory } from '../../api/models';
import { cryptoCurrenciesQueryKeyBuilder, cryptoCurrencyDetailQueryKeyBuilder } from './queries';

export const useCryptoCurrencyValueHistoryDelete = (cryptoCurrencyId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.cryptoCurrencies.deleteValueFromHistory(cryptoCurrencyId, id);
  });

  const onDelete = async (historyValue: CryptoCurrencyValueHistory) => {
    await mutation.mutateAsync(historyValue.id);
    queryClient.invalidateQueries(cryptoCurrencyDetailQueryKeyBuilder(cryptoCurrencyId));
    queryClient.invalidateQueries(cryptoCurrenciesQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
