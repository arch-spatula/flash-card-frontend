import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type CardSide = 'front' | 'back' | 'edit';
const cardSideAtom = atom<CardSide>('front');
const prevCache: { cache: CardSide } = { cache: 'front' };

/**
 * - card 컴포넌트에서만 호출하는 hook
 * - 카드의 면(문제, 풀이, 편집)을 state machine pattern으로 공유 함
 * - provider로 분할된 context를 가짐
 */
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
