import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { EtfTradeHistory } from '../../../api/models';
import {
  FormikDateInput,
  FormikNumberInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  date?: moment.Moment;
  amount?: number;
  unitPrice?: number;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  trade: EtfTradeHistory;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}
export type ValidatedFormValues = Required<FormValues>;

const EditTradeForm: React.FC<Props> = ({ formRef, trade, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    date: moment.utc(trade.date),
    amount: trade.amount,
    unitPrice: trade.unitPrice,
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
            <FormikNumberInput name="amount" label="Amount" required />
          </Col>

          <Col span={12}>
            <FormikNumberInput name="unitPrice" label="Unit Price" allowDecimal required />
          </Col>
        </Row>

        {!hideSubmitButton && (
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        )}
      </Form>
    </Formik>
  );
};

export default EditTradeForm;
