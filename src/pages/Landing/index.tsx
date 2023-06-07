import { useLogin } from '../../hooks';

function Landing() {
  const { login, logout } = useLogin();
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export { Landing };
