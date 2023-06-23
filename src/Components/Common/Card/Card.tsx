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

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */
const activeAtom = atom(false);
const editingAtom = atom(false);
const correctAtom = atom(false);

export function Card({ question, answer, _id, stackCount }: Card) {
  const { inputVal, changeInputVal, resetInputVal } = useInput();

  const [active, setActive] = useAtom(activeAtom);
  const isEditing = useAtomValue(editingAtom);
  const [isCorrect, setIsCorrect] = useAtom(correctAtom);

  const { mutate: updateCard } = useMutation({ mutationFn: updateCardsAPI });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);

    const regex = new RegExp(answer, 'i');
    setIsCorrect(() => regex.test(inputVal));
  };

  const handleConform = () => {
    setActive(false);
    resetInputVal();

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
    <CardWrapper>
      {isEditing ? (
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
      ) : (
        <>
          {_id && (
            <CardFront
              _id={_id}
              active={active}
              question={question}
              // handleEdit={handleEdit}
              handleSubmit={handleSubmit}
              inputVal={inputVal}
              changeInputVal={changeInputVal}
            />
          )}
        </>
      )}
      {isEditing ? (
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
      ) : (
        <>
          {_id && (
            <CardBack
              _id={_id}
              answer={answer}
              active={active}
              isCorrect={isCorrect}
              inputVal={inputVal}
              // handleEdit={handleEdit}
              handleConform={handleConform}
            />
          )}
        </>
      )}
    </CardWrapper>
  );
}

type CardBackProps = {
  _id: string;
  active: boolean;
  isCorrect: boolean;
  answer: string;
  handleConform: () => void;
  inputVal: string;
};

function CardBack({
  _id,
  active,
  isCorrect,
  answer,
  inputVal,
  handleConform,
}: CardBackProps) {
  const { mutate: deleteCard } = useMutation({ mutationFn: deleteCardsAPI });

  const setIsEditing = useSetAtom(editingAtom);

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  return (
    <CardBackContainer active={active} isCorrect={isCorrect}>
      <CardSetting handleDelete={handleDelete} handleEdit={handleEdit} />
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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputVal: string;
  changeInputVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CardFront({
  _id,
  active,
  question,
  handleSubmit,
  inputVal,
  changeInputVal,
}: CardFrontProps) {
  const { mutate: deleteCard } = useMutation({ mutationFn: deleteCardsAPI });

  const setIsEditing = useSetAtom(editingAtom);

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  return (
    <CardFrontContainer active={active}>
      <CardSetting handleDelete={handleDelete} handleEdit={handleEdit} />
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
    setIsEditing(false);
    resetAnswer();
    resetQuestion();
  };

  const disabled = [
    !answerVal,
    !questionVal,
    questionVal === question && answerVal === answer,
  ].some(Boolean);

  return (
    <CardEditContainer active={active}>
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
  handleDelete,
  handleEdit,
}: {
  handleDelete: () => void;
  handleEdit: () => void;
}) {
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
