import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CryptoCurrencyTrade } from '../../api/models';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/EditTradeForm';
import { cryptoWalletDetailQueryKeyBuilder, cryptoWalletsQueryKeyBuilder } from './queries';

export const useCryptoWalletTradeEdit = (cryptoWalletId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CryptoCurrencyTrade | undefined>();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((params: { id: number; payload: ValidatedFormValues }) => {
    return apiClient.cryptoCurrencyWallets.editTrade(cryptoWalletId, params.id, {
      date: params.payload.date.toISOString(),
      change: params.payload.change,
      changeEUR: params.payload.changeEUR,
      amountAfter: params.payload.amountAfter,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    if (selected) {
      try {
        await mutation.mutateAsync({ id: selected.id, payload });
        setIsOpen(false);
        queryClient.invalidateQueries(cryptoWalletDetailQueryKeyBuilder(cryptoWalletId));
        queryClient.invalidateQueries(cryptoWalletsQueryKeyBuilder(), { exact: true });
        return { success: true, errors: {} };
      } catch (error) {
        return handleSubmitErrors(error);
      }
    }

    return { success: false, errors: {}, error: 'Unknown error' };
  };

  const open = (historyValue: CryptoCurrencyTrade) => {
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
    selectedTrade: selected,
    isLoading: mutation.isLoading,
    formRef,
    onSubmit,
  };
};
