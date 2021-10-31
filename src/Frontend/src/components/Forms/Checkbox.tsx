import { Checkbox as AntdCheckbox } from 'antd';

interface Props {
  label: string;
  name: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  touched?: boolean;
}

const Checkbox: React.FC<Props> = ({ label, name, value, onChange }) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <AntdCheckbox name={name} checked={value} onChange={(e) => onChange(e.target.checked)}>
        {label}
      </AntdCheckbox>
    </div>
  );
};

export default Checkbox;
