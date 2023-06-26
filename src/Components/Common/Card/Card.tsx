import { CardWrapper } from './Card.style';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { EditCard } from './EditCard';

export function Card({ question, answer, _id, stackCount }: Card) {
  return (
    <CardWrapper>
      {_id && (
        <>
          <EditCard
            _id={_id}
            question={question}
            answer={answer}
            stackCount={stackCount}
          />
          <CardFront _id={_id} question={question} answer={answer} />
          <CardBack
            _id={_id}
            answer={answer}
            question={question}
            stackCount={stackCount}
          />
        </>
      )}
    </CardWrapper>
  );
}
