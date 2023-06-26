import { useMutation } from '@tanstack/react-query';
import { useCardSide } from '../../../../hooks';
import { useCallback } from 'react';
import { DropdownMenu } from '../..';
import { MenuWrapper } from './CardSetting.style';
import { deleteCardsAPI } from '../../../../api/cardClient';

export function CardSetting({ _id }: { _id: string }) {
  const { toggleEdit } = useCardSide();
  const { mutate: deleteCard } = useMutation({ mutationFn: deleteCardsAPI });

  const handleDelete = useCallback(() => {
    if (_id) deleteCard(_id);
  }, [deleteCard, _id]);

  const handleEdit = useCallback(() => {
    toggleEdit();
  }, [toggleEdit]);

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
