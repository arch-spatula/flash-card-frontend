import styled from '@emotion/styled';

export const InputContainer = styled.div<{
  hideHelper: boolean;
  width?: number;
  inputLabel?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.5rem;
  height: ${(props) => {
    let inputHeight = 44;
    if (!props.hideHelper) inputHeight += 32;
    if (props.inputLabel) inputHeight += 28;
    return `${inputHeight / 16}rem`;
  }};
  ${(props) => (props.width === 0 ? 'flex-grow: 1' : `width: ${props.width}px`)}
`;

export const InputWrapper = styled.input`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  padding: 0.5rem 0.75rem;
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.gray300} inset;
  border-radius: 0.5rem;
  :hover {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.gray400} inset;
  }
  :focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green500} inset;
  }
`;

export const HelperText = styled.p<{
  helperTextColor: 'warning' | 'success' | 'information' | 'normal';
}>`
  ${(props) => props.theme.fonts.body14Regular}
  color: ${(props) => {
    const colorMap = {
      normal: props.theme.colors.black,
      success: props.theme.colors.green500,
      warning: props.theme.colors.red500,
      information: props.theme.colors.blue500,
    } as const;

    return colorMap[props.helperTextColor];
  }};
  min-height: 1.5rem;
`;

export const InputLabel = styled.label`
  ${(props) => props.theme.fonts.body16Regular}
`;
