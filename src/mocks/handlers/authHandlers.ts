import { rest } from 'msw';
import { API_URLS, BASE_URL } from '@/constant/config';

export const signUp = rest.post(BASE_URL + API_URLS.SIGN_UP, (_, res, ctx) => {
  return res(ctx.status(201), ctx.json({ insertedId: '123abc' }));
});

export const signIn = rest.post(BASE_URL + API_URLS.SIGN_IN, (_, res, ctx) => {
  return res(ctx.status(201), ctx.json({ email: 'username@user.com' }));
});
