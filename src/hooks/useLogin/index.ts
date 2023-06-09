import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const loggedIn = atom(false);
const tokenAtom = atomWithStorage('token', '');

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedIn);
  const [token, setToken] = useAtom(tokenAtom);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout, token, setToken };
}
