import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const DropdownMenuContainer = styled.div`
  z-index: 2;
`;

export const DropdownOpen = styled.button<{ isOpen: boolean }>`
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

export const MenuList = styled.ul<{ direction: 'left' | 'right' }>`
  ${(props) => (props.direction === 'left' ? 'left:0' : 'right: 0')};
  z-index: 2;
  position: absolute;
  top: 3rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12);
`;

export const MenuItem = styled.li`
  min-width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** hover, active는 theme provider로 접근하기 때문에 공유할 수 없습니다. */
const shareItem = css`
  all: unset;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0 1.25rem;
  white-space: nowrap;
`;

export const MenuButton = styled.button`
  ${shareItem}
  :hover {
    background-color: ${(props) => props.theme.colors.gray050};
  }
  :active {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

export const Anchor = styled(Link)`
  ${shareItem}
  :hover {
    background-color: ${(props) => props.theme.colors.gray050};
  }
  :active {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;
