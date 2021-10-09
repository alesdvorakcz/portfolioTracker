import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { AccountValueHistory } from '../../../api/models';
import {
  FormikDateInput,
  FormikNumberInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  date?: moment.Moment;
  valueBefore?: number;
  transactionCzk?: number;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  valueHistory: AccountValueHistory;
  onSubmit: FormSubmitFunc<ValidatedFormValues>;
}
export type ValidatedFormValues = Required<FormValues>;

const EditHistoryValueForm: React.FC<Props> = ({
  formRef,
  valueHistory,
  hideSubmitButton,
  onSubmit,
}) => {
  const initialValues: FormValues = {
    date: moment.utc(valueHistory.date),
    valueBefore: valueHistory.valueBefore,
    transactionCzk: valueHistory.transactionCzk,
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
            <FormikNumberInput name="valueBefore" label="Value Before" allowDecimal required />
          </Col>

          <Col span={12}>
            <FormikNumberInput
              name="transactionCzk"
              label="Transaction in CZK"
              suffix=" Kč"
              required
            />
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

export default EditHistoryValueForm;
