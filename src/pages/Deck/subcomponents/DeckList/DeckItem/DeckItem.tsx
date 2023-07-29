import { Card, EmptyCards } from '@/Components';
import {
  CardContainer,
  DeckItemContainer,
  SectionTitle,
} from './DeckItem.style';

type DeckItemProps = { title: string; cards: Card[] };

export function DeckItem({ title, cards }: DeckItemProps) {
  return (
    <DeckItemContainer>
      <SectionTitle>{title}</SectionTitle>
      <>
        {cards.length !== 0 ? (
          <CardContainer>
            {cards.map((card) => (
              <Card {...card} key={card._id} />
            ))}
          </CardContainer>
        ) : (
          <EmptyCards />
        )}
      </>
    </DeckItemContainer>
  );
}
