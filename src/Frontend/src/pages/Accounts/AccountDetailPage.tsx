import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { Box, DeleteConfirm, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCurrenciesQuery } from '../Currencies/queries';
import AccountDetailChart from './components/AccountDetailChart';
import AccountInfo from './components/AccountInfo';
import AccountValueHistoryTable from './components/AccountValueHistoryTable';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import EditAccountForm from './components/EditAccountForm';
import EditHistoryValueForm from './components/EditHistoryValueForm';
import MissingCurrencyRateWarning from './components/MissingCurrencyRateWarning';
import { useAccountDetailQuery } from './queries';
import { useAccountDelete } from './useAccountDelete';
import { useAccountEdit } from './useAccountEdit';
import { useAccountValueHistoryAdd } from './useAccountValueHistoryAdd';
import { useAccountValueHistoryDelete } from './useAccountValueHistoryDelete';
import { useAccountValueHistoryEdit } from './useAccountValueHistoryEdit';

const { TabPane } = Tabs;

interface Props {}

interface PageParams {
  id: string;
}

const AccountDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();

  const id = parseInt(params.id, 10);

  const currenciesQuery = useCurrenciesQuery();
  const accountEdit = useAccountEdit(id);
  const accountDelete = useAccountDelete(id);
  const accountValueHistoryAdd = useAccountValueHistoryAdd(id);
  const accountValueHistoryEdit = useAccountValueHistoryEdit(id);
  const accountValueHistoryDelete = useAccountValueHistoryDelete(id);
  const query = useAccountDetailQuery(id);

  const currency = query.data && currenciesQuery.data?.find((x) => x.id === query.data.currencyId);

  return (
    <PageWrapper
      title={query.data?.name || 'Account Detail'}
      subtitle={query.data?.category}
      goBack={() => history.goBack()}
      extra={
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={accountEdit.open}>
            Edit
          </Button>
          <DeleteConfirm onDelete={accountDelete.onDelete}>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </DeleteConfirm>
        </Space>
      }
    >
      <QueryWrapper
        query={query}
        render={(account) => (
          <>
            <AccountInfo account={account} currency={currency} />
            <MissingCurrencyRateWarning account={account} currency={currency} />
            <Box>
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
            </Box>
          </>
        )}
      />
      <Drawer
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
      </Drawer>
      <Drawer
        width={640}
        onClose={accountEdit.close}
        maskClosable={false}
        title="Edit Account"
        visible={accountEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={accountEdit.close}>Cancel</Button>
              <Button
                loading={accountEdit.isLoading}
                type="primary"
                onClick={() => accountEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {query.data && (
          <EditAccountForm
            account={query.data}
            formRef={accountEdit.formRef}
            onSubmit={accountEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default AccountDetailPage;
