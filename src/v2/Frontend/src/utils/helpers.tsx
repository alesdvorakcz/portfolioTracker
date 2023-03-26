import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const getGainColor = (gain?: number) => {
  if (!gain) return undefined;

  if (gain > 0) return 'green';
  if (gain < 0) return 'red';
};

export const getGainIcon = (gain?: number) => {
  if (!gain) return undefined;

  if (gain > 0) return <ArrowUpOutlined />;
  if (gain < 0) return <ArrowDownOutlined />;
};
