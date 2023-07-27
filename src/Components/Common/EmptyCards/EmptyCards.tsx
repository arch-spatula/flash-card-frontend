import { NoCardContainer, NoCardMessage } from './EmptyCards.style';

type EmptyCardsProps = {
  error?: ErrorResponse;
};

export function EmptyCards({ error }: EmptyCardsProps) {
  return (
    <NoCardContainer>
      <NoCardMessage>{error ? error.msg : '카드가 없습니다.'}</NoCardMessage>
    </NoCardContainer>
  );
}
