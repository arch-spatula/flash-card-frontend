import axios, { AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'react-router-dom';
import { authClient } from '../AxiosClient';
import { API_URLS, ROUTE_PATHS, STORAGE_KEY } from '@/constant/config';

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

async function signUpAPI({ email, password }: UserInput) {
  try {
    const res = await authClient.post<null>(API_URLS.SIGN_UP, {
      email,
      password,
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) return error.response;
  }
}

async function checkEmailAPI(email: string) {
  try {
    const res = await authClient.post<null>(API_URLS.CHECK_EMAIL, { email });
    return res;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) throw error.response;
  }
}

async function deleteUserAPI() {
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  try {
    const res = await authClient.delete<null>(API_URLS.WITHDRAWAL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) throw error.response;
  }
}

/** - API 명세의 요구사항 때문에 authClient 중 유일하게 header를 활용해야 함 */
async function refreshAccessAPI() {
  try {
    const sessionToken = sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN);
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

    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, `${access_token}`);

    return access_token;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    redirect(ROUTE_PATHS.SIGN_IN);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

export { signInAPI, signUpAPI, refreshAccessAPI, checkEmailAPI, deleteUserAPI };
