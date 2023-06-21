import { Card, PageHeading } from '../../Components';
import { PulseLoader } from 'react-spinners';
import {
  CardContainer,
  CardPageContainer,
  LoaderContainer,
} from './Cards.style';
import { useCards } from '../../hooks';

function Cards() {
  // const { cards, isLoading, error } = useCards();
  const { cards, error } = useCards();
  const isLoading = true;

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <CardPageContainer>
      <PageHeading>Cards</PageHeading>
      {isLoading ? (
        <LoaderContainer>
          <PulseLoader
            color="#10B981"
            loading
            margin={4}
            size={20}
            speedMultiplier={0.5}
          />
        </LoaderContainer>
      ) : (
        <>
          {cards ? (
            <CardContainer>
              {cards.map((card) => (
                <Card {...card} key={card._id} />
              ))}
            </CardContainer>
          ) : (
            <div>
              <p>카드가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </CardPageContainer>
  );
}

export default Cards;
