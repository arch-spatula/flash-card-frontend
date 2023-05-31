import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/config';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
