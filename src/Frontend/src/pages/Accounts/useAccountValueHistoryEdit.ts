import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { AccountValueHistory } from '../../api/models';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/EditHistoryValueForm';
import { accountDetailQueryKeyBuilder, accountsQueryKeyBuilder } from './queries';

export const useAccountValueHistoryEdit = (accountId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<AccountValueHistory | undefined>();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((params: { id: number; payload: ValidatedFormValues }) => {
    return apiClient.accounts.editValueFromAccountHistory(accountId, params.id, {
      date: params.payload.date.toISOString(),
      valueBefore: params.payload.valueBefore,
      transactionCzk: params.payload.transactionCzk,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    if (selected) {
      try {
        await mutation.mutateAsync({ id: selected.id, payload });
        setIsOpen(false);
        queryClient.invalidateQueries(accountDetailQueryKeyBuilder(accountId));
        queryClient.invalidateQueries(accountsQueryKeyBuilder(), { exact: true });
        return { success: true, errors: {} };
      } catch (error) {
        return handleSubmitErrors(error);
      }
    }

    return { success: false, errors: {}, error: 'Unknown error' };
  };

  const open = (historyValue: AccountValueHistory) => {
    setSelected(historyValue);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setSelected(undefined);
  };

  return {
    isOpen,
    open,
    close,
    selectedHistoryValue: selected,
    isLoading: mutation.isLoading,
    formRef,
    onSubmit,
  };
};
