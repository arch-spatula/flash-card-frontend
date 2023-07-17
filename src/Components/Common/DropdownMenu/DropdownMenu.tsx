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
  const { nonTargetAreaRef, isOpen, handleRevers, OutSideProvider } =
    useOutsideClick<HTMLDivElement>();

  return (
    <DropdownMenuContainer ref={nonTargetAreaRef}>
      <DropdownOpen type="button" onClick={handleRevers} isOpen={isOpen}>
        <Icon />
      </DropdownOpen>
      <OutSideProvider
        component={<Menu menuItem={menuItem} direction={direction} />}
      />
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
