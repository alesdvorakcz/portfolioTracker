import { Button, Drawer, Space } from 'antd';
import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import apiClient from '../../api';
import { AccountValueHistory } from '../../api/models';
import { PageWrapper, QueryWrapper } from '../../components';
import AccountInfo from './components/AccountInfo';
import AccountValueHistoryTable from './components/AccountValueHistoryTable';
import EditAccountForm, { FormValues } from './components/EditAccountForm';
import EditHistoryValueForm from './components/EditHistoryValueForm';

interface Props {}

interface PageParams {
  id?: string;
}

const AccountDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();
  const [isEditHistoryValueVisible, setIsEditHistoryValueVisible] = useState(false);
  const [isEditAccountVisible, setIsEditAccountVisible] = useState(false);
  const [selectedHistoryValue, setSelectedHistoryValue] = useState<AccountValueHistory | undefined>(
    undefined
  );
  const formRef = useRef<FormikProps<FormValues>>(null);

  const id = parseInt(params.id!, 10);

  const query = useQuery(['account', id], () => apiClient.accounts.getAccountDetail(id));

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
            <AccountInfo account={account} onEditClick={() => setIsEditAccountVisible(true)} />
            <AccountValueHistoryTable
              account={account}
              onEditClick={(item) => {
                setSelectedHistoryValue(item);
                setIsEditHistoryValueVisible(true);
              }}
            />
          </>
        )}
      />
      <Drawer
        width={640}
        onClose={() => {
          setIsEditHistoryValueVisible(false);
          setSelectedHistoryValue(undefined);
        }}
        maskClosable={false}
        title="Edit Value"
        destroyOnClose
        visible={isEditHistoryValueVisible}
      >
        {selectedHistoryValue && <EditHistoryValueForm />}
      </Drawer>
      <Drawer
        width={640}
        onClose={() => setIsEditAccountVisible(false)}
        maskClosable={false}
        title="Edit Account"
        visible={isEditAccountVisible}
        destroyOnClose
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
              <Button onClick={() => setIsEditAccountVisible(false)}>Cancel</Button>
              <Button type="primary" onClick={() => formRef.current?.submitForm()}>
                Save
              </Button>
            </Space>
          </div>
        }
      >
        {query.data && <EditAccountForm account={query.data} formRef={formRef} hideSubmitButton />}
      </Drawer>
    </PageWrapper>
  );
};

export default AccountDetailPage;
