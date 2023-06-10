import { Button } from '../../Components';
import { useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';

function Setting() {
  const { setToken } = useLogin();
  const navigate = useNavigate();

  const handelSignOut = () => {
    setToken('');
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  return (
    <div>
      <h1>Setting</h1>
      <Button onClick={handelSignOut}>Sign out</Button>
    </div>
  );
}

export { Setting };
