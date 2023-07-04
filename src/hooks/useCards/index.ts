import { useQuery } from '@tanstack/react-query';
import { cardLoader, cardsQuery } from '@/utils';
import { useLoaderData } from 'react-router-dom';

export function useCards() {
  const loaderCards = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof cardLoader>>
  >;

  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({ ...cardsQuery(), initialData: loaderCards });

  return { cards, isLoading, error };
}
