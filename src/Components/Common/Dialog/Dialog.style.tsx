import { css } from '@emotion/react';
import styled from '@emotion/styled';

const center = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const WindowContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const DialogContainer = styled.div`
  z-index: 5;
  width: 19.5rem;
  height: 11rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  ${(props) => props.theme.shadow.boxShadow}
  ${center}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const DialogHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.75rem 0.75rem 1.25rem;
  width: 100%;
`;

export const DialogHeaderTitle = styled.h3`
  ${(props) => props.theme.fonts.heading20Bold}
`;

export const DialogClose = styled.button`
  all: unset;
  background-color: transparent;
  border-radius: 0.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }
  :active {
    background-color: ${(props) => props.theme.colors.gray200};
  }
  position: relative;
`;

export const DialogBodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
`;

export const DialogFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  gap: 1rem;
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
