import { useMutation } from '@tanstack/react-query';
import { Button } from '../../Components';
import { signOutAPI } from '../../api/authClient';
import { useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';

function Setting() {
  const { setToken } = useLogin();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(signOutAPI, {
    onSuccess: () => {
      setToken('');
      navigate(ROUTE_PATHS.SIGN_IN);
    },
  });

  const handelSignOut = () => {
    mutate();
  };

  return (
    <div>
      <h1>Setting</h1>
      <Button onClick={handelSignOut}>Sign out</Button>
      {isLoading && '로딩 중입니다.'}
      {`${error}`}
    </div>
  );
}

export { Setting };
