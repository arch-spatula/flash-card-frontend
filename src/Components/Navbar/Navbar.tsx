import { Nav } from './Navbar.style';
import { useIsRedirectToCards, useLogin } from '@/hooks';
import { LoggedInNav, LoggedOutNav } from './subcomponents';

export function Navbar() {
  const { isLoggedIn } = useLogin();
  const { isRedirecting } = useIsRedirectToCards();
  return (
    <Nav>
      {isLoggedIn && !isRedirecting ? <LoggedInNav /> : <LoggedOutNav />}
    </Nav>
  );
}
