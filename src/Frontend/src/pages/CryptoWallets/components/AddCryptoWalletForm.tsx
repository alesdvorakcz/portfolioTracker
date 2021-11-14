import { Alert, Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import { Ref } from 'react';

import { FormError } from '../../../components/Forms';
import {
  FormikSelectInput,
  FormikTextInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';
import { useCryptoCurrenciesQuery } from '../../CryptoCurrencies/queries';

export interface FormValues {
  name?: string;
  cryptoCurrencyId?: string;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}

export type ValidatedFormValues = Required<FormValues>;

const AddCryptoWalletForm: React.FC<Props> = ({ formRef, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {};

  const cryptoCurrenciesQuery = useCryptoCurrenciesQuery();

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
        <FormikTextInput name="name" label="Name" required />
        {!cryptoCurrenciesQuery.isLoading && cryptoCurrenciesQuery.error && (
          <Alert type="error" message={(cryptoCurrenciesQuery.error as any).message} />
        )}
        <FormikSelectInput
          name="cryptoCurrencyId"
          label="Crypto Currency"
          loading={cryptoCurrenciesQuery.isLoading}
          options={cryptoCurrenciesQuery.data?.map((x) => ({ value: x.id, label: x.name })) ?? []}
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

export default AddCryptoWalletForm;
