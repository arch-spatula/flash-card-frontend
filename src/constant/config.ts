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

/**
 * @todo 유저의 복습 간겨을 설정하게 되면 이동하기 바람
 * - 유저가 복습 간격을 설정으로 쓰기가 가능해질 경우 더이상 상수로 취급하지 않음
 */
export const intervalMap = new Int32Array([
  10, // 10 -> 0 틀림 10분
  60, // 60 -> 1번 맞춤 1시간
  1440, // 60 * 24 -> 2번 맞춤 내일
  2880, // 60 * 24 * 2
  4320, // 60 * 24 * 3
  5760, // 60 * 24 * 4
  10080, // 60 * 24 * 7 -> 6번 맞춤 다음주
  20160, // 60 * 24 * 14 -> 7번 맞춤 다다음주
  43830, // 60 * 24 * 30.4375 -> 8번 맞춤 다음달
  87660, // 60 * 24 * 30.4375 * 2 ->  9번 다다음달
  131490, // 60 * 24 * 91.3125 -> 10번 맞춤 다음분기
  262980, // 60 * 24 * 182.625 -> 11번 맞춤 다음반기
]);
