import { DeckPageContainer } from './Deck.style';
import { CreateCard, DeckList, SectionTitle } from './subcomponents';
import { ErrorBoundary } from 'react-error-boundary';
import { EmptyCards, PageHeading } from '@/Components';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function Deck() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <DeckPageContainer>
      <PageHeading>Deck</PageHeading>
      <CreateCard />
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <>
            <SectionTitle>Oops! something went wrong 🤯</SectionTitle>
            <EmptyCards error={error} resetErrorBoundary={resetErrorBoundary} />
          </>
        )}
      >
        <DeckList />
      </ErrorBoundary>
    </DeckPageContainer>
  );
}

export default Deck;
