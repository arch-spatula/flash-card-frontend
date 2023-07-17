import { STORAGE_KEY } from '@/constant/config';
import { checkLogin } from '@/utils';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const loginAtom = atom(checkLogin());

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginAtom);

  const setTokens = useCallback(
    (accessToken: string, sessionToken: string) => {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, sessionToken);
      setIsLoggedIn(checkLogin());
    },
    [setIsLoggedIn]
  );

  const emptyTokens = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    setIsLoggedIn(checkLogin());
  }, [setIsLoggedIn]);

  return {
    isLoggedIn,
    setTokens,
    emptyTokens,
  };
}
