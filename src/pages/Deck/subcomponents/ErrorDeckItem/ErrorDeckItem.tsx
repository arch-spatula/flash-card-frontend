import { ErrorCards } from '@/Components';
import { SectionTitle } from '..';

type ErrorDeckItemProps = {
  error: ErrorResponse;
  resetErrorBoundary: resetErrorBoundary;
};

export function ErrorDeckItem({
  error,
  resetErrorBoundary,
}: ErrorDeckItemProps) {
  return (
    <>
      <SectionTitle>Oops! something went wrong 🤯</SectionTitle>
      <ErrorCards error={error} resetErrorBoundary={resetErrorBoundary} />
    </>
  );
}
