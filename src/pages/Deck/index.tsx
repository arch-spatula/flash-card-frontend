import { Button, ErrorBoundary, Input, PageHeading } from '../../Components';
import { useCardMutation, useInput } from '@/hooks';
import { AddCardContainer, DeckPageContainer } from './Deck.style';
import { DeckList, SectionTitle } from './subcomponents';

function Deck() {
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
        <Input
          value={question}
          onChange={changeQuestion}
          placeholder="설정"
          inputLabel="문제"
        />
        <Input
          value={answer}
          onChange={changeAnswer}
          placeholder="configure"
          inputLabel="정답"
        />
        <Button
          disabled={disabled}
          isLoading={isCreateCardLoading}
          width={'grow'}
        >
          카드 생성
        </Button>
      </AddCardContainer>
      <ErrorBoundary fallback={<h2>something went wrong???</h2>}>
        <DeckList />
      </ErrorBoundary>
    </DeckPageContainer>
  );
}

export default Deck;
