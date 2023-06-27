import { STORAGE_KEY } from '@/constant/config';
import { describe, it } from 'vitest';
import { checkLogin } from '.';

describe('checkLogin', () => {
  it('should have both token', () => {
    const token = 'token';
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, token);
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token);

    expect(checkLogin()).toBe(true);
  });

  it('should not have both token', () => {
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);

    expect(checkLogin()).toBe(false);
  });

  afterEach(() => {
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  });
});
