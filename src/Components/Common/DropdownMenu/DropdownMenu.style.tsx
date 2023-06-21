import styled from '@emotion/styled';

export const DropdownMenuContainer = styled.div`
  z-index: 2;
  background-color: ${(props) => props.theme.colors.white};
`;

export const DropdownOpen = styled.button<{ isOpen: boolean }>`
  all: unset;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem 0.5rem
    ${(props) => (props.isOpen ? '0 0' : '0.5rem 0.5rem')};
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

export const MenuList = styled.ul`
  z-index: 2;
  position: absolute;
`;
