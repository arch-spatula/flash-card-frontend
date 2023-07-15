import styled from '@emotion/styled';

export const CheckboxButton = styled.button`
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
