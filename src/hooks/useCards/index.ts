import { useQuery } from '@tanstack/react-query';
import { cardLoader, cardsQuery } from '@/utils';
import { useLoaderData } from 'react-router-dom';

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;
  const query = cardsQuery();
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery<Card[], ErrorResponse>({
    ...query,
    initialData: loaderCards,
    useErrorBoundary: true,
  });

  return { cards, isLoading, error };
}
