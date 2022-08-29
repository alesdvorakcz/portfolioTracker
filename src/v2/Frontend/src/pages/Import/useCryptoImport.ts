import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';

export const useCryptoImport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.cryptos();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    // queryClient.invalidateQueries(currenciesQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
