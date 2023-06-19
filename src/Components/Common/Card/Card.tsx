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

/**
 * @todo 카드 앞면과 뒷면 관심사 분리하기
 */

export function Card({ question, answer, submitDate }: Card) {
  const { inputVal, changeInputVal } = useInput();
  const [active, setActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleConform = () => {
    setActive(false);
  };

  const formatter = new Intl.RelativeTimeFormat('ko');
  const diff = +new Date() - +new Date(submitDate);

  const showDate = formatter.format(
    Math.round(diff / (1000 * 60 * 60 * 24)),
    'days'
  );

  return (
    <CardWrapper>
      <CardFrontContainer active={active}>
        <p>{`${showDate}`}</p>
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
