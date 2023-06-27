import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function queryLogin(direct: 'signin' | 'cards') {
  switch (direct) {
    case 'cards':
      if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
      return true;
    case 'signin':
      if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
      return true;
    default:
      return null;
  }
}
