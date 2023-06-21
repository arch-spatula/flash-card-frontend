import { useCallback, useState } from 'react';
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
} from './Card.style';
import { useMutation } from '@tanstack/react-query';
import { deleteCardsAPI, updateCardsAPI } from '../../../api/cardClient';

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */

export function Card({ question, answer, _id, stackCount }: Card) {
  const { inputVal, changeInputVal, resetInputVal } = useInput();
  const [active, setActive] = useState(false);

  const { mutate: updateCard } = useMutation({ mutationFn: updateCardsAPI });
  const { mutate: deleteCard } = useMutation({ mutationFn: deleteCardsAPI });

  const [isEditing, setIsEditing] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);

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

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <CardWrapper>
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
      <CardBackContainer active={active} isCorrect={isCorrect}>
        <CardSetting handleDelete={handleDelete} handleEdit={handleEdit} />
        <AnswerContainer>
          <Paragraph>정답: {answer}</Paragraph>
          <Paragraph>풀이: {inputVal}</Paragraph>
        </AnswerContainer>
        <Button onClick={handleConform}>확인</Button>
      </CardBackContainer>
    </CardWrapper>
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
