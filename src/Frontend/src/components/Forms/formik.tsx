import { useField } from 'formik';
import moment from 'moment';

import { requiredValidator } from '../../utils/validators';
import {
  DateInput,
  DateRangeInput,
  MultiSelectInput,
  NumberInput,
  SelectInput,
  TextInput,
} from '.';
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

export const FormikDateRangeInput: React.FC<FormikInputProps> = ({
  name,
  label,
  required,
  validate,
}) => {
  const [, meta, helpers] = useField<[moment.Moment, moment.Moment] | undefined>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <DateRangeInput
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
  allowDecimal?: boolean;
}

export const FormikNumberInput: React.FC<FormikNumberInputProps> = ({
  name,
  label,
  required,
  min,
  max,
  prefix,
  suffix,
  allowDecimal,
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
      allowDecimal={allowDecimal}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

interface FormikSelectInputProps extends FormikInputProps {
  options: SelectInputOption[];
  loading?: boolean;
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = ({
  name,
  label,
  options,
  required,
  loading,
  validate,
}) => {
  const [, meta, helpers] = useField<string | undefined>({
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
      loading={loading}
    />
  );
};

interface FormikMultiSelectInputProps extends FormikInputProps {
  options: SelectInputOption[];
  loading?: boolean;
}

export const FormikMultiSelectInput: React.FC<FormikMultiSelectInputProps> = ({
  name,
  label,
  options,
  required,
  loading,
  validate,
}) => {
  const [, meta, helpers] = useField<string[]>({
    name,
    validate: validate ?? required ? requiredValidator : undefined,
  });

  return (
    <MultiSelectInput
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
      required={required}
      options={options}
      loading={loading}
    />
  );
};
