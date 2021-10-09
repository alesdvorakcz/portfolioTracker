import { Button, Drawer, Space } from 'antd';

import { FlexRow, PageWrapper } from '../../components';
import AccountList from './components/AccountList';
import AddAccountForm from './components/AddAccountForm';
import { useAccountAdd } from './useAccountAdd';

interface Props {}

const AccountsPage: React.FC<Props> = () => {
  const accountAdd = useAccountAdd();
  return (
    <PageWrapper
      title="Accounts"
      extra={
        <Button type="primary" onClick={accountAdd.open}>
          Add Account
        </Button>
      }
    >
      <AccountList />
      <Drawer
        width={640}
        onClose={accountAdd.close}
        maskClosable={false}
        title="Add Account"
        visible={accountAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={accountAdd.close}>Cancel</Button>
              <Button
                loading={accountAdd.isLoading}
                type="primary"
                onClick={() => accountAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddAccountForm
          formRef={accountAdd.formRef}
          onSubmit={accountAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
    </PageWrapper>
  );
};

export default AccountsPage;
