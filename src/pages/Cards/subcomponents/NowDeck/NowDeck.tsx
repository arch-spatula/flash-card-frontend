import { useCards, useEndRedirectToCards } from '@/hooks';
import { calDiffBetweenNowFromNextInterval } from '@/utils';
import { CardContainer, LoaderContainer } from '../../Cards.style';
import { PulseLoader } from 'react-spinners';
import theme from '@/styles/theme';
import { Card, EmptyCards } from '@/Components';

export function NowDeck() {
  const res = useCards();
  console.log('useCards', res.cards, res.isLoading, res.error);
  useEndRedirectToCards();

  if (res.error instanceof Error) {
    console.log('error', res.cards, res.isLoading, res.error);
    return <div>{`${res.error}`}</div>;
  }

  const currentCards =
    res.cards?.filter(
      (card) =>
        calDiffBetweenNowFromNextInterval(card.submitDate, card.stackCount) ===
        0
    ) ?? [];

  return (
    <>
      {res.isLoading ? (
        <LoaderContainer>
          <PulseLoader
            color={theme.colors.green500}
            loading
            margin={4}
            size={20}
            speedMultiplier={0.5}
          />
        </LoaderContainer>
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
