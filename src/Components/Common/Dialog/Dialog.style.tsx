import { css } from '@emotion/react';
import styled from '@emotion/styled';

const center = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const WindowContainer = styled.div``;

export const DialogContainer = styled.div`
  z-index: 5;
  width: 19.5rem;
  min-height: 11rem;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  ${(props) => props.theme.shadow.boxShadow}
  ${center}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  ${center}
`;
