import { ErrorCards, PageHeading } from '@/Components';
import { ErrorBoundary } from 'react-error-boundary';
import { CardPageContainer } from './Cards.style';
import { NowDeck } from './subcomponents';
import { useEndRedirectToCards } from '@/hooks';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function Cards() {
  useEndRedirectToCards();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <CardPageContainer>
      <PageHeading>Cards</PageHeading>
      <ErrorBoundary onReset={reset} fallbackRender={ErrorCards}>
        <NowDeck />
      </ErrorBoundary>
    </CardPageContainer>
  );
}

export default Cards;
