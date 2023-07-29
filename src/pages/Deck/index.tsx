import { DeckPageContainer } from './Deck.style';
import {
  CreateCard,
  DeckList,
  ErrorDeckItem,
  SectionTitle,
} from './subcomponents';
import { ErrorBoundary } from 'react-error-boundary';
import { PageHeading } from '@/Components';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function Deck() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <DeckPageContainer>
      <PageHeading>Deck</PageHeading>
      <SectionTitle>카드 생성</SectionTitle>
      <CreateCard />
      <ErrorBoundary onReset={reset} fallbackRender={ErrorDeckItem}>
        <DeckList />
      </ErrorBoundary>
    </DeckPageContainer>
  );
}

export default Deck;
