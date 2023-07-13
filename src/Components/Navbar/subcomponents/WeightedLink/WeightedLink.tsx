import { useLocation } from 'react-router-dom';
import { NavLinkFontWeight } from './WeightedLink.style';

export function WeightedLink({ link, title }: { link: string; title: string }) {
  const { pathname } = useLocation();
  return (
    <NavLinkFontWeight
      current={pathname === link ? 'bold' : 'regular'}
      to={link}
    >
      {title}
    </NavLinkFontWeight>
  );
}
