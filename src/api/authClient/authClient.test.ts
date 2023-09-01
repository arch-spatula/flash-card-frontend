import { describe, expect, it } from 'vitest';
import { signInAPI, signUpAPI } from '.';

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
