import { rest } from 'msw';
import { API_URLS, BASE_URL, STORAGE_KEY } from '../../constant/config';
import { cards } from '../fixture';

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
