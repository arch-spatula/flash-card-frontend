import { useNavigate } from 'react-router-dom';
import { useLogin } from '..';
import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from '../../constant/config';

export function useFakeSignOut() {
  const { emptyTokens } = useLogin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let timer: NodeJS.Timeout | null = null;

  const handelSignOut = () => {
    setIsLoading(true);
    const randomDelay = Math.floor(Math.random() * 2 + 1) * 1000;

    timer = setTimeout(() => {
      setIsLoading(false);
      emptyTokens();
      navigate(ROUTE_PATHS.SIGN_IN);
    }, randomDelay);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return { handelSignOut, isLoading };
}
