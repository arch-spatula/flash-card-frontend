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

export const FormattedDateContainer = styled.div`
  position: absolute;
  height: 3rem;
  top: 0.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
`;

export const FormattedDateParagraph = styled.p`
  ${(props) => props.theme.fonts.caption12Regular}
  color: ${(props) => props.theme.colors.gray400};
`;
