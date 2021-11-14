import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/AddHistoryValueForm';
import { cryptoCurrenciesQueryKeyBuilder, cryptoCurrencyDetailQueryKeyBuilder } from './queries';

export const useCryptoCurrencyValueHistoryAdd = (cryptoCurrencyId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((payload: ValidatedFormValues) => {
    return apiClient.cryptoCurrencies.addValueToHistory(cryptoCurrencyId, {
      date: payload.date.toISOString(),
      conversionRateEUR: payload.conversionRateEUR,
      conversionRateUSD: payload.conversionRateUSD,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    try {
      await mutation.mutateAsync(payload);
      setIsOpen(false);
      queryClient.invalidateQueries(cryptoCurrencyDetailQueryKeyBuilder(cryptoCurrencyId));
      queryClient.invalidateQueries(cryptoCurrenciesQueryKeyBuilder(), { exact: true });
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
