import { Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { CurrencyValueHistory } from '../../../api/models';
import {
  FormikDateInput,
  FormikNumberInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  date?: moment.Moment;
  conversionRate?: number;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  valueHistory: CurrencyValueHistory;
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
    conversionRate: valueHistory.conversionRate,
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
        <FormikNumberInput
          name="conversionRate"
          label="Conversion Rate"
          suffix=" Kč"
          allowDecimal
          required
        />

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
