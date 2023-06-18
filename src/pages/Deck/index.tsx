import { Card, PageHeading } from '../../Components';
import { useCards } from '../../hooks/useCard';

function Deck() {
  const { cards, error } = useCards();

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <div>
      <PageHeading>Deck</PageHeading>
      <div>카드 생성하기</div>
      <>
        {cards ? (
          <>
            {cards.map((card) => (
              <Card {...card} key={card._id} />
            ))}
          </>
        ) : (
          <div>
            <p>카드가 없습니다.</p>
          </div>
        )}
      </>
    </div>
  );
}

export default Deck;
