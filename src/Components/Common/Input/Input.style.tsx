import styled from '@emotion/styled';

export const InputWrapper = styled.input``;

type HelperTextProps = {
  visibility?: boolean;
};

export const HelperText = styled.p<HelperTextProps>`
  ${(props) => props.theme.fonts.caption12Regular}
  min-height: 1.25rem;
`;
