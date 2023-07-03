import { useMutation } from '@tanstack/react-query';
import { Button, Input, PageHeading } from '../../Components';
import { useCards, useInput } from '../../hooks';
import { AddCardContainer, DeckPageContainer } from './Deck.style';
import { createCardsAPI } from '../../api/cardClient';
import { DeckList, SectionTitle } from './subcomponents';

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
    <DeckPageContainer>
      <PageHeading>Deck</PageHeading>
      <SectionTitle>카드 생성</SectionTitle>
      <AddCardContainer onSubmit={handleSubmit}>
        <h3>문제</h3>
        <Input value={question} onChange={changeQuestion} placeholder="설정" />
        <h3>정답</h3>
        <Input value={answer} onChange={changeAnswer} placeholder="configure" />
        <Button disabled={disabled}>카드 생성</Button>
      </AddCardContainer>

      {cards && <DeckList cards={cards} />}
    </DeckPageContainer>
  );
}

export default Deck;
