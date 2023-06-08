import { HelperText } from './Input.style';
import { InputWrapper } from './Input.style';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  helperText?: string;
  hideHelper?: boolean;
};

export function Input({
  onChange,
  value,
  helperText,
  hideHelper = false,
  ...other
}: InputProps) {
  return (
    <>
      <InputWrapper onChange={onChange} value={value} {...other} />
      {!hideHelper && <HelperText>{helperText}</HelperText>}
    </>
  );
}
