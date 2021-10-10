import { DatePicker } from 'antd';
import moment from 'moment';

import InputWrapper from './InputWrapper';

const { RangePicker } = DatePicker;

interface Props {
  label: string;
  name: string;
  value?: [moment.Moment, moment.Moment];
  required?: boolean;
  onChange: (value?: [moment.Moment, moment.Moment]) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

const DateRangeInput: React.FC<Props> = ({
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
      <RangePicker
        name={name}
        value={value}
        allowClear={!required}
        format="l"
        onChange={(e) => {
          let newVal: [moment.Moment, moment.Moment] | undefined = undefined;
          if (e && e[0] && e[1]) {
            //strip date time
            newVal = [moment.utc(e[0]).startOf('day'), moment.utc(e[1]).startOf('day')];
          }
          onChange(newVal);
        }}
        onBlur={() => onBlur()}
        style={{ width: '100%' }}
      />
    </InputWrapper>
  );
};

export default DateRangeInput;
