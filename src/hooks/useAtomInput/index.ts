import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const inputAtom = atom('');

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
