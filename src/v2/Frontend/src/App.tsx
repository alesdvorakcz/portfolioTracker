import './App.css';

import { Grid, Layout } from 'antd';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Menu } from './components';
import {
  AccountDetailPage,
  AccountsPage,
  CryptoDetailPage,
  CryptosPage,
  CryptoWalletDetailPage,
  CurrenciesPage,
  CurrencyDetailPage,
  DashboardPage,
  EtfDetailPage,
  EtfsPage,
  ImportPage,
} from './pages';

const { Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const screens = useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        defaultCollapsed={isCollapsed}
        onCollapse={(collapsed) => {
          setIsCollapsed(collapsed);
        }}
        collapsible={screens.md}
        breakpoint="md"
        collapsedWidth={!screens.md ? 0 : 50}
      >
        {isCollapsed ? (
          <div className="app-logo-collapsed">
            <span>PT</span>
          </div>
        ) : (
          <div className="app-logo">
            <span>Portfolio Tracker</span>
          </div>
        )}
        <Menu />
      </Sider>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="currencies" element={<CurrenciesPage />} />
          <Route path="currencies/:id" element={<CurrencyDetailPage />} />
          <Route path="etfs" element={<EtfsPage />} />
          <Route path="etfs/:id" element={<EtfDetailPage />} />
          <Route path="cryptos" element={<CryptosPage />} />
          <Route path="cryptos/wallet/:id" element={<CryptoWalletDetailPage />} />
          <Route path="cryptos/coins/:id" element={<CryptoDetailPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="accounts/:id" element={<AccountDetailPage />} />
          <Route path="import" element={<ImportPage />} />
        </Routes>
        <Footer style={{ textAlign: 'center' }}>Footer text</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
