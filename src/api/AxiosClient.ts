import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { API_URLS, BASE_URL } from '../constant/config';
import { refreshAccessAPI } from './authClient';

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

/** @see https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/ */
axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (config.url === API_URLS.REFRESH || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true;
    const accessToken = await refreshAccessAPI();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return axiosClient(config);
  }
);

export { axiosClient, authClient };
