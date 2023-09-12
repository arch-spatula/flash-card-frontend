import { STORAGE_KEY } from '@/constant/config';

function grantAccess() {
  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, 'token');
  sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, 'token');
}

export { grantAccess };
