export const BASE_URL = 'https://flash-card-backend.deno.dev/api';

export const API_URLS = {
  CARDS: '/card',
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  REFRESH: '/auth/refresh',
} as const;

export const ROUTE_PATHS = {
  WELCOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CARDS: '/cards',
  DECK: '/deck',
  SETTING: '/setting',
} as const;

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  SESSION_TOKEN: 'sessionToken',
} as const;
