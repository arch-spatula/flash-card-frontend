import { Button } from '../../Components';
import { useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';

function Setting() {
  const { emptyTokens } = useLogin();
  const navigate = useNavigate();

  const handelSignOut = () => {
    emptyTokens();
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  return (
    <div>
      <h1>Setting</h1>
      <Button onClick={handelSignOut}>Sign out</Button>
    </div>
  );
}

export default Setting;
