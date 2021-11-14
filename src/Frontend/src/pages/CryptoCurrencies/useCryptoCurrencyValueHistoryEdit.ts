import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CryptoCurrencyValueHistory } from '../../api/models';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/EditHistoryValueForm';
import { cryptoCurrenciesQueryKeyBuilder, cryptoCurrencyDetailQueryKeyBuilder } from './queries';

export const useCryptoCurrencyValueHistoryEdit = (currencyId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CryptoCurrencyValueHistory | undefined>();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((params: { id: number; payload: ValidatedFormValues }) => {
    return apiClient.cryptoCurrencies.editValueToHistory(currencyId, params.id, {
      date: params.payload.date.toISOString(),
      conversionRateEUR: params.payload.conversionRateEUR,
      conversionRateUSD: params.payload.conversionRateUSD,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    if (selected) {
      try {
        await mutation.mutateAsync({ id: selected.id, payload });
        setIsOpen(false);
        queryClient.invalidateQueries(cryptoCurrencyDetailQueryKeyBuilder(currencyId));
        queryClient.invalidateQueries(cryptoCurrenciesQueryKeyBuilder(), { exact: true });
        return { success: true, errors: {} };
      } catch (error) {
        return handleSubmitErrors(error);
      }
    }

    return { success: false, errors: {}, error: 'Unknown error' };
  };

  const open = (historyValue: CryptoCurrencyValueHistory) => {
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
