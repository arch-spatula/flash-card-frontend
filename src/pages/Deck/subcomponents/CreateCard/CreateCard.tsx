import { useCardMutation, useInput } from '@/hooks';
import { Button, Input } from '@/Components';
import { AddCardContainer } from './CreateCard.style';

export function CreateCard() {
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
    <>
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
    </>
  );
}
