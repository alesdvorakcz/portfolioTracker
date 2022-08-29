import { PieTooltipProps, ResponsivePie } from '@nivo/pie';
import React from 'react';

interface Props<RawDatum> {
  data: RawDatum[];
  height: number;
  tooltip: (props: PieTooltipProps<RawDatum>) => React.ReactElement;
}

function PieChart<RawDatum>({ data, height, tooltip }: Props<RawDatum>): React.ReactElement {
  return (
    <div style={{ height: height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        innerRadius={0.15}
        padAngle={2}
        cornerRadius={10}
        tooltip={tooltip}
        arcLabel="label"
        arcLabelsRadiusOffset={0.75}
        arcLinkLabel="formattedValue"
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        valueFormat=" ^-.1%"
        arcLabelsSkipAngle={5}
        arcLinkLabelsSkipAngle={5}
      />
    </div>
  );
}

export default PieChart;
