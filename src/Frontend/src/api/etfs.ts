import axios from 'axios';

import { ROOT } from './config';
import {
  EtfInstrument,
  EtfInstrumentDetail,
  EtfInstrumentToAdd,
  EtfInstrumentToEdit,
  EtfInstrumentValueHistoryToAdd,
  EtfInstrumentValueHistoryToEdit,
  EtfTradeHistoryToAdd,
  EtfTradeHistoryToEdit,
} from './models';

const getEtfInstruments = async () => {
  const result = await axios.get<EtfInstrument[]>(`${ROOT}EtfInstrument`);
  return result.data;
};

const getEtfInstrumentDetail = async (id: number) => {
  const result = await axios.get<EtfInstrumentDetail>(`${ROOT}EtfInstrument/${id}`);
  return result.data;
};

const addEtfInstrument = async (etf: EtfInstrumentToAdd) => {
  await axios.post<EtfInstrumentToAdd>(`${ROOT}EtfInstrument/`, etf);
};

const editEtfInstrument = async (id: number, etf: EtfInstrumentToEdit) => {
  await axios.put<EtfInstrumentToEdit>(`${ROOT}EtfInstrument/${id}`, etf);
};

const deleteEtfInstrument = async (id: number) => {
  await axios.delete(`${ROOT}EtfInstrument/${id}`);
};

const addTradeToEtfHistory = async (etfInstrumentId: number, trade: EtfTradeHistoryToAdd) => {
  await axios.post<EtfTradeHistoryToAdd>(`${ROOT}EtfInstrument/${etfInstrumentId}/trade`, trade);
};

const editTradeFromEtfHistory = async (
  etfInstrumentId: number,
  tradeId: number,
  trade: EtfTradeHistoryToEdit
) => {
  await axios.put<EtfTradeHistoryToEdit>(
    `${ROOT}EtfInstrument/${etfInstrumentId}/trade/${tradeId}`,
    trade
  );
};

const deleteTradeFromEtfHistory = async (etfInstrumentId: number, valueId: number) => {
  await axios.delete(`${ROOT}EtfInstrument/${etfInstrumentId}/trade/${valueId}`);
};

const addValueToEtfHistory = async (
  etfInstrumentId: number,
  value: EtfInstrumentValueHistoryToAdd
) => {
  await axios.post<EtfInstrumentValueHistoryToAdd>(
    `${ROOT}EtfInstrument/${etfInstrumentId}/history`,
    value
  );
};

const editValueFromEtfHistory = async (
  etfInstrumentId: number,
  valueId: number,
  value: EtfInstrumentValueHistoryToEdit
) => {
  await axios.put<EtfInstrumentValueHistoryToEdit>(
    `${ROOT}EtfInstrument/${etfInstrumentId}/history/${valueId}`,
    value
  );
};
const deleteValueFromEtfHistory = async (etfInstrumentId: number, valueId: number) => {
  await axios.delete(`${ROOT}EtfInstrument/${etfInstrumentId}/history/${valueId}`);
};

const historyImport = async (etfInstrumentId: number) => {
  await axios.put(`${ROOT}EtfInstrument/${etfInstrumentId}/history/import`);
};

const etfsClient = {
  getEtfInstruments,
  getEtfInstrumentDetail,
  addEtfInstrument,
  editEtfInstrument,
  deleteEtfInstrument,
  addTradeToEtfHistory,
  editTradeFromEtfHistory,
  deleteTradeFromEtfHistory,
  addValueToEtfHistory,
  editValueFromEtfHistory,
  deleteValueFromEtfHistory,
  historyImport,
};

export default etfsClient;
