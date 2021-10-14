import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Row, Space, Statistic } from 'antd';

import { Box, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../i18n';
import { useCurrenciesQuery } from '../Currencies/queries';
import AccountList from './components/AccountList';
import AddAccountForm from './components/AddAccountForm';
import { useAccountsQuery } from './queries';
import { useAccountAdd } from './useAccountAdd';

interface Props {}

const AccountsPage: React.FC<Props> = () => {
  const currenciesQuery = useCurrenciesQuery();
  const query = useAccountsQuery();
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
      <QueryWrapper
        query={query}
        render={(data) => {
          const gain =
            data.totalValueCZK && data.totalTransactionsCZK
              ? data.totalValueCZK / data.totalTransactionsCZK - 1
              : null;

          const isGainPositive = gain && gain > 0;

          return (
            <>
              {data.totalValueCZK && (
                <Box>
                  <Row>
                    <Col md={8}>
                      <Statistic
                        title="Total Value"
                        value={data.totalValueCZK?.toLocaleString(DEFAULT_LOCALE, {
                          style: 'currency',
                          currency: DEFAULT_CURRENCY,
                        })}
                      />
                    </Col>
                    <Col md={8}>
                      <Statistic
                        title="Total Transactions"
                        value={data.totalTransactionsCZK?.toLocaleString(DEFAULT_LOCALE, {
                          style: 'currency',
                          currency: DEFAULT_CURRENCY,
                        })}
                      />
                    </Col>
                    <Col md={8}>
                      <Statistic
                        title="Profit"
                        prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
                        value={
                          gain?.toLocaleString(DEFAULT_LOCALE, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                          }) ?? '???'
                        }
                      />
                    </Col>
                  </Row>
                </Box>
              )}
              <AccountList accounts={data.accounts} currencies={currenciesQuery.data} />
            </>
          );
        }}
      />
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
