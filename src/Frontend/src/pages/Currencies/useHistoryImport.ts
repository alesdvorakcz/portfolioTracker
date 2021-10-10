import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { CurrencyHistoryImportRequest } from '../../api/models';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/HistoryImportForm';
import { currenciesQueryKeyBuilder } from './queries';

export const useHistoryImport = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormikProps<FormValues>>(null);

  const mutation = useMutation((params: CurrencyHistoryImportRequest) => {
    return apiClient.currencies.historyImport(params);
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    try {
      await mutation.mutateAsync({
        currencyIds: payload.currencyIds,
        from: payload.dateRange[0].toISOString(),
        to: payload.dateRange[1].toISOString(),
      });
      queryClient.invalidateQueries(currenciesQueryKeyBuilder(), { exact: true });
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

  return { isOpen, open, close, onSubmit, formRef, isLoading: mutation.isLoading };
};
