import { redirect } from 'react-router-dom';
import { checkLogin } from '..';
import { ROUTE_PATHS } from '@/constant/config';

export function protectRoutes(direction: 'signin' | 'cards') {
  return () => {
    switch (direction) {
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
