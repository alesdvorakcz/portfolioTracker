import { Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import { Ref } from 'react';

import { CryptoCurrencyWalletDetail } from '../../../api/models';
import { FormError } from '../../../components/Forms';
import { FormikTextInput, FormSubmitFunc } from '../../../components/Forms/formik';

export interface FormValues {
  name?: string;
}

interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  cryptoCurrencyWallet: CryptoCurrencyWalletDetail;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}

export type ValidatedFormValues = Required<FormValues>;

const EditCryptoWalletForm: React.FC<Props> = ({
  formRef,
  cryptoCurrencyWallet,
  hideSubmitButton,
  onSubmit,
}) => {
  const initialValues: FormValues = {
    name: cryptoCurrencyWallet.name,
  };

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

export default EditCryptoWalletForm;
