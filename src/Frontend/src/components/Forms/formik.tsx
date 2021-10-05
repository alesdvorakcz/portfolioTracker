import { useField } from 'formik';

import { TextInput } from '.';

interface Props {
  name: string;
  label: string;
}

export const FormikTextInput: React.FC<Props> = ({ name, label }) => {
  const [, meta, helpers] = useField<string | undefined>(name);

  return (
    <TextInput
      name={name}
      label={label}
      value={meta.value}
      onChange={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.error}
      touched={meta.touched}
    />
  );
};
