import { getCardsAPI } from '@/api/cardClient';

export const cardsQuery = () => ({
  queryKey: ['cards'],
  queryFn: getCardsAPI,
  staleTime: 5000,
});
