import styled from '@emotion/styled';
import { CardContainer, rotate, rotateInverse } from '../../Card.style';

export const CardFrontContainer = styled(CardContainer)`
  animation-name: ${(props) => {
    return props.active ? rotateInverse : rotate;
  }};
`;

export const Question = styled.h3`
  ${(props) => props.theme.fonts.heading20Bold}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const SubmitForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  height: 2.75rem;
`;