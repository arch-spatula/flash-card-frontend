import {
  useAtomInput,
  useCardMutation,
  useCardSide,
  useCorrect,
} from '@/hooks';
import {
  AnswerContainer,
  CardBackContainer,
  Paragraph,
} from './CardBack.style';
import { CardSetting } from '../CardSetting';
import { Button } from '../../..';

type CardBackProps = {
  _id: string;
  answer: string;
  question: string;
  stackCount: number;
};

export function CardBack({ _id, answer, question, stackCount }: CardBackProps) {
  const { cardSide, toggleTo } = useCardSide();
  const { updateCard } = useCardMutation();

  const { isCorrect } = useCorrect();
  const { inputVal, resetInputVal } = useAtomInput();

  const handleConform = () => {
    resetInputVal();
    toggleTo('front');

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
    <CardBackContainer active={cardSide === 'back'} isCorrect={isCorrect}>
      <CardSetting _id={_id} />
      <AnswerContainer>
        <Paragraph>정답: {answer}</Paragraph>
        <Paragraph>풀이: {inputVal}</Paragraph>
      </AnswerContainer>
      <Button onClick={handleConform}>확인</Button>
    </CardBackContainer>
  );
}
