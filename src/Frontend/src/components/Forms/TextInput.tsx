import { Input } from 'antd';

import InputWrapper from './InputWrapper';

interface Props {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

const TextInput: React.FC<Props> = ({
  label,
  name,
  value,
  required,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <InputWrapper label={label} error={error} touched={touched} required={required}>
      <Input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur()}
      />
    </InputWrapper>
  );
};

export default TextInput;
