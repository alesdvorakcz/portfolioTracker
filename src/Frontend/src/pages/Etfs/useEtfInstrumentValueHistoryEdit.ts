import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { EtfInstrumentValueHistory } from '../../api/models';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/EditHistoryValueForm';
import { etfInstrumentDetailQueryKeyBuilder, etfInstrumentsQueryKeyBuilder } from './queries';

export const useEtfInstrumentValueHistoryEdit = (etfInstrumentId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<EtfInstrumentValueHistory | undefined>();
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((params: { id: number; payload: ValidatedFormValues }) => {
    return apiClient.etfs.editValueFromEtfHistory(etfInstrumentId, params.id, {
      date: params.payload.date.toISOString(),
      value: params.payload.value,
    });
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    if (selected) {
      try {
        await mutation.mutateAsync({ id: selected.id, payload });
        setIsOpen(false);
        queryClient.invalidateQueries(etfInstrumentDetailQueryKeyBuilder(etfInstrumentId));
        queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
        return { success: true, errors: {} };
      } catch (error) {
        return handleSubmitErrors(error);
      }
    }

    return { success: false, errors: {}, error: 'Unknown error' };
  };

  const open = (historyValue: EtfInstrumentValueHistory) => {
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
