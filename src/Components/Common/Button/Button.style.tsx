import styled from '@emotion/styled';

export const ButtonWrapper = styled.button<{ isLoading: boolean }>`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;
  border: none;
  /* disabled 이면 gray가 되고 loading이면 green을 유지 */
  background-color: ${(props) =>
    props.disabled && !props.isLoading
      ? props.theme.colors.gray400
      : props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;
  min-width: 5.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VisibilityWrapper = styled.div<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
