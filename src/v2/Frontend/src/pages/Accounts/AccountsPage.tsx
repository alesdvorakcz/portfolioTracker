import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Alert, Col, Row, Statistic } from 'antd';

import { Box, LoadingIndicator, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import { toCurrencyFormat, toPercentFormat } from '../../i18n';
import { useEtfsQuery } from '../Etfs/queries';
import AccountsList from './components/AccountsList';

interface Props {}

const AccountsPage: React.FC<Props> = () => {
  const query = useEtfsQuery();
  const { tradesData } = useTradesContext();
  const { accountData } = tradesData;

  const isProfitPositive = accountData.cumulativeProfitCZK > 0;

  return (
    <PageWrapper title="Accounts">
      <>
        {query.isLoading && <LoadingIndicator />}
        {query.error && <Alert message={(query.error as any).message} type="error" />}
        {query.isSuccess && (
          <>
            <Box>
              <Row>
                <Col md={8}>
                  <Statistic
                    title="Total Value"
                    value={toCurrencyFormat(accountData.totalValueCZK)}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Total Transactions"
                    value={toCurrencyFormat(accountData.cumulativeTransactionsCZK)}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Total Profit"
                    value={toCurrencyFormat(accountData.cumulativeProfitCZK)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Statistic
                    title="Profit"
                    prefix={isProfitPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    valueStyle={{ color: isProfitPositive ? 'green' : 'red' }}
                    value={toPercentFormat(accountData.profitPercentageCZK)}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Profit (plain)"
                    prefix={isProfitPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    valueStyle={{ color: isProfitPositive ? 'green' : 'red' }}
                    value={toPercentFormat(accountData.profitPercentagePlainCZK)}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Profit (pa)"
                    prefix={isProfitPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    valueStyle={{ color: isProfitPositive ? 'green' : 'red' }}
                    value={toPercentFormat(accountData.profitPercentagePaCZK)}
                  />
                </Col>
              </Row>
            </Box>
            <AccountsList accountData={accountData} />
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default AccountsPage;
