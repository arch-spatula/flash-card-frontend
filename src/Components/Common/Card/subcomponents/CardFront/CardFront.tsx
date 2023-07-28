import { formatDate } from '@/utils';
import { Button, Input } from '../../..';
import { useAtomInput, useCardSide, useCorrect } from '@/hooks';
import { CardSetting } from '../CardSetting';
import {
  CardFrontContainer,
  FormattedDateContainer,
  FormattedDateParagraph,
  Question,
  SubmitForm,
} from './CardFront.style';
import { useMemo } from 'react';

type CardFrontProps = Omit<Card, '_id' | 'userId'> & {
  _id: Exclude<Card['_id'], undefined>;
};

export function CardFront({
  _id,
  question,
  answer,
  submitDate,
  stackCount,
}: CardFrontProps) {
  const { cardSide, dispatch } = useCardSide();
  const { setIsCorrect } = useCorrect();
  const { inputVal, changeInputVal } = useAtomInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch('back');

    const regex = new RegExp(answer, 'i');
    setIsCorrect(() => regex.test(inputVal));
  };

  const formattedDate = useMemo(
    () => formatDate(submitDate, stackCount),
    [submitDate, stackCount]
  );

  return (
    <CardFrontContainer active={cardSide === 'front'}>
      <FormattedDateContainer>
        <FormattedDateParagraph>{formattedDate}</FormattedDateParagraph>
      </FormattedDateContainer>
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
