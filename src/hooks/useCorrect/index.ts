import { atom, useAtom } from 'jotai';

const correctAtom = atom(false);

export function useCorrect() {
  const [isCorrect, setIsCorrect] = useAtom(correctAtom);
  return { isCorrect, setIsCorrect };
}
