import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function protectRoutes(direct: 'signin' | 'cards') {
  return () => {
    switch (direct) {
      case 'cards':
        if (checkLogin()) throw redirect(ROUTE_PATHS.CARDS);
        break;
      case 'signin':
        if (!checkLogin()) throw redirect(ROUTE_PATHS.SIGN_IN);
        break;
      default:
        break;
    }

    return null;
  };
}
