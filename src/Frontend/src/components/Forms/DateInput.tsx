import { DatePicker } from 'antd';
import moment from 'moment';

import InputWrapper from './InputWrapper';

interface Props {
  label: string;
  name: string;
  value?: moment.Moment;
  required?: boolean;
  onChange: (value?: moment.Moment) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

const DateInput: React.FC<Props> = ({
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
      <DatePicker
        name={name}
        value={value}
        allowClear={!required}
        onChange={(e) => onChange(e || undefined)}
        onBlur={() => onBlur()}
        style={{ width: '100%' }}
      />
    </InputWrapper>
  );
};

export default DateInput;
