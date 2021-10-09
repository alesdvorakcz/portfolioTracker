import { Button, Drawer, Space } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import { FlexRow, PageWrapper, QueryWrapper } from '../../components';
import AccountInfo from './components/AccountInfo';
import AccountValueHistoryTable from './components/AccountValueHistoryTable';
import AddHistoryValueForm from './components/AddHistoryValueForm';
import EditAccountForm from './components/EditAccountForm';
import EditHistoryValueForm from './components/EditHistoryValueForm';
import { useAccountDetailQuery } from './queries';
import { useAccountEdit } from './useAccountEdit';
import { useAccountValueHistoryAdd } from './useAccountValueHistoryAdd';
import { useAccountValueHistoryEdit } from './useAccountValueHistoryEdit';

interface Props {}

interface PageParams {
  id: string;
}

const AccountDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();

  const id = parseInt(params.id, 10);

  const accountEdit = useAccountEdit(id);
  const accountValueHistoryAdd = useAccountValueHistoryAdd(id);
  const accountValueHistoryEdit = useAccountValueHistoryEdit(id);
  const query = useAccountDetailQuery(id);

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
            <AccountInfo account={account} onEditClick={accountEdit.open} />
            <AccountValueHistoryTable
              account={account}
              onAddClick={accountValueHistoryAdd.open}
              onEditClick={accountValueHistoryEdit.open}
            />
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
