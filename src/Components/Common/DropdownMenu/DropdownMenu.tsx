import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Anchor,
  DropdownMenuContainer,
  DropdownOpen,
  MenuButton,
  MenuItem,
  MenuList,
} from './DropdownMenu.style';
import { Icon } from './Icon';

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

  const dropDownButtonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (dropDownButtonRef.current?.contains(e.target as Node) === false) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <DropdownMenuContainer ref={dropDownButtonRef}>
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
