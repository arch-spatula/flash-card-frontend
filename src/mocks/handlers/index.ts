import type { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import * as cardHandlers from './cardHandlers';
import * as authHandlers from './authHandlers';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...Object.values(cardHandlers),
  ...Object.values(authHandlers),
];
