import { Select } from 'antd';
import React, { useState } from 'react';

import { CryptoDetail } from '../../../api/models';
import { Box } from '../../../components';
import CryptoValueHistoryChart from './CryptoValueHistoryChart';
import CryptoValueHistoryTable from './CryptoValueHistoryTable';

interface Props {
  crypto: CryptoDetail;
}

const CryptoValueDetail: React.FC<Props> = ({ crypto }) => {
  const views = [
    { value: 'table', label: 'Table' },
    { value: 'line-chart', label: 'Line Chart' },
  ];
  const [selectedView, setSelectedView] = useState<string>(views[0].value);

  return (
    <Box>
      <Select
        style={{ width: 120 }}
        options={views}
        value={selectedView}
        onChange={(x) => setSelectedView(x)}
      />
      {selectedView === 'table' && <CryptoValueHistoryTable crypto={crypto} />}
      {selectedView === 'line-chart' && <CryptoValueHistoryChart crypto={crypto} />}
    </Box>
  );
};

export default CryptoValueDetail;
