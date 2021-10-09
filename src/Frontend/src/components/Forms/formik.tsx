import { useField } from 'formik';
import moment from 'moment';

import { requiredValidator } from '../../utils/validators';
import { DateInput, NumberInput, SelectInput, TextInput } from '.';
import { SelectInputOption } from './SelectInput';

export interface FormSubmitResult<T> {
  success: boolean;
  error?: string;
  errors: { [Property in keyof T]?: string };
}

export type FormSubmitFunc<T> = (payload: T) => Promise<FormSubmitResult<T>>;

export type FormikValidateFunc = (value: string | number | undefined) => string | undefined;

interface FormikInputProps {
  name: string;
  label: string;
  required?: boolean;
  validate?: FormikValidateFunc;
}

export const FormikTextInput: React.FC<FormikInputProps> = ({
  name,
  label,
  required,
  validate,
}) => {
  const [, meta, helpers] = useField<string | undefined>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <TextInput
      name={name}
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      required={required}
    />
  );
};

export const FormikDateInput: React.FC<FormikInputProps> = ({
  name,
  label,
  required,
  validate,
}) => {
  const [, meta, helpers] = useField<moment.Moment | undefined>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <DateInput
      name={name}
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      required={required}
    />
  );
};

interface FormikNumberInputProps extends FormikInputProps {
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

export const FormikNumberInput: React.FC<FormikNumberInputProps> = ({
  name,
  label,
  required,
  min,
  max,
  prefix,
  suffix,
  validate,
}) => {
  const [, meta, helpers] = useField<number | undefined>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <NumberInput
      name={name}
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      required={required}
      min={min}
      max={max}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

interface FormikSelectInputProps extends FormikInputProps {
  options: SelectInputOption[];
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = ({
  name,
  label,
  options,
  required,
  validate,
}) => {
  const [, meta, helpers] = useField<number | undefined>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <SelectInput
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      required={required}
      options={options}
    />
  );
};
