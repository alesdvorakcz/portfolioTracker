import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Alert, Col, Row, Statistic } from 'antd';

import { Box, LoadingIndicator, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import { toCurrencyFormat, toPercentFormat } from '../../i18n';
import EtfList from './components/EtfList';
import { useEtfsQuery } from './queries';

interface Props {}

const EtfsPage: React.FC<Props> = () => {
  const query = useEtfsQuery();
  const { tradesData } = useTradesContext();
  const { etfData } = tradesData;

  const gain =
    etfData.totalValueCZK && etfData.totalTransactionsCZK
      ? etfData.totalValueCZK / etfData.totalTransactionsCZK - 1
      : undefined;

  const isGainPositive = gain && gain > 0;

  return (
    <PageWrapper title="Etfs">
      <>
        {query.isLoading && <LoadingIndicator />}
        {query.error && <Alert message={(query.error as any).message} type="error" />}
        {query.isSuccess && (
          <>
            <Box>
              <Row>
                <Col md={8}>
                  <Statistic title="Total Value" value={toCurrencyFormat(etfData.totalValueCZK)} />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Total Transactions"
                    value={toCurrencyFormat(etfData.totalTransactionsCZK)}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    title="Profit"
                    prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
                    value={toPercentFormat(gain)}
                  />
                </Col>
              </Row>
            </Box>
            <EtfList etfs={query.data} etfData={etfData} />
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default EtfsPage;
