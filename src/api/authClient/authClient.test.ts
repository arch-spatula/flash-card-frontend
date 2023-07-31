import { describe, expect, it } from 'vitest';
import { signUpAPI } from '.';

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
