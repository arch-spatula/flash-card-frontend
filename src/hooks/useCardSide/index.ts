import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

type CardSide = 'front' | 'back' | 'edit';
const cardSideAtom = atom<CardSide>('front');

const prevCache = new Map<'cache', CardSide>([['cache', 'front']]);

/**
 * - card 컴포넌트에서만 호출하는 hook
 * - 카드의 면(문제, 풀이, 편집)을 state machine pattern으로 공유 함
 * - provider로 분할된 context를 가짐
 */
export function useCardSide() {
  const [cardSide, setCardSide] = useAtom(cardSideAtom);

  const toggleTo = useCallback(
    (side: CardSide) => {
      if (cardSide !== side) {
        prevCache.set('cache', cardSide);
        setCardSide(side);
      }
    },
    [setCardSide, cardSide]
  );

  const togglePrev = useCallback(() => {
    setCardSide(prevCache.get('cache') ?? 'front');
  }, [setCardSide]);

  return { togglePrev, cardSide, toggleTo };
}
