import { Button, Checkbox, Input } from '@/Components';
import { signInAPI } from '@/api';
import {
  useEmailSave,
  useInput,
  useIsRedirectToCards,
  useLogin,
} from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constant/config';
import { useState } from 'react';
import {
  ButtonWrapper,
  CheckBoxCaption,
  EmailCheckBox,
  MainContainer,
  MainWrapper,
  Title,
} from './SignIn.style';
import { useMutation } from '@tanstack/react-query';
import { checkEmail } from '@/utils';

/**
 * @todo 화면의 로직과 로그인과 관련된 비즈니스 로직이 강하게 결합되어 있습니다. 결합도를 나추도록 합니다.
 * @todo signIn 함수는 useLogin에서 호출하도록 설계합니다.
 */

function SignIn() {
  const {
    emailValue,
    emailRef,
    storeEmail,
    focusEmail,
    changeEmail,
    handleSaveEmail,
    isChecked,
  } = useEmailSave();

  const {
    inputVal: passwordValue,
    changeInputVal: changePassword,
    inputRef: passwordRef,
    focusInput: focusPassword,
  } = useInput();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { isRedirecting, startRedirecting } = useIsRedirectToCards();
  const { setTokens } = useLogin();

  const { mutate, isLoading } = useMutation({
    mutationFn: signInAPI,
  });

  const signIn = async () => {
    setEmailError('');
    setPasswordError('');
    mutate(
      {
        email: emailValue,
        password: passwordValue,
      },
      {
        onSuccess(data) {
          const { success } = data;
          if (success) {
            startRedirecting();
            const { access_token, refresh_token } = data;
            setTokens(access_token, refresh_token);
            navigate(ROUTE_PATHS.CARDS);
            storeEmail();
          } else {
            const { msg } = data;
            if (msg === 'Error: 비밀번호가 일치하지 않습니다.') {
              setPasswordError('비밀번호가 일치하지 않습니다.');
              focusPassword();
            }
            if (msg === 'Error: 이메일이 없습니다.') {
              setEmailError('이메일이 없습니다.');
              focusEmail();
            }
          }
        },
        onError() {
          setPasswordError('잠시 후 다시 시도해주세요');
        },
      }
    );
  };

  const disabled = [checkEmail(emailValue), passwordValue].some(
    (elem) => !elem
  );

  return (
    <MainContainer>
      <MainWrapper>
        <Title>Sign In</Title>
        <Input
          type="email"
          onChange={changeEmail}
          value={emailValue}
          helperText={emailError}
          customRef={emailRef}
          placeholder="user@email.com"
        />
        <EmailCheckBox>
          <Checkbox
            check={!isChecked ? 'checked' : 'unchecked'}
            onClick={handleSaveEmail}
          />
          <CheckBoxCaption>이메일 저장</CheckBoxCaption>
        </EmailCheckBox>
        <Input
          type="password"
          onChange={changePassword}
          value={passwordValue}
          helperText={passwordError}
          customRef={passwordRef}
          placeholder="password"
        />
        <ButtonWrapper>
          <Button
            onClick={signIn}
            isLoading={isLoading || isRedirecting}
            disabled={disabled}
            width={'grow'}
          >
            로그인
          </Button>
          <Button
            href={ROUTE_PATHS.SIGN_UP}
            width={'grow'}
            hierarchy="secondary"
          >
            회원가입
          </Button>
        </ButtonWrapper>
      </MainWrapper>
    </MainContainer>
  );
}

export default SignIn;
