import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks';
import { ROUTE_PATHS } from '../../constant/config';
import { useEffect } from 'react';

function Landing() {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTE_PATHS.CARDS);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export { Landing };
