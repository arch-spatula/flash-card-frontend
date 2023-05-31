import type { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { cardHandlers } from './cardHandlers';
import { authHandlers } from './authHandlers';

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...cardHandlers,
  ...authHandlers,
];
