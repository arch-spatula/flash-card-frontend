import type { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { cardHandlers } from './cardHandlers';
import { authHandlers } from './authHandlers';

const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  ...cardHandlers,
  ...authHandlers,
];

export default handlers;
