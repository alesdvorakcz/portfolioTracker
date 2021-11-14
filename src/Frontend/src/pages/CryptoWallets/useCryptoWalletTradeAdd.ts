import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/AddTradeForm';
import { cryptoWalletDetailQueryKeyBuilder, cryptoWalletsQueryKeyBuilder } from './queries';

export const useCryptoWalletTradeAdd = (cryptoWalletId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((payload: ValidatedFormValues) => {
    return apiClient.cryptoCurrencyWallets.addTrade(cryptoWalletId, {
      date: payload.date.toISOString(),
      change: payload.change,
      changeEUR: payload.changeEUR,
      amountAfter: payload.amountAfter,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    try {
      await mutation.mutateAsync(payload);
      setIsOpen(false);
      queryClient.invalidateQueries(cryptoWalletDetailQueryKeyBuilder(cryptoWalletId));
      queryClient.invalidateQueries(cryptoWalletsQueryKeyBuilder(), { exact: true });
      return { success: true, errors: {} };
    } catch (error) {
      return handleSubmitErrors(error);
    }
  };

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    isLoading: mutation.isLoading,
    formRef,
    onSubmit,
  };
};
