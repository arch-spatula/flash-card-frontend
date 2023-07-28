import { Button, CardContainer, DisabledText } from '..';
import { ErrorCardsContainer } from './ErrorCards.style';

type ErrorCardsProps = {
  error: ErrorResponse;
  resetErrorBoundary: resetErrorBoundary;
};

export function ErrorCards({ error, resetErrorBoundary }: ErrorCardsProps) {
  return (
    <CardContainer>
      <ErrorCardsContainer>
        <DisabledText>{error.msg}</DisabledText>
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </ErrorCardsContainer>
    </CardContainer>
  );
}
