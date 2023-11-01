import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

import { Box, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import { toCurrencyFormat, toPercentFormat } from '../../i18n';
import CryptoList from './components/CryptoList';
import CryptoWalletsList from './components/CryptoWalletsList';

interface Props {}

const CryptoPage: React.FC<Props> = () => {
  const { tradesData } = useTradesContext();
  const { cryptoData } = tradesData;

  const gain =
    cryptoData.totalValueCZK && cryptoData.totalTransactionsCZK
      ? cryptoData.totalValueCZK / cryptoData.totalTransactionsCZK - 1
      : undefined;

  const isGainPositive = gain && gain > 0;

  return (
    <PageWrapper title="Crypto">
      <Box>
        <Row>
          <Col md={8}>
            <Statistic title="Total Value" value={toCurrencyFormat(cryptoData.totalValueCZK)} />
          </Col>
          <Col md={8}>
            <Statistic
              title="Total Transactions"
              value={toCurrencyFormat(cryptoData.totalTransactionsCZK)}
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
      <CryptoList cryptoData={cryptoData} />
      <CryptoWalletsList cryptoData={cryptoData} />
    </PageWrapper>
  );
};

export default CryptoPage;
