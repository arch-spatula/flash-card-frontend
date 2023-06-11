import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useCallback } from 'react';

const session = createJSONStorage(() => sessionStorage);
const accessTokenAtom = atomWithStorage('accessToken', '');
const sessionTokenAtom = atomWithStorage('sessionToken', '', session);

export function useLogin() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [sessionToken, setSessionToken] = useAtom(sessionTokenAtom);

  const isLoggedIn = Boolean(accessToken && sessionToken);

  const setTokens = useCallback(
    (accessToken: string, sessionToken: string) => {
      setAccessToken(accessToken);
      setSessionToken(sessionToken);
    },
    [setAccessToken, setSessionToken]
  );

  const emptyTokens = useCallback(() => {
    setAccessToken('');
    setSessionToken('');
  }, [setAccessToken, setSessionToken]);

  return {
    isLoggedIn,
    setTokens,
    emptyTokens,
  };
}
