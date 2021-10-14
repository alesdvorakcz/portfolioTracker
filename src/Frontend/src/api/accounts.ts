import axios, { AxiosResponse } from 'axios';

import { ROOT } from './config';
import {
  Account,
  AccountDetail,
  AccountToAdd,
  AccountToEdit,
  AccountValueHistory,
  AccountValueHistoryToAdd,
  AccountValueHistoryToEdit,
  GetAllAccountsResult,
} from './models';

const getAccounts = async () => {
  const result = await axios.get<GetAllAccountsResult>(`${ROOT}Account`);
  return result.data;
};

const getAccountDetail = async (id: number) => {
  const result = await axios.get<AccountDetail>(`${ROOT}Account/${id}`);
  return result.data;
};

const addAccount = async (account: AccountToAdd) => {
  const result = await axios.post<AccountToAdd, AxiosResponse<Account>>(`${ROOT}Account/`, account);
  return result.data;
};

const editAccount = async (id: number, account: AccountToEdit) => {
  const result = await axios.put<AccountToEdit, AxiosResponse<Account>>(
    `${ROOT}account/${id}`,
    account
  );
  return result.data;
};

const deleteAccount = async (id: number) => {
  await axios.delete(`${ROOT}Account/${id}`);
};

const addValueToAccountHistory = async (accountId: number, value: AccountValueHistoryToAdd) => {
  const result = await axios.post<AccountValueHistoryToAdd, AxiosResponse<AccountValueHistory>>(
    `${ROOT}Account/${accountId}/History`,
    value
  );
  return result.data;
};

const editValueFromAccountHistory = async (
  accountId: number,
  valueHistoryId: number,
  value: AccountValueHistoryToEdit
) => {
  const result = await axios.put<AccountValueHistoryToEdit, AxiosResponse<AccountValueHistory>>(
    `${ROOT}Account/${accountId}/History/${valueHistoryId}`,
    value
  );
  return result.data;
};

const deleteValueFromAccountHistory = async (accountId: number, valueHistoryId: number) => {
  await axios.delete(`${ROOT}Account/${accountId}/History/${valueHistoryId}`);
};

const accountsClient = {
  getAccounts,
  getAccountDetail,
  addAccount,
  editAccount,
  deleteAccount,
  addValueToAccountHistory,
  editValueFromAccountHistory,
  deleteValueFromAccountHistory,
};

export default accountsClient;
