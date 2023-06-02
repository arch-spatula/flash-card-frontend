import React, { useCallback, useState } from 'react';

export function useInput() {
  const [inputVal, setInputVal] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const resetInput = useCallback(() => {
    setInputVal('');
  }, []);

  return { inputVal, onChange, resetInput };
}
