import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { DeleteConfirm, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCurrenciesQuery } from '../Currencies/queries';
import EditEtfInstrumentForm from './components/EditEtfInstrumentForm';
import EtfInstrumentInfo from './components/EtfInstrumentInfo';
import { useEtfInstrumentDetailQuery } from './queries';
import { useEtfInstrumentDelete } from './useEtfInstrumentDelete';
import { useEtfInstrumentEdit } from './useEtfInstrumentEdit';

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
            {/*<Box>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Table" key="1">
                  <AccountValueHistoryTable
                    account={account}
                    currency={currency}
                    onAddClick={accountValueHistoryAdd.open}
                    onEditClick={accountValueHistoryEdit.open}
                    onDeleteClick={accountValueHistoryDelete.onDelete}
                  />
                </TabPane>
                <TabPane tab="Chart" key="2">
                  <AccountDetailChart account={account} currency={currency} />
                </TabPane>
              </Tabs>
            </Box> */}
          </>
        )}
      />
      {/* <Drawer
        width={640}
        onClose={accountValueHistoryAdd.close}
        maskClosable={false}
        title="Add Value"
        visible={accountValueHistoryAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={accountValueHistoryAdd.close}>Cancel</Button>
              <Button
                loading={accountValueHistoryAdd.isLoading}
                type="primary"
                onClick={() => accountValueHistoryAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddHistoryValueForm
          formRef={accountValueHistoryAdd.formRef}
          onSubmit={accountValueHistoryAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={accountValueHistoryEdit.close}
        maskClosable={false}
        title="Edit Value"
        visible={accountValueHistoryEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={accountValueHistoryEdit.close}>Cancel</Button>
              <Button
                loading={accountValueHistoryEdit.isLoading}
                type="primary"
                onClick={() => accountValueHistoryEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {accountValueHistoryEdit.selectedHistoryValue && (
          <EditHistoryValueForm
            valueHistory={accountValueHistoryEdit.selectedHistoryValue}
            formRef={accountValueHistoryEdit.formRef}
            onSubmit={accountValueHistoryEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer> */}
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
