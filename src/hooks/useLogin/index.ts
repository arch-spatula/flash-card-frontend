import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const session = createJSONStorage(() => sessionStorage);
const accessTokenAtom = atomWithStorage('accessToken', '');
const sessionTokenAtom = atomWithStorage('sessionToken', '', session);

export function useLogin() {
  const [token, setToken] = useAtom(accessTokenAtom);
  const [sessionToken, setSessionToken] = useAtom(sessionTokenAtom);

  return { token, setToken };
}
