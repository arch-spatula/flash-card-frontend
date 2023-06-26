import styled from '@emotion/styled';
import { CardContainer, rotate, rotateInverse } from '../Card.style';

export const CardBackContainer = styled(CardContainer)<{ isCorrect: boolean }>`
  background-color: ${(props) =>
    props.isCorrect ? props.theme.colors.green050 : props.theme.colors.red050};
  animation-name: ${(props) => {
    return props.active ? rotateInverse : rotate;
  }};
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  flex-grow: 1;
`;

export const Paragraph = styled.p`
  ${(props) => props.theme.fonts.body16Regular}
`;
