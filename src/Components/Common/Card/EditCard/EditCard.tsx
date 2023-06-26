import { useMutation } from '@tanstack/react-query';
import { useCardSide, useInput } from '../../../../hooks';
import { updateCardsAPI } from '../../../../api/cardClient';
import { Button, Input } from '../..';
import { CardEditContainer } from './EditCard.style';

type EditCardProps = {
  _id: string;
  question: string;
  answer: string;
  stackCount: number;
};

export function EditCard({ _id, question, answer, stackCount }: EditCardProps) {
  const { cardSide, togglePrev } = useCardSide();

  const { mutate: updateCard } = useMutation({ mutationFn: updateCardsAPI });

  const {
    inputVal: questionVal,
    changeInputVal: changeQuestion,
    resetInputVal: resetQuestion,
  } = useInput(question);
  const {
    inputVal: answerVal,
    changeInputVal: changeAnswer,
    resetInputVal: resetAnswer,
  } = useInput(answer);

  const handleSave = () => {
    togglePrev();
    if (_id) {
      const submitDate = new Date();
      updateCard({
        id: _id,
        card: {
          question: questionVal,
          answer: answerVal,
          submitDate,
          stackCount,
        },
      });
    }
  };

  const handleCancel = () => {
    togglePrev();
    resetAnswer();
    resetQuestion();
  };

  const disabled = [
    !answerVal,
    !questionVal,
    questionVal === question && answerVal === answer,
  ].some(Boolean);

  return (
    <CardEditContainer active={cardSide === 'edit'}>
      <h3>문제</h3>
      <Input
        value={questionVal}
        onChange={changeQuestion}
        placeholder={question}
        hideHelper
      />
      <h3>정답</h3>
      <Input
        value={answerVal}
        onChange={changeAnswer}
        placeholder={answer}
        hideHelper
      />
      <Button disabled={disabled} onClick={handleSave}>
        저장
      </Button>
      <Button onClick={handleCancel}>취소</Button>
    </CardEditContainer>
  );
}
