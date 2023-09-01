import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createCardsAPI, deleteCardsAPI, getCardsAPI, updateCardsAPI } from '.';
import { STORAGE_KEY } from '@/constant/config';

describe('cardClient - signup', () => {
  beforeAll(() => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'token');
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should get cards', async () => {
    const res = await getCardsAPI();

    expect(res).toEqual([
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

  it('should create a card', async () => {
    const newCard = {
      question: '1을 입력하시오',
      answer: '1',
      submitDate: new Date(),
      stackCount: 0,
    };

    const res = await createCardsAPI(newCard);

    expect(res).toBe('1234asdf');
  });

  it('should update a card', async () => {
    const updateCard = {
      question: '2를 입력하시오',
      answer: '2',
      submitDate: new Date(),
      stackCount: 0,
    };

    const res = await updateCardsAPI({
      id: '1234asdf',
      card: updateCard,
    });
    expect(res?.status).toBe(200);
    expect(res?.data).toEqual({ matchedCount: 1, modifiedCount: 1 });
  });

  it('should delete a card', async () => {
    const res = await deleteCardsAPI('1234asdf');
    expect(res?.status).toBe(204);
    expect(res?.data).toBe(null);
  });
});
