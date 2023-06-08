import styled from '@emotion/styled';

export const ButtonWrapper = styled.button`
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.25rem;
  border: none;
  background-color: ${(props) => props.theme.colors.green};
  padding: 0.25rem 0.75rem;
  color: ${(props) => props.theme.colors.white};
`;
