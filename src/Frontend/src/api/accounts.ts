import axios from 'axios';

interface Account {
  id: string;
  name: string;
}

export const getAccounts = async () => {
  const result = await axios.get<Account[]>('/account');
  return result.data;
};
