import { Button, Input } from '../../Components';
import { signInAPI } from '../../api/authClient';
import { useInput, useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';
import { useState } from 'react';
import { MainContainer } from './SignIn.style';

function SignIn() {
  const { inputVal: emailValue, changeInputVal: changeEmail } = useInput();
  const { inputVal: passwordValue, changeInputVal: changePassword } =
    useInput();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setToken } = useLogin();

  const signIn = async () => {
    try {
      setEmailError('');
      setPasswordError('');
      const res = await signInAPI(emailValue, passwordValue);

      if (res?.msg === 'Error: 비밀번호가 일치하지 않습니다.')
        throw new Error('비밀번호가 일치하지 않습니다.');
      if (res?.msg === 'Error: 이메일이 없습니다.')
        throw new Error('이메일이 없습니다.');

      if (res?.success) {
        const { access_token } = res;
        if (access_token) setToken(`${access_token}`);
        navigate(ROUTE_PATHS.CARDS);
      }
    } catch (error) {
      const err = error as Error;
      if (err.message === '이메일이 없습니다.') {
        setEmailError('이메일이 없습니다.');
      }
      if (err.message === '비밀번호가 일치하지 않습니다.') {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <MainContainer>
      <h1>Sign In</h1>
      <Input
        type="email"
        onChange={changeEmail}
        value={emailValue}
        helperText={emailError}
      />
      <Input
        type="password"
        onChange={changePassword}
        value={passwordValue}
        helperText={passwordError}
      />
      <Button onClick={signIn} disabled={!emailValue && !passwordValue}>
        Sign In
      </Button>
    </MainContainer>
  );
}

export { SignIn };
