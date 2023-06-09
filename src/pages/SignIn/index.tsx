import { Button, Input } from '../../Components';
import { signInAPI } from '../../api/authClient';
import { useInput, useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';
import { useState } from 'react';
import { MainContainer, MainWrapper, Title } from './SignIn.style';

/**
 * @todo 화면의 로직과 로그인과 관련된 비즈니스 로직이 강하게 결합되어 있습니다. 결합도를 나추도록 합니다.
 * @todo signIn 함수는 useLogin에서 호출하도록 설계합니다.
 * @todo tree shaking이 되는 Suspense 적용을 위해 named export에서 default export로 리팩토링합니다.
 */

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

  const disabled = [emailValue, passwordValue].some((elem) => !elem);

  return (
    <MainContainer>
      <MainWrapper>
        <Title>Sign In</Title>
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
        <Button onClick={signIn} disabled={disabled}>
          Sign In
        </Button>
      </MainWrapper>
    </MainContainer>
  );
}

export { SignIn };
