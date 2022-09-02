import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

import { EtfDetailWithTrades } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toNumberFormat, toPercentFormat } from '../../../i18n';

interface Props {
  etf: EtfDetailWithTrades;
}

const EtfDetailInfo: React.FC<Props> = ({ etf }) => {
  const gain = etf.value / etf.cumulativeTransactions - 1;
  const gainCZK =
    etf.valueCZK && etf.cumulativeTransactionsCZK
      ? etf.valueCZK / etf.cumulativeTransactionsCZK - 1
      : undefined;

  const isGainPositive = gain && gain > 0;
  const isGainPositiveCZK = gainCZK && gainCZK > 0;

  return (
    <Box>
      <Row>
        <Col xs={24} md={8}>
          <Statistic title="Value" value={toCurrencyFormat(etf.valueCZK)} />
        </Col>
        <Col xs={12} md={6}>
          {!isNaN(gain) && (
            <Statistic
              title="Profit"
              prefix={isGainPositiveCZK ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              valueStyle={{ color: isGainPositiveCZK ? 'green' : 'red' }}
              value={toPercentFormat(gainCZK)}
            />
          )}
        </Col>
        <Col xs={12} md={3}>
          <Statistic title="Total Amount" value={toNumberFormat(etf.unitsTotal)} />
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic
            title="Total Transactions"
            value={toCurrencyFormat(etf.cumulativeTransactionsCZK)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <Statistic title="Value" value={toCurrencyFormat(etf.value, etf.currencyId)} />
        </Col>
        <Col xs={12} md={6}>
          {!isNaN(gain) && (
            <Statistic
              title="Profit"
              prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
              value={toPercentFormat(gain)}
            />
          )}
        </Col>
        <Col xs={12} md={3}>
          <Statistic title="Total Amount" value={toNumberFormat(etf.unitsTotal)} />
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic
            title="Transactions"
            value={toCurrencyFormat(etf.cumulativeTransactions, etf.currencyId)}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default EtfDetailInfo;
