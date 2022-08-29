import { PropsWithChildren } from 'react';

interface Props {}

const ChartTooltip: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div style={{ backgroundColor: '#fff', padding: 5 }}>{children}</div>;
};

export default ChartTooltip;
