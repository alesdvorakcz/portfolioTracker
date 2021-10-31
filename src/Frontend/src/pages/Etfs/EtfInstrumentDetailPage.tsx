import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { Box, DeleteConfirm, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCurrenciesQuery } from '../Currencies/queries';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import AddTradeForm from './components/AddTradeForm';
import EditEtfInstrumentForm from './components/EditEtfInstrumentForm';
import EditHistoryValueForm from './components/EditHistoryValueForm';
import EditTradeForm from './components/EditTradeForm';
import EtfInstrumentInfo from './components/EtfInstrumentInfo';
import EtfTradeValueChart from './components/EtfTradeValueChart';
import EtfValueChart from './components/EtfValueChart';
import TradeHistoryTable from './components/TradeHistoryTable';
import ValueHistoryTable from './components/ValueHistoryTable';
import { useEtfInstrumentDetailQuery } from './queries';
import { useEtfInstrumentDelete } from './useEtfInstrumentDelete';
import { useEtfInstrumentEdit } from './useEtfInstrumentEdit';
import { useEtfInstrumentValueHistoryAdd } from './useEtfInstrumentValueHistoryAdd';
import { useEtfInstrumentValueHistoryDelete } from './useEtfInstrumentValueHistoryDelete';
import { useEtfInstrumentValueHistoryEdit } from './useEtfInstrumentValueHistoryEdit';
import { useEtfTradeHistoryAdd } from './useEtfTradeHistoryAdd';
import { useEtfTradeHistoryDelete } from './useEtfTradeHistoryDelete';
import { useEtfTradeHistoryEdit } from './useEtfTradeHistoryEdit';

const { TabPane } = Tabs;

interface Props {}

interface PageParams {
  id: string;
}

const EtfInstrumentDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();

  const id = parseInt(params.id, 10);

  const currenciesQuery = useCurrenciesQuery();
  const etfInstrumentEdit = useEtfInstrumentEdit(id);
  const etfInstrumentDelete = useEtfInstrumentDelete(id);
  const valueHistoryAdd = useEtfInstrumentValueHistoryAdd(id);
  const valueHistoryEdit = useEtfInstrumentValueHistoryEdit(id);
  const valueHistoryDelete = useEtfInstrumentValueHistoryDelete(id);
  const tradeHistoryAdd = useEtfTradeHistoryAdd(id);
  const tradeHistoryEdit = useEtfTradeHistoryEdit(id);
  const tradeHistoryDelete = useEtfTradeHistoryDelete(id);
  const query = useEtfInstrumentDetailQuery(id);

  const currency = query.data && currenciesQuery.data?.find((x) => x.id === query.data.currencyId);

  return (
    <PageWrapper
      title={query.data?.name || 'ETF Instrument Detail'}
      subtitle={query.data?.isin}
      goBack={() => history.goBack()}
      extra={
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={etfInstrumentEdit.open}>
            Edit
          </Button>
          <DeleteConfirm onDelete={etfInstrumentDelete.onDelete}>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </DeleteConfirm>
        </Space>
      }
    >
      <QueryWrapper
        query={query}
        render={(etf) => (
          <>
            <EtfInstrumentInfo etfInstrument={etf} currency={currency} />
            <Box>
              <Tabs defaultActiveKey="1">
                <TabPane tab="History Values" key="1">
                  <ValueHistoryTable
                    etfInstrument={etf}
                    currency={currency}
                    onAddClick={valueHistoryAdd.open}
                    onEditClick={valueHistoryEdit.open}
                    onDeleteClick={valueHistoryDelete.onDelete}
                  />
                </TabPane>
                <TabPane tab="Trades" key="2">
                  <TradeHistoryTable
                    etfInstrument={etf}
                    currency={currency}
                    onAddClick={tradeHistoryAdd.open}
                    onEditClick={tradeHistoryEdit.open}
                    onDeleteClick={tradeHistoryDelete.onDelete}
                  />
                </TabPane>
                <TabPane tab="Portfolio Chart" key="3">
                  <EtfTradeValueChart etfInstrument={etf} currency={currency} />
                </TabPane>
                <TabPane tab="ETF Chart" key="4">
                  <EtfValueChart etfInstrument={etf} currency={currency} />
                </TabPane>
              </Tabs>
            </Box>
          </>
        )}
      />
      <Drawer
        width={640}
        onClose={valueHistoryAdd.close}
        maskClosable={false}
        title="Add Value"
        visible={valueHistoryAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={valueHistoryAdd.close}>Cancel</Button>
              <Button
                loading={valueHistoryAdd.isLoading}
                type="primary"
                onClick={() => valueHistoryAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddHistoryValueForm
          formRef={valueHistoryAdd.formRef}
          onSubmit={valueHistoryAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={valueHistoryEdit.close}
        maskClosable={false}
        title="Edit Value"
        visible={valueHistoryEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={valueHistoryEdit.close}>Cancel</Button>
              <Button
                loading={valueHistoryEdit.isLoading}
                type="primary"
                onClick={() => valueHistoryEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {valueHistoryEdit.selectedHistoryValue && (
          <EditHistoryValueForm
            valueHistory={valueHistoryEdit.selectedHistoryValue}
            formRef={valueHistoryEdit.formRef}
            onSubmit={valueHistoryEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
      <Drawer
        width={640}
        onClose={tradeHistoryAdd.close}
        maskClosable={false}
        title="Add Trade"
        visible={tradeHistoryAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={tradeHistoryAdd.close}>Cancel</Button>
              <Button
                loading={tradeHistoryAdd.isLoading}
                type="primary"
                onClick={() => tradeHistoryAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddTradeForm
          formRef={tradeHistoryAdd.formRef}
          onSubmit={tradeHistoryAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={tradeHistoryEdit.close}
        maskClosable={false}
        title="Edit Trade"
        visible={tradeHistoryEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={tradeHistoryEdit.close}>Cancel</Button>
              <Button
                loading={tradeHistoryEdit.isLoading}
                type="primary"
                onClick={() => tradeHistoryEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {tradeHistoryEdit.selectedHistoryValue && (
          <EditTradeForm
            trade={tradeHistoryEdit.selectedHistoryValue}
            formRef={tradeHistoryEdit.formRef}
            onSubmit={tradeHistoryEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
      <Drawer
        width={640}
        onClose={etfInstrumentEdit.close}
        maskClosable={false}
        title="Edit ETF Instrument"
        visible={etfInstrumentEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={etfInstrumentEdit.close}>Cancel</Button>
              <Button
                loading={etfInstrumentEdit.isLoading}
                type="primary"
                onClick={() => etfInstrumentEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {query.data && (
          <EditEtfInstrumentForm
            etfInstrument={query.data}
            formRef={etfInstrumentEdit.formRef}
            onSubmit={etfInstrumentEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default EtfInstrumentDetailPage;
