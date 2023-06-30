import { STORAGE_KEY } from '@/constant/config';

export function checkLogin() {
  return Boolean(
    localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) &&
      sessionStorage.getItem(STORAGE_KEY.SESSION_TOKEN)
  );
}
