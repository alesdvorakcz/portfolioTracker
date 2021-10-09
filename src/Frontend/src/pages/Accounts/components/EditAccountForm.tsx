import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import { Ref } from 'react';

import { AccountDetail } from '../../../api/models';
import { FormError } from '../../../components/Forms';
import {
  FormikSelectInput,
  FormikTextInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  name?: string;
  slug?: string;
  currencyId?: string;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  account: AccountDetail;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}

export type ValidatedFormValues = Required<FormValues>;

const EditAccountForm: React.FC<Props> = ({ formRef, account, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    name: account.name,
    slug: account.slug,
    currencyId: account.currencyId,
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
        <Row gutter={16}>
          <Col span={12}>
            <FormikTextInput name="name" label="Name" required />
          </Col>

          <Col span={12}>
            <FormikTextInput name="slug" label="Slug" required />
          </Col>
        </Row>
        <FormikSelectInput
          name="currencyId"
          label="Currency"
          options={[
            { title: 'Koruny (Kč)', value: 'CZK' },
            { title: 'Euro (€)', value: 'EUR' },
            { title: 'US Dollar ($)', value: 'USD' },
          ]}
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

export default EditAccountForm;
