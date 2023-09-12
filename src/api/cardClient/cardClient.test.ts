import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createCardsAPI, deleteCardsAPI, getCardsAPI, updateCardsAPI } from '.';
import { cards } from '@/mocks/fixture';
import { emptyStorage, grantAccess } from '@/utils';

describe('cardClient - signup', () => {
  beforeAll(() => {
    grantAccess();
  });

  afterAll(() => {
    emptyStorage();
  });

  it('should get cards', async () => {
    const res = await getCardsAPI();

    expect(res).toEqual(cards.documents);
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
