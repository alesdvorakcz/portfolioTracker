import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { AccountValueHistory } from '../../api/models';
import { accountDetailQueryKeyBuilder, accountsQueryKeyBuilder } from './queries';

export const useAccountValueHistoryDelete = (accountId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => {
    return apiClient.accounts.deleteValueFromAccountHistory(accountId, id);
  });

  const onDelete = async (historyValue: AccountValueHistory) => {
    await mutation.mutateAsync(historyValue.id);
    queryClient.invalidateQueries(accountDetailQueryKeyBuilder(accountId));
    queryClient.invalidateQueries(accountsQueryKeyBuilder(), { exact: true });
  };

  return {
    onDelete,
  };
};
