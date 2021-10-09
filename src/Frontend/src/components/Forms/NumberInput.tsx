import { InputNumber } from 'antd';

import InputWrapper from './InputWrapper';

interface Props {
  label: string;
  name: string;
  value?: number;
  required?: boolean;
  onChange: (value: number) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  allowDecimal?: boolean;
}

const NumberInput: React.FC<Props> = ({
  label,
  name,
  value,
  required,
  error,
  touched,
  min,
  max,
  prefix,
  suffix,
  allowDecimal,
  onChange,
  onBlur,
}) => {
  return (
    <InputWrapper label={label} error={error} touched={touched} required={required}>
      <InputNumber
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => onBlur()}
        style={{ width: '100%' }}
        addonBefore={prefix}
        addonAfter={suffix}
        min={min}
        max={max}
        decimalSeparator={allowDecimal ? ',' : undefined}
      />
    </InputWrapper>
  );
};

export default NumberInput;
