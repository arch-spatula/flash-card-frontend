import { STORAGE_KEY } from '@/constant/config';
import { useInput } from '..';
import { useState } from 'react';

export function useEmailSave() {
  const {
    inputVal: emailValue,
    changeInputVal: changeEmail,
    inputRef: emailRef,
    focusInput: focusEmail,
  } = useInput(localStorage.getItem(STORAGE_KEY.EMAIL) ?? '');

  const [isChecked, setIsChecked] = useState(
    !!localStorage.getItem(STORAGE_KEY.EMAIL)
  );

  const storeEmail = () => {
    if (isChecked) localStorage.setItem(STORAGE_KEY.EMAIL, emailValue);
  };

  const handleSaveEmail = () => {
    if (isChecked) {
      storeEmail();
      setIsChecked(false);
    } else {
      localStorage.setItem(STORAGE_KEY.EMAIL, emailValue);
      setIsChecked(true);
    }
  };

  return {
    emailValue,
    changeEmail,
    emailRef,
    focusEmail,
    handleSaveEmail,
    storeEmail,
    isChecked,
  };
}
