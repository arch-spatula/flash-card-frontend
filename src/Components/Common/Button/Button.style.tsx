import styled from '@emotion/styled';

export const ButtonWrapper = styled.button`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;
  border: none;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray400 : props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;
  min-width: 5.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VisibilityWrapper = styled.div<{ visibility: boolean }>`
  visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
