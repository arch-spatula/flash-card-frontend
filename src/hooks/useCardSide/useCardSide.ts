import { atom } from 'jotai';
import { useReducerAtom } from 'jotai/utils';

type CardSide = 'front' | 'back' | 'edit';

type CardSideState = {
  prev: CardSide;
  current: CardSide;
};

const initState: CardSideState = {
  prev: 'front',
  current: 'front',
};

type CardSideAction = CardSide | 'prev';

const reducer = (
  state: CardSideState,
  action: CardSideAction
): CardSideState => {
  if (state.current === action) return { ...state };
  switch (action) {
    case 'front':
      return { prev: state.current, current: 'front' };
    case 'back':
      return { prev: state.current, current: 'back' };
    case 'edit':
      return { prev: state.current, current: 'edit' };
    case 'prev':
      return { prev: state.current, current: state.prev };
    default:
      return { ...state };
  }
};

const cardSideAtomNew = atom<CardSideState>(initState);

export function useCardSide() {
  const [cardSideState, dispatch] = useReducerAtom(cardSideAtomNew, reducer);
  return { cardSide: cardSideState.current, dispatch };
}
