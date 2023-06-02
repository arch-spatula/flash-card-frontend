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

  return { inputVal, changeInputVal, resetInputVal };
}
