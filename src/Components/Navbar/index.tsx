import { Link } from 'react-router-dom';
import { Nav, Container, List, ListItem } from './Navbar.style';
import { useLogin } from '../../hooks';

function Navbar() {
  const { isLoggedIn } = useLogin();

  return (
    <Nav>
      <Container>
        {isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <List>
              <ListItem>
                <Link to={'/'}>Home</Link>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <Link to={'/signup'}>Sign Up</Link>
                <Link to={'/signin'}>Sign In</Link>
              </ListItem>
            </List>
          </>
        )}
      </Container>
    </Nav>
  );
}

export { Navbar };
