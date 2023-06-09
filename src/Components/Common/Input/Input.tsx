import { InputWrapper, HelperText, InputContainer } from './Input.style';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  helperText?: string;
  hideHelper?: boolean;
  customRef?: React.RefObject<HTMLInputElement>;
};

export function Input({
  onChange,
  value,
  helperText,
  hideHelper = false,
  customRef,
  ...other
}: InputProps) {
  return (
    <InputContainer>
      <InputWrapper
        onChange={onChange}
        value={value}
        ref={customRef}
        {...other}
      />
      {!hideHelper && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
}
