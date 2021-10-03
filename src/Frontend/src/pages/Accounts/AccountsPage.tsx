import { PageWrapper } from '../../components';
import AccountList from './components/AccountList';

interface Props {}

const AccountsPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Accounts">
      <AccountList />
    </PageWrapper>
  );
};

export default AccountsPage;
