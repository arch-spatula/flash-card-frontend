import { useCallback } from 'react';
import { Button, DropdownMenu, Input } from '..';
import { useInput } from '../../../hooks';
import {
  AnswerContainer,
  CardBackContainer,
  CardFrontContainer,
  CardWrapper,
  MenuWrapper,
  Paragraph,
  Question,
  SubmitForm,
  CardEditContainer,
} from './Card.style';
import { useMutation } from '@tanstack/react-query';
import { deleteCardsAPI, updateCardsAPI } from '../../../api/cardClient';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

type CardSide = 'front' | 'back' | 'edit';

const activeAtom = atom(false);
const editingAtom = atom(false);
const correctAtom = atom(false);

const cardSideAtom = atom<CardSide>('front');
const prevCache: { cache: CardSide } = { cache: 'front' };

function useCardSide() {
  const [cardSide, setCardSide] = useAtom(cardSideAtom);

  const toggleFront = useCallback(() => {
    if (cardSide !== 'front') {
      prevCache.cache = cardSide;
      setCardSide('front');
    }
  }, [cardSide, setCardSide]);

  const toggleBack = useCallback(() => {
    if (cardSide !== 'back') {
      prevCache.cache = cardSide;
      setCardSide('back');
    }
  }, [cardSide, setCardSide]);

  const toggleEdit = useCallback(() => {
    if (cardSide !== 'edit') {
      prevCache.cache = cardSide;
      setCardSide('edit');
    }
  }, [cardSide, setCardSide]);

  const togglePrev = useCallback(() => {
    setCardSide(prevCache.cache);
  }, [setCardSide]);

  return { toggleFront, toggleBack, toggleEdit, togglePrev, cardSide };
}

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
  const active = useAtomValue(activeAtom);
  const isCorrect = useAtomValue(correctAtom);

  return (
    <CardWrapper>
      <>
        {_id && (
          <EditCard
            _id={_id}
            active={active}
            question={question}
            answer={answer}
            stackCount={stackCount}
          />
        )}
      </>
      <>
        {_id && (
          <CardFront
            _id={_id}
            active={active}
            question={question}
            answer={answer}
          />
        )}
      </>
      <>
        {_id && (
          <EditCard
            _id={_id}
            question={question}
            answer={answer}
            stackCount={stackCount}
            active={!active}
          />
        )}
      </>
      <>
        {_id && (
          <CardBack
            _id={_id}
            answer={answer}
            active={active}
            isCorrect={isCorrect}
            question={question}
            stackCount={stackCount}
          />
        )}
      </>
    </CardWrapper>
  );
}

type CardBackProps = {
  _id: string;
  active: boolean;
  isCorrect: boolean;
  answer: string;
  question: string;
  stackCount: number;
};

function CardBack({
  _id,
  active,
  isCorrect,
  answer,
  question,
  stackCount,
}: CardBackProps) {
  const { mutate: updateCard } = useMutation({ mutationFn: updateCardsAPI });
  const { cardSide, toggleFront, toggleEdit } = useCardSide();

  const setIsEditing = useSetAtom(editingAtom);
  const setActive = useSetAtom(activeAtom);
  // const [cardSide, setCardSide] = useAtom(cardSideAtom);

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

  const handleEdit = useCallback(() => {
    toggleEdit();
  }, [toggleEdit]);

  return (
    <CardBackContainer active={cardSide === 'back'} isCorrect={isCorrect}>
      <CardSetting _id={_id} handleEdit={handleEdit} />
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
  active: boolean;
  question: string;
  answer: string;
};

function CardFront({ _id, active, question, answer }: CardFrontProps) {
  // const setIsEditing = useSetAtom(editingAtom);
  const { cardSide, toggleBack, toggleEdit } = useCardSide();
  const setActive = useSetAtom(activeAtom);
  const setIsCorrect = useSetAtom(correctAtom);

  // const [cardSide, setCardSide] = useAtom(cardSideAtom);

  const { inputVal, changeInputVal } = useAtomInput();

  const handleEdit = useCallback(() => {
    toggleEdit();
  }, [toggleEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    toggleBack();

    const regex = new RegExp(answer, 'i');
    setIsCorrect(() => regex.test(inputVal));
  };

  return (
    <CardFrontContainer active={cardSide === 'front'}>
      <CardSetting _id={_id} handleEdit={handleEdit} />
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
  active: boolean;
  question: string;
  answer: string;
  stackCount: number;
};

function EditCard({
  _id,
  active,
  question,
  answer,
  stackCount,
}: EditCardProps) {
  const setIsEditing = useSetAtom(editingAtom);

  const { cardSide, togglePrev } = useCardSide();
  // const [cardSide, setCardSide] = useAtom(cardSideAtom);

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
    setIsEditing(false);
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

function CardSetting({
  handleEdit,
  _id,
}: {
  _id: string;
  handleEdit: () => void;
}) {
  const { mutate: deleteCard } = useMutation({ mutationFn: deleteCardsAPI });

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  return (
    <MenuWrapper>
      <DropdownMenu
        menuItem={[
          { label: '편집', cb: handleEdit },
          { label: '삭제', cb: handleDelete },
        ]}
        direction="right"
      />
    </MenuWrapper>
  );
}
