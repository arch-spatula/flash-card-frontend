import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type CardSide = 'front' | 'back' | 'edit';
const cardSideAtom = atom<CardSide>('front');
const prevCache: { cache: CardSide } = { cache: 'front' };

export function useCardSide() {
  const [cardSide, setCardSide] = useAtom(cardSideAtom);

  const toggleFront = useCallback(() => {
    if (cardSide !== 'front') {
      prevCache.cache = cardSide;
      setCardSide('front');
    }
  }, [cardSide, setCardSide]);

  const toggleBack = useCallback(() => {
    if (cardSide !== 'back') {
      prevCache.cache = cardSide;
      setCardSide('back');
    }
  }, [cardSide, setCardSide]);

  const toggleEdit = useCallback(() => {
    if (cardSide !== 'edit') {
      prevCache.cache = cardSide;
      setCardSide('edit');
    }
  }, [cardSide, setCardSide]);

  const togglePrev = useCallback(() => {
    setCardSide(prevCache.cache);
  }, [setCardSide]);

  return { toggleFront, toggleBack, toggleEdit, togglePrev, cardSide };
}
