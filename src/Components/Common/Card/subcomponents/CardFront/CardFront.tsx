import { Button, Input } from '../../..';
import { useAtomInput, useCardSide, useCorrect } from '../../../../../hooks';
import { CardSetting } from '../CardSetting';
import { CardFrontContainer, Question, SubmitForm } from './CardFront.style';

type CardFrontProps = {
  _id: string;
  question: string;
  answer: string;
};

export function CardFront({ _id, question, answer }: CardFrontProps) {
  const { cardSide, toggleTo } = useCardSide();
  const { setIsCorrect } = useCorrect();

  const { inputVal, changeInputVal } = useAtomInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleTo('back');

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
