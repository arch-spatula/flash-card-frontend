import { afterAll, describe, expect, it } from 'vitest';
import { checkEmailAPI, refreshAccessAPI, signInAPI, signUpAPI } from '.';
import { STORAGE_KEY } from '@/constant/config';
import { emptyStorage, grantAccess } from '@/utils';

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

  it('should fail when there is no signed up user', async () => {
    const res = await signInAPI({
      email: 'noone@email.com',
      password: 'qwer1234',
    });
    expect(res.msg).toBe('Error: 이메일이 없습니다.');
  });

  it('should fail when password does not match', async () => {
    const res = await signInAPI({
      email: 'username@email.com',
      password: 'notMatchingPassword',
    });
    expect(res.msg).toBe('Error: 비밀번호가 일치하지 않습니다.');
  });
});

describe('refresh access', () => {
  afterAll(() => {
    emptyStorage();
  });

  it('should refresh access token', async () => {
    grantAccess();

    const res = await refreshAccessAPI();

    expect(res).toBe('zxcv9876');
    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toBe('zxcv9876');
  });

  it('should empty storages by token keys when there is no session token', async () => {
    grantAccess();
    sessionStorage.clear();

    await refreshAccessAPI();

    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toBe(null);
    expect(sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN)).toBe(null);
  });

  it('should not refresh when token is expired', async () => {
    grantAccess();
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, 'expired');

    const res = await refreshAccessAPI();

    expect(res).toEqual({
      success: false,
      msg: 'Error: expired',
    });
  });
});

describe('authClient - checkEmailAPI', () => {
  it('should return nothing when there is no duplication', async () => {
    const newUserEmail = 'newuser@email.com';

    const res = await checkEmailAPI(newUserEmail);

    expect(res?.status).toBe(204);
    expect(res?.data).toEqual(null);
  });

  it('should return error when there is duplication', async () => {
    const duplicateUserEmail = 'username@email.com';

    const res = await checkEmailAPI(duplicateUserEmail).catch((err) => err);

    expect(res?.status).toBe(409);
    expect(res?.data).toEqual({
      success: false,
      msg: 'Error: email Conflict',
    });
  });
});
