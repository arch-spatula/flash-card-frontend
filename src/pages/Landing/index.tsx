import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components';
import { useLogin } from '../../hooks';
import { ROUTE_PATHS } from '../../constant/config';
import { useEffect } from 'react';

function Landing() {
  const { login, logout, token } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(ROUTE_PATHS.CARDS);
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome</h1>
      <Button onClick={login}>login</Button>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}

export { Landing };
