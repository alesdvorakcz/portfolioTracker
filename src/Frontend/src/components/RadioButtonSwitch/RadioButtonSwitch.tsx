import { Radio } from 'antd';

interface RadioButtonSwitchItem {
  id: string;
  label: string;
}

interface Props {
  items: RadioButtonSwitchItem[];
  defaultValue?: string;
  onChange: (id: string) => void;
}

const RadioButtonSwitch: React.FC<Props> = ({ items, defaultValue, onChange }) => {
  return (
    <Radio.Group
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
      buttonStyle="solid"
    >
      {items.map((x) => (
        <Radio.Button value={x.id}>{x.label}</Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default RadioButtonSwitch;
