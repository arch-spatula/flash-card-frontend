import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCardSide, useInput } from '../../../../../hooks';
import { updateCardsAPI } from '../../../../../api/cardClient';
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

  const queryClient = useQueryClient();
  const { mutate: updateCard } = useMutation({
    mutationFn: updateCardsAPI,
    onMutate: async (cardItem) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });

      const previousCards: Card[] = queryClient.getQueryData(['cards']) ?? [];

      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (oldCards) {
          return [...oldCards].map((card) =>
            card._id === cardItem.id
              ? { _id: cardItem.id, ...cardItem.card }
              : card
          );
        } else return [];
      });
      return { previousCards };
    },
    onError: (_err, _cardItem, context) => {
      if (context) queryClient.setQueryData(['cards'], context.previousCards);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

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
