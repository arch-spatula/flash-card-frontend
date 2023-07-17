import React, { useCallback, useRef, useState } from 'react';

export function useInput(init = '') {
  const [inputVal, setInputVal] = useState(init);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const resetInputVal = useCallback(() => {
    setInputVal(init);
  }, [init]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return { inputVal, changeInputVal, resetInputVal, focusInput, inputRef };
}
