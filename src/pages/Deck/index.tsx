import { Button, Input, PageHeading } from '../../Components';
import { useCardMutation, useCards, useInput } from '@/hooks';
import { AddCardContainer, DeckPageContainer } from './Deck.style';
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

  const { createCard, isCreateCardLoading } = useCardMutation();

  const disabled = [question, answer].some((elem) => !elem);

  if (typeof cards === 'string' || error) {
    return <div>{`${error}`}</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCard(
      {
        question,
        answer,
        submitDate: new Date(),
        stackCount: 0,
      },
      {
        onSuccess: () => {
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
        <Button disabled={disabled} isLoading={isCreateCardLoading}>
          카드 생성
        </Button>
      </AddCardContainer>

      {cards && <DeckList cards={cards} />}
    </DeckPageContainer>
  );
}

export default Deck;
