import { EmptyCards, PageHeading } from '@/Components';
import { ErrorBoundary } from 'react-error-boundary';
import { CardPageContainer } from './Cards.style';
import { NowDeck } from './subcomponents';
function Cards() {
  return (
    <CardPageContainer>
      <PageHeading>Cards</PageHeading>
      <ErrorBoundary FallbackComponent={EmptyCards}>
        <NowDeck />
      </ErrorBoundary>
    </CardPageContainer>
  );
}

export default Cards;
