import { AxiosError, AxiosResponse } from 'axios';
import axiosClient from './AxiosClient';
import { API_URLS, BASE_URL } from '../constant/config';

async function signInAPI(email: string, password: string) {
  try {
    const res: AxiosResponse<{ email: string }> = await axiosClient.post(
      BASE_URL + API_URLS.SIGN_IN,
      {
        email,
        password,
      }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

async function signUpAPI(email: string, password: string) {
  try {
    const res = await axiosClient.post(BASE_URL + API_URLS.SIGN_UP, {
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

async function signOutAPI() {
  try {
    const res: AxiosResponse<null> = await axiosClient.post(
      BASE_URL + API_URLS.SIGN_OUT
    );
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

export { signInAPI, signUpAPI, signOutAPI };
