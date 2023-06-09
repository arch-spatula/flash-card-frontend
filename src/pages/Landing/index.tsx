import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks';
import { ROUTE_PATHS } from '../../constant/config';
import { useEffect } from 'react';

function Landing() {
  const { token } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(ROUTE_PATHS.CARDS);
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export { Landing };
