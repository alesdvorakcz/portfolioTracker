interface Props {
  label?: string;
  value: React.ReactNode;
}
const ChartTooltipItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div>
      {label && <span style={{ marginRight: 5 }}>{label}</span>}
      <span style={{ fontWeight: 'bold' }}>{value}</span>
    </div>
  );
};

export default ChartTooltipItem;
