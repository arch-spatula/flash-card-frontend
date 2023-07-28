import { useCards, useEndRedirectToCards } from '@/hooks';
import { calDiffBetweenNowFromNextInterval } from '@/utils';
import { Card, EmptyCards, Spinner } from '@/Components';
import { CardContainer, NoCardContainer } from './NowDeck.style';

export function NowDeck() {
  useEndRedirectToCards();
  const { cards, isLoading } = useCards();

  const currentCards =
    cards?.filter(
      (card) =>
        calDiffBetweenNowFromNextInterval(card.submitDate, card.stackCount) ===
        0
    ) ?? [];

  if (isLoading)
    return (
      <NoCardContainer>
        <Spinner />
      </NoCardContainer>
    );

  return (
    <>
      {cards && (
        <CardContainer>
          {currentCards.length === 0 ? (
            <EmptyCards />
          ) : (
            currentCards.map((card) => <Card {...card} key={card._id} />)
          )}
        </CardContainer>
      )}
    </>
  );
}
