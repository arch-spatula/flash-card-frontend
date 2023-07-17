import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const rotate = keyframes`
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

export const rotateInverse = keyframes`
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

/** relative를 적용하기 위해서는 사이즈가 필요함 */
const CardSize = styled.div`
  height: 19.5rem;
  width: 19.5rem;
`;

export const CardWrapper = styled(CardSize)`
  position: relative;
`;

export const CardContainer = styled(CardSize)<{ active: boolean }>`
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => props.theme.shadow.boxShadow}
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  padding: 1.25rem;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  backface-visibility: hidden;
`;
