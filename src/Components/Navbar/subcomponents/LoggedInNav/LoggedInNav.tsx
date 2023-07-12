import { Container, List, ListItem } from '../../Navbar.style';
import { ROUTE_PATHS } from '@/constant/config';
import { WeightedLink } from '../WeightedLink';

export function LoggedInNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.CARDS} title="Home" />
        </ListItem>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.DECK} title="Deck" />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <WeightedLink link={ROUTE_PATHS.SETTING} title="Setting" />
        </ListItem>
      </List>
    </Container>
  );
}
