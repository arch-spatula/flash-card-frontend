import { useQuery } from '@tanstack/react-query';
import { getCardsAPI } from '../../api/cardClient';
import { PageHeading } from '../../Components';
import { PulseLoader } from 'react-spinners';

function Cards() {
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
  });

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <div>
      <PageHeading>Cards</PageHeading>
      {isLoading ? (
        <PulseLoader
          color="#10B981"
          loading
          margin={4}
          size={20}
          speedMultiplier={0.5}
        />
      ) : (
        <>
          {cards ? (
            <ul>
              {cards.map((card) => (
                <li key={card._id}>
                  <h3>{card.question}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>카드가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cards;
