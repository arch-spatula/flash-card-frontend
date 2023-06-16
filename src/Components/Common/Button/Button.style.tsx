import styled from '@emotion/styled';

export const ButtonWrapper = styled.button`
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;
  border: none;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray400 : props.theme.colors.green};
  padding: 0.25rem 0.75rem;
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;
  width: min(5.25rem, auto);
  display: flex;
  align-items: center;
  justify-content: center;
`;
