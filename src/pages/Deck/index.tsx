import { Button, Card, Input, PageHeading } from '../../Components';
import { useInput } from '../../hooks';
import { useCards } from '../../hooks/useCard';
import { AddCardContainer } from './Deck.style';

function Deck() {
  const { cards, error } = useCards();
  const { inputVal: questionVal, changeInputVal: changeQuestionVal } =
    useInput();
  const { inputVal: answerVal, changeInputVal: changeAnswerVal } = useInput();

  const disabled = [questionVal, answerVal].some((elem) => !elem);

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <div>
      <PageHeading>Deck</PageHeading>
      <AddCardContainer>
        <h3>문제</h3>
        <Input
          value={questionVal}
          onChange={changeQuestionVal}
          placeholder="설정"
        />
        <h3>정답</h3>
        <Input
          value={answerVal}
          onChange={changeAnswerVal}
          placeholder="configure"
        />
        <Button disabled={disabled}>카드 생성????????????????</Button>
      </AddCardContainer>

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
