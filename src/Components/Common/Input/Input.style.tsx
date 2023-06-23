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
  flex-grow: 1;
  :hover {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.gray400} inset;
  }
  :focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green} inset;
  }
`;

export const HelperText = styled.p`
  ${(props) => props.theme.fonts.body14Regular}
  min-height: 1.5rem;
`;

export const InputLabel = styled.label`
  ${(props) => props.theme.fonts.caption12Regular}// 20px + 8px
`;
