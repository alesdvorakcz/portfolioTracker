import { Select } from 'antd';

import InputWrapper from './InputWrapper';

interface Props {
  label: string;
  value?: string[] | number[];
  required?: boolean;
  onChange: (value: string[] | number[]) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  options: SelectInputOption[];
  loading?: boolean;
}

export interface SelectInputOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const MultiSelectInput: React.FC<Props> = ({
  label,
  value,
  required,
  error,
  touched,
  options,
  loading,
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
        loading={loading}
        mode="multiple"
      />
    </InputWrapper>
  );
};

export default MultiSelectInput;
