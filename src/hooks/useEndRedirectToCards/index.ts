import { useEffect } from 'react';
import { useIsRedirectToCards } from '..';

export function useEndRedirectToCards() {
  const { endRedirecting } = useIsRedirectToCards();
  useEffect(() => {
    endRedirecting();
  }, [endRedirecting]);
  return null;
}
