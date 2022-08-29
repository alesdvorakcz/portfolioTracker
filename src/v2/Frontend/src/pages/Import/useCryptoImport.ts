import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { cryptosQueryKeyBuilder } from '../Cryptos/queries';

export const useCryptoImport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => {
    return apiClient.import.cryptos();
  });

  const onImport = async () => {
    await mutation.mutateAsync();
    queryClient.invalidateQueries(cryptosQueryKeyBuilder());
    return { success: true, errors: {} };
  };

  return { onImport, isLoading: mutation.isLoading };
};
