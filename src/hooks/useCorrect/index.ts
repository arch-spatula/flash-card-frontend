import { atom, useAtom } from 'jotai';

const correctAtom = atom(false);

/**
 * - card 컴포넌트에서만 호출하는 hook
 * - 정답을 맞추고 틀리고 상태를 공유함
 * - provider로 분할된 context를 가짐
 */
export function useCorrect() {
  const [isCorrect, setIsCorrect] = useAtom(correctAtom);
  return { isCorrect, setIsCorrect };
}
