import { useCards, useEndRedirectToCards } from '@/hooks';
import { calDiffBetweenNowFromNextInterval } from '@/utils';
import { Card, EmptyCards, Spinner } from '@/Components';
import { CardContainer, NoCardContainer } from './NowDeck.style';

export function NowDeck() {
  const res = useCards();
  useEndRedirectToCards();

  const currentCards =
    res.cards?.filter(
      (card) =>
        calDiffBetweenNowFromNextInterval(card.submitDate, card.stackCount) ===
        0
    ) ?? [];

  return (
    <>
      {res.isLoading ? (
        <NoCardContainer>
          <Spinner />
        </NoCardContainer>
      ) : (
        <>
          {res.cards ? (
            <CardContainer>
              {currentCards.length === 0 ? (
                <EmptyCards />
              ) : (
                currentCards.map((card) => <Card {...card} key={card._id} />)
              )}
            </CardContainer>
          ) : (
            <div>
              <p>카드가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
