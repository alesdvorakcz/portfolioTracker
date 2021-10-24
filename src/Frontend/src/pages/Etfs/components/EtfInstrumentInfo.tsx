import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

import { Currency, EtfInstrumentDetail } from '../../../api/models';
import { Box } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
}

const EtfInstrumentInfo: React.FC<Props> = ({ etfInstrument }) => {
  const gainCZK = etfInstrument.valueCZK / etfInstrument.cumulativeTransactionsCZK - 1;
  const gain = etfInstrument.value / etfInstrument.cumulativeTransactions - 1;

  const isGainPositiveCZK = gainCZK && gainCZK > 0;
  const isGainPositive = gain && gain > 0;

  return (
    <Box>
      <Row>
        <Col xs={24} md={8}>
          <Statistic
            title="Value"
            value={etfInstrument.valueCZK.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          />
        </Col>
        <Col xs={12} md={6}>
          {!isNaN(gain) && (
            <Statistic
              title="Profit"
              prefix={isGainPositiveCZK ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              valueStyle={{ color: isGainPositiveCZK ? 'green' : 'red' }}
              value={gainCZK.toLocaleString(DEFAULT_LOCALE, {
                style: 'percent',
                minimumFractionDigits: 2,
              })}
            />
          )}
        </Col>
        <Col xs={12} md={3}>
          <Statistic
            title="Total Amount"
            value={etfInstrument.totalAmount.toLocaleString(DEFAULT_LOCALE)}
          />
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic
            title="Total Transactions"
            value={etfInstrument.cumulativeTransactionsCZK.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <Statistic
            title="Value"
            value={etfInstrument.value.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: etfInstrument.currencyId,
            })}
          />
        </Col>
        <Col xs={12} md={6}>
          {!isNaN(gain) && (
            <Statistic
              title="Profit"
              prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
              value={gain.toLocaleString(DEFAULT_LOCALE, {
                style: 'percent',
                minimumFractionDigits: 2,
              })}
            />
          )}
        </Col>
        <Col xs={12} md={3}>
          <Statistic
            title="Total Amount"
            value={etfInstrument.totalAmount.toLocaleString(DEFAULT_LOCALE)}
          />
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic
            title="Transactions"
            value={etfInstrument.cumulativeTransactions.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: etfInstrument.currencyId,
            })}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default EtfInstrumentInfo;
