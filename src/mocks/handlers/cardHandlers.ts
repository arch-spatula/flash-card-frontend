import { rest } from 'msw';
import { API_URLS, BASE_URL, STORAGE_KEY } from '../../constant/config';

const cards = {
  documents: [
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
  ],
};

export const getCards = rest.get(BASE_URL + API_URLS.CARDS, (_, res, ctx) => {
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  if (accessToken === 'expired') return res(ctx.status(401));
  return res(ctx.status(200), ctx.json(cards));
});

export const createCard = rest.post(
  BASE_URL + API_URLS.CARDS,
  (_, res, ctx) => {
    return res(ctx.status(201), ctx.json({ insertedId: '1234asdf' }));
  }
);

export const updateCard = rest.patch(
  BASE_URL + API_URLS.CARDS + '/:id',
  (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        matchedCount: 1,
        modifiedCount: 1,
      })
    );
  }
);

export const deleteCard = rest.delete(
  BASE_URL + API_URLS.CARDS + '/:id',
  (_, res, ctx) => {
    return res(ctx.status(204), ctx.json(null));
  }
);
