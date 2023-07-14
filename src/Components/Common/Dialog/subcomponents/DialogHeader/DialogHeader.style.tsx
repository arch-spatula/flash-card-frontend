import styled from '@emotion/styled';

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
