import { AxiosError, AxiosResponse } from 'axios';
import { authClient } from './AxiosClient';
import { API_URLS } from '../constant/config';

type UserInput = {
  email: string;
  password: string;
};

async function signInAPI({ email, password }: UserInput) {
  try {
    const res: AxiosResponse<{ access_token: string; refresh_token: string }> =
      await authClient.post(API_URLS.SIGN_IN, {
        email,
        password,
      });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

async function signUpAPI({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await authClient.post(API_URLS.SIGN_UP, {
      email,
      password,
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

/**
 * - access_token을 갱신하는 함수
 * - API 명세의 요구에 맞춰 authClient 중 유일하게 header를 활용하고 refresh token으로 설정
 * - Jotai Storage로 set하고 난 후에는 큰따옴표(`"`)로 감싸져있기 때문에 slice가 필요
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
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    localStorage.setItem('accessToken', `${access_token}`);

    return access_token;
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

export { signInAPI, signUpAPI, refreshAccessAPI };
