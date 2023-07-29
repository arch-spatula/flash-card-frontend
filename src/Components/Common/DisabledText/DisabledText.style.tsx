import styled from '@emotion/styled';

export const DisabledTextWrapper = styled.p`
  ${(props) => props.theme.fonts.heading20Bold}
  color: ${(props) => props.theme.colors.gray300};
  /* 텍스트 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
