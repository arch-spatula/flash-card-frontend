import { useState } from 'react';
import { Button, Input } from '..';
import { useInput } from '../../../hooks';
import {
  CardBackContainer,
  CardFrontContainer,
  CardWrapper,
  NextIntervalDate,
  Question,
  SubmitForm,
} from './Card.style';
import { formatDate } from '../../../utils';

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */

export function Card({ question, answer, submitDate, stackCount }: Card) {
  const { inputVal, changeInputVal } = useInput();
  const [active, setActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleConform = () => {
    setActive(false);
  };

  const showDate = formatDate(submitDate, stackCount);

  return (
    <CardWrapper>
      <CardFrontContainer active={active}>
        <NextIntervalDate>{`${showDate}`}</NextIntervalDate>
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
      <CardBackContainer active={active}>
        <p>{answer}</p>
        <p>{inputVal}</p>
        <Button onClick={handleConform}>확인</Button>
      </CardBackContainer>
    </CardWrapper>
  );
}
