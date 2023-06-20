import { useMutation } from '@tanstack/react-query';
import { Button, Card, Input, PageHeading } from '../../Components';
import { useCards, useInput } from '../../hooks';
import { AddCardContainer } from './Deck.style';
import { createCardsAPI } from '../../api/cardClient';

function Deck() {
  const { cards, error } = useCards();
  const {
    inputVal: question,
    changeInputVal: changeQuestion,
    resetInputVal: resetQuestion,
  } = useInput();
  const {
    inputVal: answer,
    changeInputVal: changeAnswer,
    resetInputVal: resetAnswer,
  } = useInput();

  const { mutate } = useMutation({ mutationFn: createCardsAPI });

  const disabled = [question, answer].some((elem) => !elem);

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        question,
        answer,
        submitDate: new Date(),
        stackCount: 0,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          resetQuestion();
          resetAnswer();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <div>
      <PageHeading>Deck</PageHeading>
      <AddCardContainer onSubmit={handleSubmit}>
        <h3>문제</h3>
        <Input value={question} onChange={changeQuestion} placeholder="설정" />
        <h3>정답</h3>
        <Input value={answer} onChange={changeAnswer} placeholder="configure" />
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
