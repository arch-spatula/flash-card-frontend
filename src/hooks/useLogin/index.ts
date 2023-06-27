import { STORAGE_KEY } from '@/constant/config';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const loginAtom = atom(false);

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginAtom);

  const setTokens = useCallback(
    (accessToken: string, sessionToken: string) => {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(STORAGE_KEY.SESSION_TOKEN, sessionToken);
      setIsLoggedIn(true);
    },
    [setIsLoggedIn]
  );

  const emptyTokens = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY.SESSION_TOKEN);
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return {
    isLoggedIn,
    setTokens,
    emptyTokens,
  };
}
