import { describe, expect, it } from 'vitest';
import { getCardsAPI, signInAPI } from '.';
import { STORAGE_KEY } from '@/constant/config';
import { cards as cardsMock } from '@/mocks/fixture';
import { emptyStorage } from '@/utils';

describe('', () => {
  afterEach(() => {
    emptyStorage();
  });

  it('should be able to access cards by token', async () => {
    // 로그인에 성공하고
    const { access_token, refresh_token } = await signInAPI({
      email: 'username@email.com',
      password: '12345678',
    });
    // 토큰을 저장하고
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, access_token);
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, refresh_token);
    // 리소스를 요청
    const cards = await getCardsAPI();

    expect(cards).toEqual(cardsMock.documents);
  });

  it('should refresh token and try again', async () => {
    // 로그인으로 refresh token을 받고 저장
    const { refresh_token } = await signInAPI({
      email: 'username@email.com',
      password: '12345678',
    });
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'expired'); // 만료된 토큰
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, refresh_token);

    // 만료응답을 받고 자동 갱신
    const cards = await getCardsAPI();

    // 자동 갱신 후 재 요청
    expect(cards).toEqual(cardsMock.documents);
    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).not.toBe('expired');
  });

  it('should empty all token when refresh is expired', async () => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'expired'); // access가 만료된 토큰
    sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, ''); // refresh가 만료된 토큰

    await getCardsAPI();

    expect(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)).toBe(null);
    expect(sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN)).toBe(null);
  });
});
