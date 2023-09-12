import { STORAGE_KEY } from '@/constant/config';

function grantAccess() {
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'token');
}

export { grantAccess };
