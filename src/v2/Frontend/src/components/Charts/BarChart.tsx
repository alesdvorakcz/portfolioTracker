import { BarTooltipProps, ResponsiveBar } from '@nivo/bar';
import React from 'react';

interface Props {
  data: any[];
  height: number;
  keys: string[];
  indexBy: string;
  valueFormat?: (val: number) => string;
  tooltip?: (val: BarTooltipProps<any>) => React.ReactElement;
}

const BarChart: React.FC<Props> = ({ data, height, keys, indexBy, valueFormat, tooltip }) => {
  return (
    <div style={{ height: height }}>
      <ResponsiveBar
        data={data}
        groupMode="grouped"
        colors={[
          'rgba(87,117,144, 1)',
          'rgba(87,117,144, .6)',
          'rgba(249,65,68, 1)',
          'rgba(249,65,68, .6)',
          'rgba(243,114,44, 1)',
          'rgba(243,114,44, .6)',
          'rgba(67,170,139, 1)',
          'rgba(67,170,139, .6)',
          'rgba(248,150,30, 1)',
          'rgba(248,150,30, .6)',
          'rgba(144,190,109, 1)',
          'rgba(144,190,109, .6)',
          'rgba(249,199,79, 1)',
          'rgba(249,199,79, .6)',
        ]}
        margin={{ top: 50, right: 0, bottom: 50, left: 100 }}
        keys={keys}
        indexBy={indexBy}
        axisBottom={null}
        axisLeft={{
          format: valueFormat,
        }}
        // labelSkipHeight={10}
        enableLabel={false}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        valueFormat={valueFormat}
        tooltip={tooltip}
        animate={false}
      />
    </div>
  );
};

export default BarChart;
