import { useQuery } from '@tanstack/react-query';
import { getCardsAPI } from '../../api/cardClient';

export function useCards() {
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cards'],
    queryFn: getCardsAPI,
    staleTime: 5000,
  });

  return { cards, isLoading, error };
}
