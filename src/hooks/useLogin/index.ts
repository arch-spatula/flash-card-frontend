import { atom, useAtom } from 'jotai';

const loggedIn = atom(false);

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedIn);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
