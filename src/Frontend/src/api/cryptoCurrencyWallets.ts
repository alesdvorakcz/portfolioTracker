import axios from 'axios';

import { ROOT } from './config';
import {
  CryptoCurrencyTradeToAdd,
  CryptoCurrencyTradeToEdit,
  CryptoCurrencyWallet,
  CryptoCurrencyWalletDetail,
  CryptoCurrencyWalletToAdd,
  CryptoCurrencyWalletToEdit,
} from './models';

const getCryptoCurrencyWallets = async () => {
  const result = await axios.get<CryptoCurrencyWallet[]>(`${ROOT}CryptoCurrencyWallet`);
  return result.data;
};

const getCryptoCurrencyWalletDetail = async (id: number) => {
  const result = await axios.get<CryptoCurrencyWalletDetail>(`${ROOT}CryptoCurrencyWallet/${id}`);
  return result.data;
};

const addCryptoCurrencyWallet = async (wallet: CryptoCurrencyWalletToAdd) => {
  await axios.post<CryptoCurrencyWalletToAdd>(`${ROOT}CryptoCurrencyWallet/`, wallet);
};

const editCryptoCurrencyWallet = async (id: number, wallet: CryptoCurrencyWalletToEdit) => {
  await axios.put<CryptoCurrencyWalletToEdit>(`${ROOT}CryptoCurrencyWallet/${id}`, wallet);
};

const deleteCryptoCurrencyWallet = async (id: number) => {
  await axios.delete(`${ROOT}CryptoCurrencyWallet/${id}`);
};

const addTrade = async (walletId: number, trade: CryptoCurrencyTradeToAdd) => {
  const result = await axios.post<CryptoCurrencyTradeToAdd>(
    `${ROOT}CryptoCurrencyWallet/${walletId}/Trade`,
    trade
  );
  return result.data;
};

const editTrade = async (walletId: number, tradeId: number, trade: CryptoCurrencyTradeToEdit) => {
  const result = await axios.put<CryptoCurrencyTradeToEdit>(
    `${ROOT}CryptoCurrencyWallet/${walletId}/Trade/${tradeId}`,
    trade
  );
  return result.data;
};

const deleteTrade = async (walletId: number, tradeId: number) => {
  await axios.delete(`${ROOT}CryptoCurrencyWallet/${walletId}/Trade/${tradeId}`);
};

const cryptoCurrencyWalletsClient = {
  getCryptoCurrencyWallets,
  getCryptoCurrencyWalletDetail,
  addCryptoCurrencyWallet,
  editCryptoCurrencyWallet,
  deleteCryptoCurrencyWallet,
  addTrade,
  editTrade,
  deleteTrade,
};

export default cryptoCurrencyWalletsClient;
