import { Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Ref } from 'react';

import { CryptoCurrencyValueHistory } from '../../../api/models';
import {
  FormikDateInput,
  FormikNumberInput,
  FormSubmitFunc,
} from '../../../components/Forms/formik';

export interface FormValues {
  date?: moment.Moment;
  conversionRateEUR?: number;
  conversionRateUSD?: number;
}
interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  valueHistory: CryptoCurrencyValueHistory;
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
    conversionRateEUR: valueHistory.conversionRateEUR,
    conversionRateUSD: valueHistory.conversionRateUSD,
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
          name="conversionRateEUR"
          label="Conversion Rate EUR"
          suffix=" €"
          allowDecimal
          required
        />
        <FormikNumberInput
          name="conversionRateUSD"
          label="Conversion Rate USD"
          suffix=" $"
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
