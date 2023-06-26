import { useCallback } from 'react';
import { Button, DropdownMenu, Input } from '..';
import { useCardSide, useInput } from '../../../hooks';
import {
  AnswerContainer,
  CardBackContainer,
  CardFrontContainer,
  CardWrapper,
  Paragraph,
  Question,
  SubmitForm,
  CardEditContainer,
} from './Card.style';
import { useMutation } from '@tanstack/react-query';
import { updateCardsAPI } from '../../../api/cardClient';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { CardSetting } from './CardSetting';

const correctAtom = atom(false);

const inputAtom = atom('');

function useAtomInput() {
  const [inputVal, setInputVal] = useAtom(inputAtom);
  const changeInputVal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    [setInputVal]
  );

  const resetInputVal = useCallback(() => {
    setInputVal('');
  }, [setInputVal]);

  return { inputVal, changeInputVal, resetInputVal };
}

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */
export function Card({ question, answer, _id, stackCount }: Card) {
  return (
    <CardWrapper>
      {_id && (
        <>
          <EditCard
            _id={_id}
            question={question}
            answer={answer}
            stackCount={stackCount}
          />
          <CardFront _id={_id} question={question} answer={answer} />
          <CardBack
            _id={_id}
            answer={answer}
            question={question}
            stackCount={stackCount}
          />
        </>
      )}
    </CardWrapper>
  );
}

type CardBackProps = {
  _id: string;
  answer: string;
  question: string;
  stackCount: number;
};

function CardBack({ _id, answer, question, stackCount }: CardBackProps) {
  const { mutate: updateCard } = useMutation({ mutationFn: updateCardsAPI });
  const { cardSide, toggleFront } = useCardSide();

  const isCorrect = useAtomValue(correctAtom);
  const { inputVal, resetInputVal } = useAtomInput();

  const handleConform = () => {
    resetInputVal();
    toggleFront();

    if (_id) {
      const submitDate = new Date();
      if (isCorrect) {
        updateCard({
          id: _id,
          card: { question, answer, submitDate, stackCount: stackCount + 1 },
        });
      } else {
        updateCard({
          id: _id,
          card: { question, answer, submitDate, stackCount: 0 },
        });
      }
    }
  };

  return (
    <CardBackContainer active={cardSide === 'back'} isCorrect={isCorrect}>
      <CardSetting _id={_id} />
      <AnswerContainer>
        <Paragraph>정답: {answer}</Paragraph>
        <Paragraph>풀이: {inputVal}</Paragraph>
      </AnswerContainer>
      <Button onClick={handleConform}>확인</Button>
    </CardBackContainer>
  );
}

type CardFrontProps = {
  _id: string;
  question: string;
  answer: string;
};

function CardFront({ _id, question, answer }: CardFrontProps) {
  const { cardSide, toggleBack } = useCardSide();
  const setIsCorrect = useSetAtom(correctAtom);

  const { inputVal, changeInputVal } = useAtomInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleBack();

    const regex = new RegExp(answer, 'i');
    setIsCorrect(() => regex.test(inputVal));
  };

  return (
    <CardFrontContainer active={cardSide === 'front'}>
      <CardSetting _id={_id} />
      <Question>{question}</Question>
      <SubmitForm onSubmit={handleSubmit}>
        <Input
          value={inputVal}
          onChange={changeInputVal}
          hideHelper
          width={180}
        />
        <Button disabled={!inputVal}>제출</Button>
      </SubmitForm>
    </CardFrontContainer>
  );
}

type EditCardProps = {
  _id: string;
  question: string;
  answer: string;
  stackCount: number;
};

function EditCard({ _id, question, answer, stackCount }: EditCardProps) {
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
