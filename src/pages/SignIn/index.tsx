import { Button, Input } from '../../Components';
import { signInAPI } from '../../api/authClient';
import { useInput } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';

function SignIn() {
  const { inputVal: emailValue, changeInputVal: changeEmail } = useInput();
  const { inputVal: passwordValue, changeInputVal: changePassword } =
    useInput();
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const res = await signInAPI(emailValue, passwordValue);
      if (res.email) navigate(ROUTE_PATHS.CARDS);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <Input type="email" onChange={changeEmail} value={emailValue} />
      <Input type="password" onChange={changePassword} value={passwordValue} />
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export { SignIn };
