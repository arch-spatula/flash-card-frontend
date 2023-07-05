import { Container, List, ListItem } from '../../Navbar.style';
import { ROUTE_PATHS } from '@/constant/config';
import { WeightedLink } from '../WeightedLink';

export function LoggedOutNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.WELCOME} title="Home" />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.SIGN_UP} title="Sign Up" />
        </ListItem>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.SIGN_IN} title="Sign In" />
        </ListItem>
      </List>
    </Container>
  );
}
