import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCardSide } from '../../../../../hooks';
import { useCallback } from 'react';
import { DropdownMenu } from '../../..';
import { MenuWrapper } from './CardSetting.style';
import { deleteCardsAPI } from '../../../../../api/cardClient';

export function CardSetting({ _id }: { _id: string }) {
  const { toggleTo } = useCardSide();
  const queryClient = useQueryClient();
  const { mutate: deleteCard } = useMutation({
    mutationFn: deleteCardsAPI,
    onMutate: async (cardId) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });

      const previousCards: Card[] = queryClient.getQueryData(['cards']) ?? [];

      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (oldCards)
          return [...oldCards].filter((card) => card._id !== cardId);
        else [];
      });
      return { previousCards };
    },
    onError: (_err, _cardId, context) => {
      if (context) queryClient.setQueryData(['cards'], context.previousCards);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  const handleEdit = useCallback(() => {
    toggleTo('edit');
  }, [toggleTo]);

  return (
    <MenuWrapper>
      <DropdownMenu
        menuItem={[
          { label: '편집', cb: handleEdit },
          { label: '삭제', cb: handleDelete },
        ]}
        direction="right"
      />
    </MenuWrapper>
  );
}
