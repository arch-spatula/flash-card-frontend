import { afterAll, describe, expect, it } from 'vitest';
import { refreshAccessAPI, signInAPI, signUpAPI } from '.';
import { STORAGE_KEY } from '@/constant/config';

describe('authClient - signup', () => {
  it('should fail because of overlapping email', async () => {
    const res = await signUpAPI({
      email: 'username@email.com',
      password: '1234qwer',
    });

    expect(res?.status).toBe(400);
    expect(res?.data).toEqual({
      success: false,
      msg: 'Error: 이미 가입한 아이디입니다. username@email.com',
    });
  });

  it('should give success for non overlapping email', async () => {
    const res = await signUpAPI({
      email: 'nouser@email.com',
      password: '1234qwer',
    });

    expect(res?.status).toBe(201);
  });
});

describe('sign in', () => {
  it('should be able to sign in and return tokens', async () => {
    const res = await signInAPI({
      email: 'username@email.com',
      password: '12345678',
    });

    expect(res).toEqual({
      success: true,
      access_token: 'asdf1234',
      refresh_token: 'qwer6789',
    });
  });
});

describe('refresh access', () => {
  afterAll(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should refresh access token', async () => {
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, 'token');

    const res = await refreshAccessAPI();

    expect(res).toBe('zxcv9876');
    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toBe('zxcv9876');
  });

  it('should empty storages by token keys when there is no session token', async () => {
    sessionStorage.clear();
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'token');

    await refreshAccessAPI();

    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toBe(null);
    expect(sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN)).toBe(null);
  });
});
