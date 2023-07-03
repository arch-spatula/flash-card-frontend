import { useCardMutation, useCardSide, useInput } from '@/hooks';
import { Button, Input } from '../../..';
import { CardEditContainer } from './EditCard.style';

type EditCardProps = Omit<Card, 'userId'>;

export function EditCard({
  _id,
  question,
  answer,
  stackCount,
  submitDate,
}: EditCardProps) {
  const { cardSide, togglePrev } = useCardSide();

  const { updateCard } = useCardMutation();

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

  const disabled = checkDisabled(answer, answerVal, question, questionVal);

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

/** EditCard 전용 helper 함수 */
function checkDisabled(
  answer: string,
  answerVal: string,
  question: string,
  questionVal: string
) {
  return (
    !!answerVal &&
    !!questionVal &&
    questionVal === question &&
    answerVal === answer
  );
}
