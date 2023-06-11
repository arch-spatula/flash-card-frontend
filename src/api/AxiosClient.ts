import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_URL } from '../constant/config';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    const configCopy = { ...config };
    if (token)
      configCopy.headers.Authorization = `Bearer ${token.slice(
        1,
        token.length - 1
      )}`;
    else throw new Error('token이 없습니다.');

    return configCopy;
  },
  (error) => Promise.reject(error)
);

export { axiosClient, authClient };
