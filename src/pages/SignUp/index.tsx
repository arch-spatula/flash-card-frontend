import { Button, Input, PageHeading } from '../../Components';
import { useInput } from '../../hooks';
import { MainContainer, MainWrapper } from './SignUp.style';

function SignUp() {
  const { inputVal: email, changeInputVal: changeEmail } = useInput();
  const { inputVal: password, changeInputVal: changePassword } = useInput();
  const { inputVal: conformPassword, changeInputVal: changeConformPassword } =
    useInput();

  const disabled = [
    email,
    password,
    conformPassword,
    password === conformPassword,
  ].some((elem) => !elem);

  return (
    <MainContainer>
      <MainWrapper>
        <PageHeading>Sign Up</PageHeading>
        <Input
          value={email}
          onChange={changeEmail}
          type="email"
          placeholder="user@email.com"
        />
        <Input
          value={password}
          onChange={changePassword}
          type="password"
          placeholder="8자리 이상 입력해주세요"
        />
        <Input
          value={conformPassword}
          onChange={changeConformPassword}
          type="password"
          placeholder="동일하게 입력해주세요"
        />
        <Button disabled={disabled}>회원가입</Button>
      </MainWrapper>
    </MainContainer>
  );
}

export default SignUp;
