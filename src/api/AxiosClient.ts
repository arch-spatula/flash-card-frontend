import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import { API_URLS, BASE_URL } from '../constant/config';

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

/**
 * - access_token을 갱신하는 함수
 * - 함수 아래 interceptors만 의존해야 하기 때문에 export하지 않음
 * - API 명세의 요구에 맞춰 header를 활용하고 refresh token을 설정
 */
async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) throw Error('sessionToken');

    const {
      data: { access_token },
    } = await authClient.post<{
      success: boolean;
      access_token: string;
    }>(API_URLS.REFRESH, null, {
      headers: {
        Authorization: `Bearer ${sessionToken.slice(
          1,
          sessionToken.length - 1
        )}`,
      },
    });

    localStorage.setItem('accessToken', `"${access_token}"`);

    return access_token;
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

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
