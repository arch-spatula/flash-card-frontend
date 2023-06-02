import { Button, Input } from '../../Components';
import { useInput } from '../../hooks';

function SignIn() {
  const { inputVal: emailValue, changeInputVal: changeEmail } = useInput();

  return (
    <div>
      <h1>Sign In</h1>
      <Input type="email" onChange={changeEmail} value={emailValue} />
      <Button
        onClick={(e) => {
          console.log(e.target);
        }}
      >
        Sign In
      </Button>
    </div>
  );
}

export { SignIn };
