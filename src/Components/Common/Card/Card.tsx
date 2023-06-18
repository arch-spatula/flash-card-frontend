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

export function Card({ question, answer }: Card) {
  const { inputVal, changeInputVal } = useInput();
  const [active, setActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive((prev) => !prev);
  };

  const handleConform = () => {
    setActive(false);
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
      <CardBackContainer active={active}>
        <p>{answer}</p>
        <p>{inputVal}</p>
        <Button onClick={handleConform}>확인</Button>
      </CardBackContainer>
    </CardWrapper>
  );
}
