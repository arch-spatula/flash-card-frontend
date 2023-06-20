import { useMutation } from '@tanstack/react-query';
import { Button, Input, PageHeading } from '../../Components';
import { useInput } from '../../hooks';
import { checkEmail, checkPassword } from '../../utils';
import { MainContainer, MainWrapper } from './SignUp.style';
import { signUpAPI } from '../../api/authClient';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';
import { useState } from 'react';

function SignUp() {
  const {
    inputVal: email,
    changeInputVal: changeEmail,
    inputRef: emailRef,
    focusInput: focusEmail,
  } = useInput();
  const { inputVal: password, changeInputVal: changePassword } = useInput();
  const { inputVal: conformPassword, changeInputVal: changeConformPassword } =
    useInput();

  const { mutate, isLoading } = useMutation({ mutationFn: signUpAPI });

  const navigate = useNavigate();

  const [emailHelper, setEmailHelper] = useState<
    '' | '이미 가입한 Email입니다.'
  >('');

  const disabled = [
    checkEmail(email),
    checkPassword(password),
    conformPassword,
    password === conformPassword,
  ].some((elem) => !elem);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailHelper('');

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            navigate(ROUTE_PATHS.SIGN_IN);
          } else {
            const { msg } = data as { success: boolean; msg: string };
            if (msg.startsWith('Error: 이미 가입한 아이디입니다.')) {
              focusEmail();
              setEmailHelper('이미 가입한 Email입니다.');
            }
          }
        },
        onError: (error) => {
          console.log('error??', error);
        },
      }
    );
  };

  return (
    <MainContainer>
      <MainWrapper onSubmit={handleSignUp}>
        <PageHeading>Sign Up</PageHeading>
        <Input
          value={email}
          onChange={changeEmail}
          type="email"
          placeholder="user@email.com"
          customRef={emailRef}
          helperText={emailHelper}
        />
        <Input
          value={password}
          onChange={changePassword}
          type="password"
          placeholder="8자리 이상 영어, 숫자 모두 입력해주세요"
        />
        <Input
          value={conformPassword}
          onChange={changeConformPassword}
          type="password"
          placeholder="동일하게 입력해주세요"
        />
        <Button disabled={disabled} isLoading={isLoading}>
          회원가입
        </Button>
      </MainWrapper>
    </MainContainer>
  );
}

export default SignUp;
