import { describe, expect, it } from 'vitest';
import { getCardsAPI, signInAPI } from '.';
import { STORAGE_KEY } from '@/constant/config';

describe('', () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
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

    expect(cards).toEqual([
      {
        _id: '1234asdf',
        question: '도큐사우르스 짱짱맨',
        answer: '킹정',
        submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
        stackCount: '0',
        userId: '1234asdf',
      },
      {
        _id: '1234qwer',
        question: '블로그를 더 간지나게 만드는 방법',
        answer: 'github pages로 DIY로 만든다.',
        submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
        stackCount: '0',
        userId: '1234asdf',
      },
    ]);
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
    expect(cards).toEqual([
      {
        _id: '1234asdf',
        question: '도큐사우르스 짱짱맨',
        answer: '킹정',
        submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
        stackCount: '0',
        userId: '1234asdf',
      },
      {
        _id: '1234qwer',
        question: '블로그를 더 간지나게 만드는 방법',
        answer: 'github pages로 DIY로 만든다.',
        submitDate: 'Wed May 17 2023 21:11:26 GMT+0900 (한국 표준시)',
        stackCount: '0',
        userId: '1234asdf',
      },
    ]);
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
