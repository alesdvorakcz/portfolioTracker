import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import moment from 'moment';

import { CryptoWallet } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toNumberFormat, toPercentFormat } from '../../../i18n';

interface Props {
  wallet: CryptoWallet;
}

const CryptoWalletDetailInfo: React.FC<Props> = ({ wallet }) => {
  const gain = wallet.value / wallet.cumulativeTransactions - 1;
  const gainCZK =
    wallet.valueCZK && wallet.cumulativeTransactionsCZK
      ? wallet.valueCZK / wallet.cumulativeTransactionsCZK - 1
      : undefined;

  // const isGainPositive = gain && gain > 0;
  const isGainPositiveCZK = gainCZK && gainCZK > 0;

  const lastValue = !!wallet.history.length && wallet.history[0];

  return (
    <Box>
      <Row>
        <Col xs={24} md={8}>
          <Statistic
            title="Value"
            value={`${toCurrencyFormat(wallet.valueCZK)} / ${toCurrencyFormat(
              wallet.value,
              wallet.crypto.currencyId
            )}`}
          />
        </Col>
        <Col xs={12} md={6}>
          {!isNaN(gain) && (
            <Statistic
              title="Profit"
              prefix={isGainPositiveCZK ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              valueStyle={{ color: isGainPositiveCZK ? 'green' : 'red' }}
              value={`${toPercentFormat(gainCZK)} / ${toPercentFormat(gain)}`}
            />
          )}
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic
            title="Total Transactions"
            value={`${toCurrencyFormat(wallet.cumulativeTransactionsCZK)} / ${toCurrencyFormat(
              wallet.cumulativeTransactions,
              wallet.crypto.currencyId
            )}`}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          {lastValue && (
            <Statistic
              title="Staked Units"
              value={`${toNumberFormat(wallet.stakedUnits)} (${toCurrencyFormat(
                wallet.stakedUnits * lastValue.unitPrice,
                wallet.crypto.currencyId
              )})`}
            />
          )}
        </Col>
        <Col xs={12} md={6}>
          {lastValue && (
            <Statistic
              title="Unit Price"
              value={`${toCurrencyFormat(lastValue.unitPrice, wallet.crypto.currencyId)} (${moment(
                lastValue.date
              ).format('l')})`}
            />
          )}
        </Col>
        <Col xs={12} md={7} style={{ textAlign: 'right' }}>
          <Statistic title="Total Units" value={toNumberFormat(wallet.unitsTotal)} />
        </Col>
      </Row>
    </Box>
  );
};

export default CryptoWalletDetailInfo;
