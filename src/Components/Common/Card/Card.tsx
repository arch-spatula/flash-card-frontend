import { Button, Input } from '..';
import { useInput } from '../../../hooks';
import { CardContainer, Question, SubmitForm } from './Card.style';

export function Card({ question }: Card) {
  const { inputVal, changeInputVal } = useInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <CardContainer>
      <Question>{question}</Question>
      <SubmitForm onSubmit={handleSubmit}>
        <Input value={inputVal} onChange={changeInputVal} hideHelper />
        <Button disabled={!inputVal}>제출</Button>
      </SubmitForm>
    </CardContainer>
  );
}
