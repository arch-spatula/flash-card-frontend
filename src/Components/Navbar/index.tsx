import { Link } from 'react-router-dom';
import { Nav, Container, List, ListItem } from './Navbar.style';
import { useLogin } from '../../hooks';

export function Navbar() {
  const { token } = useLogin();
  return <Nav>{token ? <LoggedInNav /> : <LoggedOutNav />}</Nav>;
}

function LoggedInNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <Link to={'/cards'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link to={'/deck'}>Deck</Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link to={'/setting'}>Setting</Link>
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
          <Link to={'/'}>Home</Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link to={'/signup'}>Sign Up</Link>
        </ListItem>
        <ListItem>
          <Link to={'/signin'}>Sign In</Link>
        </ListItem>
      </List>
    </Container>
  );
}
