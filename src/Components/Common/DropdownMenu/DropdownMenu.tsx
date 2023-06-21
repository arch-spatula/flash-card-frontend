import { DropdownMenuContainer } from './DropdownMenu.style';

type LinkItem = {
  label: string;
  href: string;
};

type ButtonItem = {
  label: string;
  cb: () => void;
};

type DropdownMenuProps = {
  open: boolean;
  menuItem: (LinkItem | ButtonItem)[];
};

export function DropdownMenu({ open, menuItem }: DropdownMenuProps) {
  return (
    <DropdownMenuContainer>
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-dots-vertical"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
      </button>
      {open && (
        <ul>
          <li>
            <a href="">???</a>
          </li>
          <li>
            <button type="button">???</button>
          </li>
        </ul>
      )}
    </DropdownMenuContainer>
  );
}
