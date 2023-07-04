import type { QueryClient } from '@tanstack/react-query';
import { protectRoutes } from '../protectRoutes';
import { cardsQuery } from '@/utils';

export const cardLoader = (queryClient: QueryClient) => async () => {
  const protect = protectRoutes('signin');
  protect();

  const query = cardsQuery();
  return (
    queryClient.getQueryData<Card[]>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
