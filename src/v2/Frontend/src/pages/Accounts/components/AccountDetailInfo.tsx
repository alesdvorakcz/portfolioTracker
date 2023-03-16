import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

import { Account } from '../../../api/models';
import { Box } from '../../../components';
import { toCurrencyFormat, toPercentFormat } from '../../../i18n';

interface Props {
  account: Account;
  showInCZK: boolean;
}

const AccountDetailInfo: React.FC<Props> = ({ account, showInCZK }) => {
  const gain = account.value / account.cumulativeTransactions - 1;
  const gainCZK =
    account.valueCZK && account.cumulativeTransactionsCZK
      ? account.valueCZK / account.cumulativeTransactionsCZK - 1
      : undefined;

  const isGainPositive = gain && gain > 0;
  const isGainPositiveCZK = gainCZK && gainCZK > 0;

  return (
    <Box>
      <Row>
        <Col xs={24} md={8}>
          <Statistic
            title="Value"
            value={
              showInCZK
                ? toCurrencyFormat(account.valueCZK)
                : toCurrencyFormat(account.value, account.currencyId)
            }
          />
        </Col>
        <Col xs={12} md={8}>
          {showInCZK ? (
            <>
              {!isNaN(gain) && (
                <Statistic
                  title="Profit"
                  prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
                  value={toPercentFormat(gain)}
                />
              )}
            </>
          ) : (
            <>
              {!isNaN(gain) && (
                <Statistic
                  title="Profit"
                  prefix={isGainPositiveCZK ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  valueStyle={{ color: isGainPositiveCZK ? 'green' : 'red' }}
                  value={toPercentFormat(gainCZK)}
                />
              )}
            </>
          )}
        </Col>
        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
          <Statistic
            title="Total Transactions"
            value={
              showInCZK
                ? toCurrencyFormat(account.cumulativeTransactionsCZK)
                : toCurrencyFormat(account.cumulativeTransactions, account.currencyId)
            }
          />
        </Col>
      </Row>
    </Box>
  );
};

export default AccountDetailInfo;
