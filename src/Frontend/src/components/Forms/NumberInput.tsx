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
        // TODO
        //addonBefore={suffix}
        //addonAfter={prefix}
        min={min}
        max={max}
      />
    </InputWrapper>
  );
};

export default NumberInput;
