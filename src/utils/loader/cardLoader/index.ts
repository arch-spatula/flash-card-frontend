import { protectRoutes } from '../protectRoutes';
import { cardsQuery } from '@/utils';
import queryClient from '@/libs/queryClient';

export const cardLoader = () => async () => {
  const protect = protectRoutes('signin');
  protect();

  const query = cardsQuery();
  try {
    return (
      queryClient.getQueryData<Card[]>(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  } catch (error) {
    queryClient.invalidateQueries({ queryKey: ['cards'] });
    return [];
  }
};
