import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const inputAtom = atom('');

/**
 * - card 컴포넌트에서만 호출하는 hook
 * - 카드의 input 작성 상태를 공유 함
 * - provider로 분할된 context를 가짐
 */
export function useAtomInput() {
  const [inputVal, setInputVal] = useAtom(inputAtom);

  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    [setInputVal]
  );

  const resetInputVal = useCallback(() => {
    setInputVal('');
  }, [setInputVal]);

  return { inputVal, changeInputVal, resetInputVal };
}
