import { Button } from '../../Components';
import { useLogin } from '../../hooks';

function Landing() {
  const { login, logout } = useLogin();
  return (
    <div>
      <h1>Welcome</h1>
      <Button onClick={login}>login</Button>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}

export { Landing };
