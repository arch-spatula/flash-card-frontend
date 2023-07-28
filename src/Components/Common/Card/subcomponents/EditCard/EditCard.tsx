import { useCardMutation, useCardSide, useInput } from '@/hooks';
import { Button, Input } from '../../..';
import { ButtonWrapper, CardEditContainer } from './EditCard.style';

type EditCardProps = Omit<Card, 'userId'>;

export function EditCard({
  _id,
  question,
  answer,
  stackCount,
  submitDate,
}: EditCardProps) {
  const { cardSide, dispatch } = useCardSide();

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
    dispatch('prev');
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
    dispatch('prev');
    resetAnswer();
    resetQuestion();
  };

  const disabled = checkDisabled(answer, answerVal, question, questionVal);

  return (
    <CardEditContainer active={cardSide === 'edit'}>
      <Input
        value={questionVal}
        onChange={changeQuestion}
        placeholder={question}
        hideHelper
        inputLabel="문제"
      />
      <Input
        value={answerVal}
        onChange={changeAnswer}
        placeholder={answer}
        hideHelper
        inputLabel="정답"
      />
      <ButtonWrapper>
        <Button disabled={disabled} onClick={handleSave} width={'grow'}>
          저장
        </Button>
        <Button onClick={handleCancel} hierarchy="secondary" width={'grow'}>
          취소
        </Button>
      </ButtonWrapper>
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
