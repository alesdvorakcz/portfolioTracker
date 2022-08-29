import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { currenciesQueryKeyBuilder } from '../Currencies/queries';

export const useCurrencyImport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.currencies();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(currenciesQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
