import { ErrorBoundary, PageHeading } from '../../Components';
import { CardPageContainer } from './Cards.style';
import { NowDeck } from './subcomponents';

function Cards() {
  return (
    <CardPageContainer>
      <PageHeading>Cards</PageHeading>
      <ErrorBoundary fallback={<h2>something went wrong???</h2>}>
        <NowDeck />
      </ErrorBoundary>
    </CardPageContainer>
  );
}

export default Cards;
