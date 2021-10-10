import { Alert, Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { FormError } from '../../../components/Forms';
import {
  FormikDateRangeInput,
  FormikMultiSelectInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';
import { useCurrenciesQuery } from '../../Currencies/queries';

export interface FormValues {
  currencyIds: string[];
  dateRange?: [moment.Moment, moment.Moment];
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}

export type ValidatedFormValues = Required<FormValues>;

const HistoryImportForm: React.FC<Props> = ({ formRef, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    currencyIds: [],
  };

  const currenciesQuery = useCurrenciesQuery();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (payload, helpers) => {
        const result = await onSubmit(payload as ValidatedFormValues);
        if (!result.success) {
          helpers.setSubmitting(false);
          helpers.setErrors(result.errors);
          helpers.setStatus(result.error);
        }
      }}
      innerRef={formRef}
    >
      <Form>
        <FormikDateRangeInput name="dateRange" label="Date Range" required />
        {!currenciesQuery.isLoading && currenciesQuery.error && (
          <Alert type="error" message={(currenciesQuery.error as any).message} />
        )}
        <FormikMultiSelectInput
          name="currencyIds"
          label="Currency"
          loading={currenciesQuery.isLoading}
          options={currenciesQuery.data?.map((x) => ({ value: x.id, label: x.name })) ?? []}
          required
        />
        <FormError />
        {!hideSubmitButton && (
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default HistoryImportForm;
