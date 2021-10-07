import { Select } from 'antd';

import InputWrapper from './InputWrapper';

interface Props {
  label: string;
  value?: number;
  required?: boolean;
  onChange: (value: number) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  options: SelectInputOption[];
}

export interface SelectInputOption {
  title: string;
  value: string;
  disabled?: boolean;
}

const SelectInput: React.FC<Props> = ({
  label,
  value,
  required,
  error,
  touched,
  options,
  onChange,
  onBlur,
}) => {
  return (
    <InputWrapper label={label} error={error} touched={touched} required={required}>
      <Select
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => onBlur()}
        options={options}
        style={{ width: '100%' }}
        showSearch
        allowClear={!required}
      />
    </InputWrapper>
  );
};

export default SelectInput;
