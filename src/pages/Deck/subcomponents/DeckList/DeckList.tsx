import { calDiffBetweenNowFromNextInterval } from '@/utils';
import { intervalMap } from '@/constant/config';
import { useMemo } from 'react';
import { SectionTitle } from '..';
import { DeckListContainer, NoCardContainer } from './DeckList.style';
import { useCards } from '@/hooks';
import { DeckItem } from './DeckItem';
import { Spinner } from '@/Components';

export function DeckList() {
  const { cards, isLoading } = useCards();

  const IntervalArray: { title: string; deck: Card[] }[] = useMemo(() => {
    const arr: { title: string; deck: Card[] }[] = [
      {
        deck: [],
        title: '지금',
      },
      {
        deck: [],
        title: '10분 내',
      },
      {
        deck: [],
        title: '1시간 내',
      },
      {
        deck: [],
        title: '1일 내',
      },
      {
        deck: [],
        title: '2일 내',
      },
      {
        deck: [],
        title: '3일 내',
      },
      {
        deck: [],
        title: '4일 내',
      },
      {
        deck: [],
        title: '1주 내',
      },
      {
        deck: [],
        title: '2주 내',
      },
      {
        deck: [],
        title: '1달 내',
      },
      {
        deck: [],
        title: '2달 내',
      },
      {
        deck: [],
        title: '분기 내',
      },
      {
        deck: [],
        title: '반기 내',
      },
      {
        deck: [],
        title: '올해 안에',
      },
    ];

    if (cards) {
      for (let j = 0; j < cards.length; j++) {
        const card = cards[j];
        const diff = calDiffBetweenNowFromNextInterval(
          card.submitDate,
          card.stackCount
        );

        if (diff === 0) {
          arr[0].deck.push(card);
          continue;
        }

        if (0 < diff && diff <= intervalMap[0] * 60 * 1000) {
          arr[1].deck.push(card);
          continue;
        }

        let find = false;
        for (let i = 0; i < intervalMap.length; i++) {
          if (
            intervalMap[i] * 60 * 1000 < diff &&
            diff <= intervalMap[i + 1] * 60 * 1000
          ) {
            arr[i + 2].deck.push(card);
            find = true;
            break;
          }
        }
        if (find) continue;
        if (intervalMap[11] * 60 * 1000 < diff) arr[13].deck.push(card);
      }
    }

    return arr;
  }, [cards]);

  if (isLoading)
    return (
      <>
        <SectionTitle>Oops! something went wrong 🤯</SectionTitle>
        <NoCardContainer>
          <Spinner />
        </NoCardContainer>
      </>
    );

  return (
    <DeckListContainer>
      {IntervalArray.map((deckItem, idx) => (
        <DeckItem title={deckItem.title} cards={deckItem.deck} key={idx} />
      ))}
    </DeckListContainer>
  );
}
