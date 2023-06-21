import { useState } from 'react';
import { Button, Input } from '..';
import { useInput } from '../../../hooks';
import {
  CardBackContainer,
  CardFrontContainer,
  CardWrapper,
  Question,
  SubmitForm,
} from './Card.style';
import { useMutation } from '@tanstack/react-query';
import { updateCardsAPI } from '../../../api/cardClient';

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */

export function Card({ question, answer, _id, stackCount }: Card) {
  const { inputVal, changeInputVal, resetInputVal } = useInput();
  const [active, setActive] = useState(false);

  const { mutate } = useMutation({ mutationFn: updateCardsAPI });

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

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
        mutate({
          id: _id,
          card: { question, answer, submitDate, stackCount: stackCount + 1 },
        });
      } else {
        mutate({
          id: _id,
          card: { question, answer, submitDate, stackCount: 0 },
        });
      }
    }
  };

  return (
    <CardWrapper>
      <CardFrontContainer active={active}>
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
        <div>
          <p>정답: {answer}</p>
          <p>풀이: {inputVal}</p>
        </div>
        <Button onClick={handleConform}>확인</Button>
      </CardBackContainer>
    </CardWrapper>
  );
}
