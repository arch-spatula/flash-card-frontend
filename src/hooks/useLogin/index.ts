import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const tokenAtom = atomWithStorage('token', '');

export function useLogin() {
  const [token, setToken] = useAtom(tokenAtom);

  return { token, setToken };
}
