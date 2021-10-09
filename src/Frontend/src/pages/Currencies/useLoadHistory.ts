import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { currenciesQueryKeyBuilder, currencyDetailQueryKeyBuilder } from './queries';

export const useLoadHistory = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((params: { from: string; to: string }) => {
    return apiClient.currencies.loadHistory(id, params.from, params.to);
  });

  const onLoad = async (from: string, to: string) => {
    await mutation.mutateAsync({ from, to });
    queryClient.invalidateQueries(currencyDetailQueryKeyBuilder(id));
    queryClient.invalidateQueries(currenciesQueryKeyBuilder(), { exact: true });
  };

  return { onLoad, loading: mutation.isLoading };
};
