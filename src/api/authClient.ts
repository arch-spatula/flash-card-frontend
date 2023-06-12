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

async function signUpAPI(email: string, password: string) {
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

export { signInAPI, signUpAPI };
