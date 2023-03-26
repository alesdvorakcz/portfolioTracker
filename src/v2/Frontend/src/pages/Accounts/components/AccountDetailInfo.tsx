import { Col, Row, Statistic } from 'antd';

import { Account } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toPercentFormat } from '../../../i18n';
import { getGainColor, getGainIcon } from '../../../utils/helpers';

interface Props {
  account: Account;
  showInCZK: boolean;
}

const PercentageStatistic = ({ value, label }: { value?: number; label: string }) => {
  if (value === undefined) return null;

  return (
    <Statistic
      title={label}
      prefix={getGainIcon(value)}
      valueStyle={{ color: getGainColor(value) }}
      value={toPercentFormat(value)}
    />
  );
};

const CurrencyStatistic = ({
  value,
  currencyId,
  label,
}: {
  value?: number;
  currencyId?: string;
  label: string;
}) => {
  if (value === undefined) return null;

  return (
    <Statistic
      title={label}
      valueStyle={{ color: getGainColor(value) }}
      value={toCurrencyFormat(value, currencyId)}
    />
  );
};

const AccountDetailInfo: React.FC<Props> = ({ account, showInCZK }) => {
  return (
    <Box>
      {showInCZK ? (
        <Row>
          <Col xs={24} md={6}>
            <Statistic title="Value" value={toCurrencyFormat(account.valueCZK)} />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic
              label="% Profit (Plain)"
              value={account.profitPercentagePlainCZK}
            />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic label="% Profit" value={account.profitPercentageCZK} />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic label="% Profit (Pa)" value={account.profitPercentagePaCZK} />
          </Col>
          <Col xs={12} md={4}>
            <CurrencyStatistic label="Profit" value={account.cumulativeProfitCZK} />
          </Col>
          <Col xs={12} md={5} style={{ textAlign: 'right' }}>
            <Statistic
              title="Transactions"
              value={toCurrencyFormat(account.cumulativeTransactionsCZK)}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={24} md={6}>
            <Statistic title="Value" value={toCurrencyFormat(account.value, account.currencyId)} />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic label="% Profit (Plain)" value={account.profitPercentagePlain} />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic label="% Profit" value={account.profitPercentage} />
          </Col>
          <Col xs={12} md={3}>
            <PercentageStatistic label="% Profit (Pa)" value={account.profitPercentagePa} />
          </Col>
          <Col xs={12} md={4}>
            <CurrencyStatistic
              label="Profit"
              value={account.cumulativeProfit}
              currencyId={account.currencyId}
            />
          </Col>
          <Col xs={12} md={5} style={{ textAlign: 'right' }}>
            <Statistic
              title="Transactions"
              value={toCurrencyFormat(account.cumulativeTransactions, account.currencyId)}
            />
          </Col>
        </Row>
      )}
    </Box>
  );
};

export default AccountDetailInfo;
