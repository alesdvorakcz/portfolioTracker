import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import apiClient from '../../api';
import { FormSubmitFunc } from '../../components/Forms/formik';
import { handleSubmitErrors } from '../../components/Forms/helpers';
import { FormValues, ValidatedFormValues } from './components/AddEtfInstrumentForm';
import { etfInstrumentsQueryKeyBuilder } from './queries';

export const useEtfInstrumentToAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormikProps<FormValues>>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((payload: ValidatedFormValues) => {
    return apiClient.etfs.addEtfInstrument(payload);
  });

  const onSubmit: FormSubmitFunc<ValidatedFormValues> = async (payload) => {
    try {
      await mutation.mutateAsync(payload);
      setIsOpen(false);
      queryClient.invalidateQueries(etfInstrumentsQueryKeyBuilder(), { exact: true });
      return { success: true, errors: {} };
    } catch (error) {
      return handleSubmitErrors(error);
    }
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    isLoading: mutation.isLoading,
    formRef,
    onSubmit,
  };
};
