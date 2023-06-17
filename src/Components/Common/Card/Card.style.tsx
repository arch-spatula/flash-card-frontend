import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  0% {
    transform: rotateY(0);
  }
  70% {
    transform: rotateY(200deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const rotateInverse = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  70% {
    transform: rotateY(-20deg);
  }
  100% {
    transform: rotateY(0);
  }
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

/** relative를 적용하기 위해서는 사이즈가 필요함 */
const CardSize = styled.div`
  height: 19.5rem;
  width: 19.5rem;
`;

export const CardWrapper = styled(CardSize)`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
`;

export const CardContainer = styled(CardSize)<{ active: boolean }>`
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1.25rem;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  backface-visibility: hidden;
`;

export const CardFrontContainer = styled(CardContainer)`
  animation-name: ${(props) => (props.active ? rotate : rotateInverse)};
`;

export const CardBackContainer = styled(CardContainer)`
  animation-name: ${(props) => (props.active ? rotateInverse : rotate)};
`;

export const SubmitForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  height: 2.75rem;
`;
