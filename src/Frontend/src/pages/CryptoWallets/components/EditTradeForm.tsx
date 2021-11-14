import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { CryptoCurrencyTrade } from '../../../api/models';
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
  trade: CryptoCurrencyTrade;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}
export type ValidatedFormValues = Required<FormValues>;

const EditTradeForm: React.FC<Props> = ({ formRef, trade, hideSubmitButton, onSubmit }) => {
  const initialValues: FormValues = {
    date: moment.utc(trade.date),
    changeEUR: trade.changeEUR,
    change: trade.change,
    amountAfter: trade.amountAfter,
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
            <FormikNumberInput
              name="changeEUR"
              label="Change EUR"
              suffix=" €"
              allowDecimal
              required
            />
          </Col>

          <Col span={12}>
            <FormikNumberInput name="change" label="Change" allowDecimal required />
          </Col>
        </Row>

        <FormikNumberInput name="amountAfter" label="Amount After" allowDecimal required />

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
