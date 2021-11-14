import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router';

import { FlexRow, PageWrapper, QueryWrapper } from '../../components';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import CryptoCurrencyDetailChart from './components/CryptoCurrencyDetailChart';
import CryptoCurrencyInfo from './components/CryptoCurrencyInfo';
import CryptoCurrencyValueHistoryTable from './components/CryptoCurrencyValueHistoryTable';
import EditHistoryValueForm from './components/EditHistoryValueForm';
import { useCryptoCurrencyDetailQuery } from './queries';
import { useCryptoCurrencyValueHistoryAdd } from './useCryptoCurrencyValueHistoryAdd';
import { useCryptoCurrencyValueHistoryDelete } from './useCryptoCurrencyValueHistoryDelete';
import { useCryptoCurrencyValueHistoryEdit } from './useCryptoCurrencyValueHistoryEdit';

const { TabPane } = Tabs;

interface Props {}
interface PageParams {
  id: string;
}

const CryptoCurrencyDetailPage: React.FC<Props> = () => {
  const { id } = useParams<PageParams>();
  const history = useHistory();

  const query = useCryptoCurrencyDetailQuery(id);
  const addCryptoCurrencyValueHistory = useCryptoCurrencyValueHistoryAdd(id);
  const editCryptoCurrencyValueHistory = useCryptoCurrencyValueHistoryEdit(id);
  const deleteCryptoCurrencyValueHistory = useCryptoCurrencyValueHistoryDelete(id);

  return (
    <PageWrapper
      title={query.data?.name || 'Currency Currency Detail'}
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(cryptoCurrency) => (
          <>
            <CryptoCurrencyInfo cryptoCurrency={cryptoCurrency} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoCurrencyValueHistoryTable
                  cryptoCurrency={cryptoCurrency}
                  onAddClick={addCryptoCurrencyValueHistory.open}
                  onEditClick={editCryptoCurrencyValueHistory.open}
                  onDeleteClick={deleteCryptoCurrencyValueHistory.onDelete}
                />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CryptoCurrencyDetailChart cryptoCurrency={cryptoCurrency} />
              </TabPane>
            </Tabs>
          </>
        )}
      />
      <Drawer
        width={640}
        onClose={addCryptoCurrencyValueHistory.close}
        maskClosable={false}
        title="Add Value"
        visible={addCryptoCurrencyValueHistory.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={addCryptoCurrencyValueHistory.close}>Cancel</Button>
              <Button
                loading={addCryptoCurrencyValueHistory.isLoading}
                type="primary"
                onClick={() => addCryptoCurrencyValueHistory.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddHistoryValueForm
          formRef={addCryptoCurrencyValueHistory.formRef}
          onSubmit={addCryptoCurrencyValueHistory.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={editCryptoCurrencyValueHistory.close}
        maskClosable={false}
        title="Edit Value"
        visible={editCryptoCurrencyValueHistory.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={editCryptoCurrencyValueHistory.close}>Cancel</Button>
              <Button
                loading={editCryptoCurrencyValueHistory.isLoading}
                type="primary"
                onClick={() => editCryptoCurrencyValueHistory.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {editCryptoCurrencyValueHistory.selectedHistoryValue && (
          <EditHistoryValueForm
            valueHistory={editCryptoCurrencyValueHistory.selectedHistoryValue}
            formRef={editCryptoCurrencyValueHistory.formRef}
            onSubmit={editCryptoCurrencyValueHistory.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default CryptoCurrencyDetailPage;
