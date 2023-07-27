import { useCards, useEndRedirectToCards } from '@/hooks';
import { calDiffBetweenNowFromNextInterval } from '@/utils';
import { PulseLoader } from 'react-spinners';
import theme from '@/styles/theme';
import { Card, EmptyCards } from '@/Components';
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
          <PulseLoader
            color={theme.colors.green500}
            loading
            margin={4}
            size={20}
            speedMultiplier={0.5}
          />
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
