import { useState } from 'react';
import {
  Anchor,
  DropdownMenuContainer,
  DropdownOpen,
  MenuButton,
  MenuItem,
  MenuList,
} from './DropdownMenu.style';
import { Icon } from './Icon';
import { useOutsideClick } from '@/hooks';

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
  direction?: 'left' | 'right';
};

export function DropdownMenu({
  menuItem,
  direction = 'left',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleClose = () => {
    setIsOpen(false);
  };

  const { customRef } = useOutsideClick<HTMLDivElement>(toggleClose);

  return (
    <DropdownMenuContainer ref={customRef}>
      <DropdownOpen type="button" onClick={toggleMenu} isOpen={isOpen}>
        <Icon />
      </DropdownOpen>
      {isOpen && <Menu menuItem={menuItem} direction={direction} />}
    </DropdownMenuContainer>
  );
}

function Menu({ menuItem, direction = 'left' }: DropdownMenuProps) {
  return (
    <MenuList direction={direction}>
      {menuItem.map((item, idx) => (
        <MenuItem key={idx}>
          {'href' in item && <Anchor to={item.href}>{item.label}</Anchor>}
          {'cb' in item && (
            <MenuButton onClick={item.cb}>{item.label}</MenuButton>
          )}
        </MenuItem>
      ))}
    </MenuList>
  );
}
