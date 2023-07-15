import {
  InputWrapper,
  HelperText,
  InputContainer,
  InputLabel,
} from './Input.style';
import { useId } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  helperText?: string;
  hideHelper?: boolean;
  helperTextColor?: 'warning' | 'success' | 'information' | 'normal';
  customRef?: React.RefObject<HTMLInputElement>;
  width?: number;
  inputLabel?: string;
};

export function Input({
  onChange,
  value,
  customRef,
  width = 0,
  inputLabel,
  helperText,
  hideHelper = false,
  helperTextColor = 'normal',
  ...other
}: InputProps) {
  const id = useId();
  return (
    <InputContainer
      hideHelper={hideHelper}
      width={width}
      inputLabel={inputLabel}
    >
      {inputLabel && (
        <InputLabel {...(id && { htmlFor: id })}>{inputLabel}</InputLabel>
      )}
      <InputWrapper
        onChange={onChange}
        value={value}
        ref={customRef}
        {...(id && { id })}
        {...other}
      />
      {!hideHelper && (
        <HelperText helperTextColor={helperTextColor}>{helperText}</HelperText>
      )}
    </InputContainer>
  );
}
