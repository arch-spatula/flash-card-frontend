import { signInAPI } from './api/authClient';
import Router from './routes/Routes';

function App() {
  const login = async () => {
    const foo = await signInAPI('username@email.com', '12345678');
    console.log(foo);
    return foo;
  };

  return (
    <>
      <button onClick={login}>로그인</button>
      <Router />
    </>
  );
}

export default App;
