import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/conversion-rate';

interface HistoricalRate {
  _id: string;
  timestamp: string;
  rate: number;
}

export const fetchCurrentRate = async () => {
  const response = await axios.get(`${API_BASE_URL}/current`)
  return response.data.rate;
}

export const fetchHistoricalRates = async (): Promise<HistoricalRate[]> => {
  const response = await axios.get(`${API_BASE_URL}/history`);
  return response.data;
};