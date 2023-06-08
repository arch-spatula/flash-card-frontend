import { InputWrapper, HelperText, InputContainer } from './Input.style';

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
    <InputContainer>
      <InputWrapper onChange={onChange} value={value} {...other} />
      {!hideHelper && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
}
