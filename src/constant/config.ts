export const BASE_URL = 'https://flash-card-backend.deno.dev/api';

export const API_URLS = {
  CARDS: '/card',
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  SIGN_OUT: '/auth/signout',
} as const;

export const ROUTE_PATHS = {
  WELCOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CARDS: '/cards',
  DECK: '/deck',
  SETTING: '/setting',
} as const;
