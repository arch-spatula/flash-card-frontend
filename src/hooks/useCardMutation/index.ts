import { createCardsAPI, deleteCardsAPI, updateCardsAPI } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCardMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateCard } = useMutation({
    mutationFn: updateCardsAPI,
    onMutate: async (cardItem) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });

      const previousCards: Card[] = queryClient.getQueryData(['cards']) ?? [];

      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (oldCards) {
          return [...oldCards].map((card) =>
            card._id === cardItem.id
              ? { _id: cardItem.id, ...cardItem.card }
              : card
          );
        } else return [];
      });
      return { previousCards };
    },
    onError: (_err, _cardItem, context) => {
      if (context) queryClient.setQueryData(['cards'], context.previousCards);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

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

  const { mutate: createCard, isLoading: isCreateCardLoading } = useMutation({
    mutationFn: createCardsAPI,

    onSuccess: (newCardId, newCard) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (oldCards && typeof newCardId === 'string')
          return [...oldCards, { ...newCard, _id: newCardId }];
        else return [];
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  return { deleteCard, updateCard, createCard, isCreateCardLoading };
}
