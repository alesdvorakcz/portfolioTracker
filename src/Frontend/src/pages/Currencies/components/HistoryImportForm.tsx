import { Alert, Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import { Ref } from 'react';

import { FormError } from '../../../components/Forms';
import {
  FormikCheckbox,
  FormikMultiSelectInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';
import { maxOptionsValidator5 } from '../../../utils/validators';
import { useCurrenciesQuery } from '../../Currencies/queries';

export interface FormValues {
  filter: string[];
  full?: boolean;
  rewrite?: boolean;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}

export type ValidatedFormValues = Required<FormValues>;

const HistoryImportForm: React.FC<Props> = ({ formRef, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    filter: [],
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
        {!currenciesQuery.isLoading && currenciesQuery.error && (
          <Alert type="error" message={(currenciesQuery.error as any).message} />
        )}
        <FormikMultiSelectInput
          name="filter"
          label="Currency"
          loading={currenciesQuery.isLoading}
          options={currenciesQuery.data?.map((x) => ({ value: x.id, label: x.name })) ?? []}
          required
          validate={maxOptionsValidator5}
        />
        <FormikCheckbox name="full" label="Full" />
        <FormikCheckbox name="rewrite" label="Rewrite" />
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
