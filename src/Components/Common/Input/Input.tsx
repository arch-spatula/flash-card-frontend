import {
  InputWrapper,
  HelperText,
  InputContainer,
  InputLabel,
} from './Input.style';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  helperText?: string;
  hideHelper?: boolean;
  customRef?: React.RefObject<HTMLInputElement>;
  width?: number;
  inputLabel?: string;
};

export function Input({
  onChange,
  value,
  helperText,
  hideHelper = false,
  customRef,
  width = 0,
  inputLabel,
  ...other
}: InputProps) {
  return (
    <InputContainer
      hideHelper={hideHelper}
      width={width}
      inputLabel={inputLabel}
    >
      {inputLabel && <InputLabel htmlFor={inputLabel}>{inputLabel}</InputLabel>}
      <InputWrapper
        onChange={onChange}
        value={value}
        ref={customRef}
        id={inputLabel}
        {...other}
      />
      {!hideHelper && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
}
