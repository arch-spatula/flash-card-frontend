import { Card, PageHeading } from '../../Components';
import { PulseLoader } from 'react-spinners';
import {
  CardContainer,
  CardPageContainer,
  LoaderContainer,
} from './Cards.style';
import { useCards } from '@/hooks';
import theme from '../../styles/theme';

function Cards() {
  const { cards, isLoading, error } = useCards();

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <CardPageContainer>
      <PageHeading>Cards</PageHeading>
      {isLoading ? (
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
