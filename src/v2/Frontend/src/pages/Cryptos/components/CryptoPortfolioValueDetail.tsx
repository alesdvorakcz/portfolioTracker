import { Col, Row, Segmented, Select, Statistic } from 'antd';
import React, { useState } from 'react';

import { CryptoDetail } from '../../../api/models';
import { Box, FlexRow } from '../../../components';
import { CryptoWithHistory } from '../../../contexts/tradesContext';
import { toCurrencyFormat, toNumberFormat } from '../../../i18n';
import CryptoPortfolioHistoryTable from './CryptoPortfolioHistoryTable';

interface Props {
  crypto: CryptoDetail;
  history: CryptoWithHistory;
}

const CryptoPortfolioValueDetail: React.FC<Props> = ({ crypto, history }) => {
  const currencies = crypto && crypto.currencyId !== 'CZK' ? [crypto.currencyId, 'CZK'] : ['CZK'];
  const [showInCZK, setShowInCZK] = useState<boolean>(false);

  const timeRanges = ['Yearly', 'Monthly', 'All Data'];
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(timeRanges[0]);

  const views = [
    { value: 'table', label: 'Table' },
    { value: 'line-chart', label: 'Line Chart' },
  ];
  const [selectedView, setSelectedView] = useState<string>(views[0].value);

  return (
    <>
      <Box>
        <FlexRow align="right">
          <Segmented
            style={{ marginRight: 15 }}
            options={currencies}
            value={showInCZK ? 'CZK' : crypto?.currencyId}
            onChange={(val) => setShowInCZK(val === 'CZK')}
          />
        </FlexRow>
      </Box>
      <Box>
        <Row>
          <Col xs={24} md={6}>
            <Statistic
              title="Total Value"
              value={
                showInCZK
                  ? toCurrencyFormat(history.valueCZK)
                  : toCurrencyFormat(history.value, crypto.currencyId)
              }
            />
          </Col>
          <Col xs={24} md={6}>
            <Statistic
              title="Transactions"
              value={
                showInCZK
                  ? toCurrencyFormat(history.cumulativeTransactionsCZK)
                  : toCurrencyFormat(history.cumulativeTransactions, crypto.currencyId)
              }
            />
          </Col>
          <Col xs={12} md={6}>
            <Statistic title="Units" value={toNumberFormat(history.unitsTotal)} />
          </Col>
          <Col xs={12} md={6}>
            <Statistic title="Staked" value={toNumberFormat(history.cumulativeStakedUnits)} />
          </Col>
        </Row>
      </Box>
      <Box>
        <FlexRow marginBottom>
          <Segmented
            options={timeRanges}
            value={selectedTimeRange}
            onChange={(val) => setSelectedTimeRange(val.toString())}
          />
          <Select
            style={{ width: 120 }}
            options={views}
            value={selectedView}
            onChange={(x) => setSelectedView(x)}
          />
        </FlexRow>
        <CryptoPortfolioHistoryTable crypto={crypto} history={history} showInCZK={showInCZK} />
      </Box>
    </>
  );
};

export default CryptoPortfolioValueDetail;
