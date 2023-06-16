import styled from '@emotion/styled';

export const InputContainer = styled.div<{ hideHelper: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.5rem;
  height: ${(props) => (props.hideHelper ? '2.75rem' : '4.75rem')};
  flex-grow: 1;
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
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green} inset;
  }
`;

export const HelperText = styled.p`
  ${(props) => props.theme.fonts.body14Regular}
  min-height: 1.5rem;
`;
