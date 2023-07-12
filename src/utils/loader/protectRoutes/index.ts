import { redirect } from 'react-router-dom';
import { checkLogin } from '../../auth';
import { ROUTE_PATHS } from '@/constant/config';

type Direction = 'signin' | 'cards';

const DirectionMap: { [key in Direction]: () => null } = {
  cards: () => {
    if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
    return null;
  },
  signin: () => {
    if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
    return null;
  },
} as const;

export function protectRoutes(direction: Direction) {
  return DirectionMap[direction];
}
