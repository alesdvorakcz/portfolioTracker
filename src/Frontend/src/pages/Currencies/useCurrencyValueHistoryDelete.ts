import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CurrencyValueHistory } from '../../api/models';
import { currenciesQueryKeyBuilder, currencyDetailQueryKeyBuilder } from './queries';

export const useCurrencyValueHistoryDelete = (currencyId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.currencies.deleteValueFromHistory(currencyId, id);
  });

  const onDelete = async (historyValue: CurrencyValueHistory) => {
    await mutation.mutateAsync(historyValue.id);
    queryClient.invalidateQueries(currencyDetailQueryKeyBuilder(currencyId));
    queryClient.invalidateQueries(currenciesQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
