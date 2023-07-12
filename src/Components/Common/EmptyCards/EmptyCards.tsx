import { NoCardContainer, NoCardMessage } from './EmptyCards.style';

export function EmptyCards() {
  return (
    <NoCardContainer>
      <NoCardMessage>카드가 없습니다.</NoCardMessage>
    </NoCardContainer>
  );
}
