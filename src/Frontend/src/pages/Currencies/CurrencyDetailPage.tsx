import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { FlexRow, PageWrapper, QueryWrapper } from '../../components';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import CurrencyDetailChart from './components/CurrencyDetailChart';
import CurrencyInfo from './components/CurrencyInfo';
import CurrencyValueHistoryTable from './components/CurrencyValueHistoryTable';
import EditHistoryValueForm from './components/EditHistoryValueForm';
import { useCurrencyDetailQuery } from './queries';
import { useCurrencyValueHistoryAdd } from './useCurrencyValueHistoryAdd';
import { useCurrencyValueHistoryDelete } from './useCurrencyValueHistoryDelete';
import { useCurrencyValueHistoryEdit } from './useCurrencyValueHistoryEdit';

const { TabPane } = Tabs;

interface Props {}

interface PageParams {
  id: string;
}

const CurrencyDetailPage: React.FC<Props> = () => {
  const { id } = useParams<PageParams>();
  const history = useHistory();

  const query = useCurrencyDetailQuery(id);
  const currencyValueHistoryAdd = useCurrencyValueHistoryAdd(id);
  const currencyValueHistoryEdit = useCurrencyValueHistoryEdit(id);
  const deleteCurrencyValueHistory = useCurrencyValueHistoryDelete(id);

  return (
    <PageWrapper
      title={query.data?.name || 'Currency Detail'}
      subtitle="Currency Detail"
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(currency) => (
          <>
            <CurrencyInfo currency={currency} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CurrencyValueHistoryTable
                  currency={currency}
                  onAddClick={currencyValueHistoryAdd.open}
                  onEditClick={currencyValueHistoryEdit.open}
                  onDeleteClick={deleteCurrencyValueHistory.onDelete}
                />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CurrencyDetailChart currency={currency} />
              </TabPane>
            </Tabs>
          </>
        )}
      />
      <Drawer
        width={640}
        onClose={currencyValueHistoryAdd.close}
        maskClosable={false}
        title="Add Value"
        visible={currencyValueHistoryAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={currencyValueHistoryAdd.close}>Cancel</Button>
              <Button
                loading={currencyValueHistoryAdd.isLoading}
                type="primary"
                onClick={() => currencyValueHistoryAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddHistoryValueForm
          formRef={currencyValueHistoryAdd.formRef}
          onSubmit={currencyValueHistoryAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={currencyValueHistoryEdit.close}
        maskClosable={false}
        title="Edit Value"
        visible={currencyValueHistoryEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={currencyValueHistoryEdit.close}>Cancel</Button>
              <Button
                loading={currencyValueHistoryEdit.isLoading}
                type="primary"
                onClick={() => currencyValueHistoryEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {currencyValueHistoryEdit.selectedHistoryValue && (
          <EditHistoryValueForm
            valueHistory={currencyValueHistoryEdit.selectedHistoryValue}
            formRef={currencyValueHistoryEdit.formRef}
            onSubmit={currencyValueHistoryEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default CurrencyDetailPage;
