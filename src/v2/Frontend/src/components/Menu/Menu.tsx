import {
  BankOutlined,
  DashboardOutlined,
  EuroOutlined,
  FundOutlined,
  ImportOutlined,
  PayCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
  pattern: string;
  icon: string;
}

const menuStructure: MenuItem[] = [
  { label: 'Dashboard', path: '/', pattern: '/', icon: 'DashboardOutlined' },
  // { label: 'Accounts', path: '/accounts', icon: 'BankOutlined' },
  // { label: 'Crypto Wallets', path: '/cryptoWallets', icon: 'WalletOutlined' },
  { label: 'ETFs', path: '/etfs', pattern: '/etfs*', icon: 'FundOutlined' },
  { label: 'Currencies', path: '/currencies', pattern: '/currencies*', icon: 'EuroOutlined' },
  { label: 'Crypto', path: '/cryptos', pattern: '/cryptos*', icon: 'PayCircleOutlined' },
  { label: 'Import', path: '/import', pattern: '/import*', icon: 'ImportOutlined' },
];

const getIcon = (item: MenuItem) => {
  if (item.icon === 'DashboardOutlined') return <DashboardOutlined />;
  if (item.icon === 'BankOutlined') return <BankOutlined />;
  if (item.icon === 'FundOutlined') return <FundOutlined />;
  if (item.icon === 'EuroOutlined') return <EuroOutlined />;
  if (item.icon === 'PayCircleOutlined') return <PayCircleOutlined />;
  if (item.icon === 'WalletOutlined') return <WalletOutlined />;
  if (item.icon === 'ImportOutlined') return <ImportOutlined />;
  return <BankOutlined />;
};

const getActive = (currentPage: string): MenuItem | undefined => {
  const active = menuStructure.find((x) => {
    const match = matchPath(x.pattern, currentPage);

    return match !== null;
  });

  return active;
};

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = getActive(location.pathname);
  const selectedKeys = activePage ? [activePage.path] : [];

  return (
    <AntMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      onClick={(e) => navigate(e.key)}
    >
      {menuStructure.map((item) => {
        return (
          <AntMenu.Item key={item.path} icon={getIcon(item)}>
            {item.label}
          </AntMenu.Item>
        );
      })}
    </AntMenu>
  );
};

export default Menu;
