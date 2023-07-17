import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const isRedirectingAtom = atom(false);

export function useIsRedirectToCards() {
  const [isRedirecting, setIsRedirecting] = useAtom(isRedirectingAtom);

  const startRedirecting = useCallback(() => {
    setIsRedirecting(true);
  }, [setIsRedirecting]);

  const endRedirecting = useCallback(() => {
    setIsRedirecting(false);
  }, [setIsRedirecting]);

  return {
    isRedirecting,
    startRedirecting,
    endRedirecting,
  };
}
