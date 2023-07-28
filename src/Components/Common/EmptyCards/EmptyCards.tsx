import { Button } from '..';
import {
  ErrorCardMessage,
  NoCardContainer,
  NoCardMessage,
} from './EmptyCards.style';

type EmptyCardsProps = {
  error?: ErrorResponse;
  resetErrorBoundary?: resetErrorBoundary;
};

export function EmptyCards({ error, resetErrorBoundary }: EmptyCardsProps) {
  return (
    <NoCardContainer>
      {error ? (
        <ErrorCardMessage>
          <NoCardMessage>{error.msg}</NoCardMessage>
          <Button onClick={resetErrorBoundary}>retry</Button>
        </ErrorCardMessage>
      ) : (
        <NoCardMessage>카드가 없습니다.</NoCardMessage>
      )}
    </NoCardContainer>
  );
}
