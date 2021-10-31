import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Row, Space, Statistic } from 'antd';

import { Box, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../i18n';
import { useCurrenciesQuery } from '../Currencies/queries';
import AddEtfInstrumentForm from './components/AddEtfInstrumentForm';
import EtfInstrumentList from './components/EtfInstrumentList';
import EtfPie from './components/EtfPie';
import HistoryImportForm from './components/HistoryImportForm';
import { useEtfInstrumentsQuery } from './queries';
import { useEtfInstrumentToAdd } from './useEtfInstrumentToAdd';
import { useHistoryImport } from './useHistoryImport';

interface Props {}

const EtfsPage: React.FC<Props> = () => {
  const currenciesQuery = useCurrenciesQuery();
  const query = useEtfInstrumentsQuery();
  const etfInstrumentAdd = useEtfInstrumentToAdd();
  const historyImport = useHistoryImport();

  return (
    <PageWrapper
      title="ETFs"
      extra={
        <Space>
          <Button onClick={historyImport.open}>History Import</Button>
          <Button type="primary" onClick={etfInstrumentAdd.open}>
            Add ETF
          </Button>
        </Space>
      }
    >
      <QueryWrapper
        query={query}
        render={(data) => {
          const gain =
            data.totalValueCZK && data.totalTransactionsCZK
              ? data.totalValueCZK / data.totalTransactionsCZK - 1
              : null;

          const isGainPositive = gain && gain > 0;

          return (
            <>
              <Box>
                <Row>
                  <Col md={8}>
                    <Statistic
                      title="Total Value"
                      value={data.totalValueCZK?.toLocaleString(DEFAULT_LOCALE, {
                        style: 'currency',
                        currency: DEFAULT_CURRENCY,
                      })}
                    />
                  </Col>
                  <Col md={8}>
                    <Statistic
                      title="Total Transactions"
                      value={data.totalTransactionsCZK?.toLocaleString(DEFAULT_LOCALE, {
                        style: 'currency',
                        currency: DEFAULT_CURRENCY,
                      })}
                    />
                  </Col>
                  <Col md={8}>
                    <Statistic
                      title="Profit"
                      prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
                      value={
                        gain?.toLocaleString(DEFAULT_LOCALE, {
                          style: 'percent',
                          minimumFractionDigits: 2,
                        }) ?? '???'
                      }
                    />
                  </Col>
                </Row>
              </Box>
              <EtfInstrumentList
                etfInstruments={data.etfInstruments}
                currencies={currenciesQuery.data}
              />
              <EtfPie etfData={data} />
            </>
          );
        }}
      />
      <Drawer
        width={640}
        onClose={etfInstrumentAdd.close}
        maskClosable={false}
        title="Add ETF Instrument"
        visible={etfInstrumentAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={etfInstrumentAdd.close}>Cancel</Button>
              <Button
                loading={etfInstrumentAdd.isLoading}
                type="primary"
                onClick={() => etfInstrumentAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddEtfInstrumentForm
          formRef={etfInstrumentAdd.formRef}
          onSubmit={etfInstrumentAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={historyImport.close}
        maskClosable={false}
        title="History Import"
        visible={historyImport.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={historyImport.close}>Cancel</Button>
              <Button
                loading={historyImport.isLoading}
                type="primary"
                onClick={() => historyImport.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <HistoryImportForm
          formRef={historyImport.formRef}
          onSubmit={historyImport.onSubmit}
          hideSubmitButton
        />
      </Drawer>
    </PageWrapper>
  );
};

export default EtfsPage;
