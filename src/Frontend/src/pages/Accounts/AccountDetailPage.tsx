import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { Box, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCurrenciesQuery } from '../Currencies/queries';
import AccountInfo from './components/AccountInfo';
import AccountValueHistoryTable from './components/AccountValueHistoryTable';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import EditAccountForm from './components/EditAccountForm';
import EditHistoryValueForm from './components/EditHistoryValueForm';
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
      subtitle="Account Detail"
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(account) => (
          <>
            <AccountInfo
              account={account}
              currency={currency}
              onEditClick={accountEdit.open}
              onDeleteClick={accountDelete.onDelete}
            />
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
                  Here will be dragons
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
