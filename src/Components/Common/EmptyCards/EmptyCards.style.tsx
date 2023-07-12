import styled from '@emotion/styled';

export const NoCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray050};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 19rem;
  border-radius: 1rem;
  flex-grow: 1;
`;

export const NoCardMessage = styled.p`
  ${(props) => props.theme.fonts.heading20Bold}
  color: ${(props) => props.theme.colors.gray300};
  /* 텍스트 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;
