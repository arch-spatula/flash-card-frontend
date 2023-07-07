import { Link } from 'react-router-dom';
import { Nav, Container, List, ListItem } from './Navbar.style';
import { useLogin } from '@/hooks';
import { ROUTE_PATHS } from '@/constant/config';

export function Navbar() {
  const { isLoggedIn } = useLogin();
  return <Nav>{isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}</Nav>;
}

function LoggedInNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <Link to={ROUTE_PATHS.CARDS}>Home</Link>
        </ListItem>
        <ListItem>
          <Link to={ROUTE_PATHS.DECK}>Deck</Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link to={ROUTE_PATHS.SETTING}>Setting</Link>
        </ListItem>
      </List>
    </Container>
  );
}

function LoggedOutNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <Link to={ROUTE_PATHS.WELCOME}>Home</Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link to={ROUTE_PATHS.SIGN_UP}>Sign Up</Link>
        </ListItem>
        <ListItem>
          <Link to={ROUTE_PATHS.SIGN_IN}>Sign In</Link>
        </ListItem>
      </List>
    </Container>
  );
}
