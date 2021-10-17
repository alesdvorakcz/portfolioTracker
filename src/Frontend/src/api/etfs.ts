import axios from 'axios';

import { ROOT } from './config';
import {
  EtfInstrument,
  EtfInstrumentDetail,
  EtfInstrumentToAdd,
  EtfInstrumentToEdit,
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

const etfsClient = {
  getEtfInstruments,
  getEtfInstrumentDetail,
  addEtfInstrument,
  editEtfInstrument,
  deleteEtfInstrument,
};

export default etfsClient;
