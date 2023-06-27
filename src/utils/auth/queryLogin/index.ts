import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function queryLogin(direct: 'signin' | 'cards') {
  if (direct === 'signin' && !checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
  if (direct === 'cards' && checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
}
