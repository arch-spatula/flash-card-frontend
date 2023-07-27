import { DeckPageContainer } from './Deck.style';
import { CreateCard, DeckList, SectionTitle } from './subcomponents';
import { ErrorBoundary } from 'react-error-boundary';
import { EmptyCards, PageHeading } from '@/Components';

function Deck() {
  return (
    <DeckPageContainer>
      <PageHeading>Deck</PageHeading>
      <CreateCard />
      <ErrorBoundary
        FallbackComponent={({ error }) => (
          <>
            <SectionTitle>Oops! something went wrong 🤯</SectionTitle>
            <EmptyCards error={error} />
          </>
        )}
      >
        <DeckList />
      </ErrorBoundary>
    </DeckPageContainer>
  );
}

export default Deck;
