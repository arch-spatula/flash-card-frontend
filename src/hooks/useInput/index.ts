import React, { useCallback, useState } from 'react';

export function useInput() {
  const [inputVal, setInputVal] = useState('');

  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const resetInputVal = useCallback(() => {
    setInputVal('');
  }, []);

  const focusInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.focus();
  }, []);

  return { inputVal, changeInputVal, resetInputVal, focusInput };
}
