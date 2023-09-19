import { checkEmailAPI } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

function useCheckEmail() {
  const { mutate: mutateCheckEmail, isLoading: isLoadingCheckEmail } =
    useMutation({ mutationFn: checkEmailAPI, retry: 0 });

  const [conformedEmail, setConformedEmail] = useState('');

  return {
    mutateCheckEmail,
    isLoadingCheckEmail,
    conformedEmail,
    setConformedEmail,
  };
}

export { useCheckEmail };
