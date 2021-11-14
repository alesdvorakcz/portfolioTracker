import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import {
  FormikDateInput,
  FormikNumberInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  date?: moment.Moment;
  changeEUR?: number;
  change?: number;
  amountAfter?: number;
}

interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}
export type ValidatedFormValues = Required<FormValues>;

const AddTradeForm: React.FC<Props> = ({ formRef, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    date: moment.utc().startOf('day'),
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (payload, helpers) => {
        const result = await onSubmit(payload as ValidatedFormValues);
        if (!result.success) {
          helpers.setSubmitting(false);
          helpers.setErrors(result.errors);
        }
      }}
      innerRef={formRef}
    >
      <Form>
        <FormikDateInput name="date" label="Date" required />

        <Row gutter={16}>
          <Col span={12}>
            <FormikNumberInput name="changeEUR" label="Change EUR" allowDecimal required />
          </Col>

          <Col span={12}>
            <FormikNumberInput name="change" label="Change" required />
          </Col>
        </Row>

        <FormikNumberInput name="amountAfter" label="Amount After" required />

        {!hideSubmitButton && (
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default AddTradeForm;
