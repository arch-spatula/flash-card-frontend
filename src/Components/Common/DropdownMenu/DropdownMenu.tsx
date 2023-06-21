import { useState } from 'react';
import theme from '../../../styles/theme';
import {
  DropdownMenuContainer,
  DropdownOpen,
  MenuList,
} from './DropdownMenu.style';

type LinkItem = {
  label: string;
  href: string;
};

type ButtonItem = {
  label: string;
  cb: () => void;
};

type DropdownMenuProps = {
  menuItem: (LinkItem | ButtonItem)[];
};

export function DropdownMenu({ menuItem }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DropdownMenuContainer>
      <DropdownOpen type="button" onClick={handleOpenMenu} isOpen={isOpen}>
        <Icon />
      </DropdownOpen>
      {isOpen && (
        <MenuList>
          {menuItem.map((item, idx) => (
            <li key={idx}>
              {'href' in item ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <button onClick={item.cb}>{item.label}</button>
              )}
            </li>
          ))}
        </MenuList>
      )}
    </DropdownMenuContainer>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={theme.colors.gray700}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
}
