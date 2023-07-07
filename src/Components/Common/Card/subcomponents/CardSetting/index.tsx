import { useCallback } from 'react';
import { DropdownMenu } from '../../..';
import { MenuWrapper } from './CardSetting.style';
import { useCardMutation, useCardSide } from '@/hooks';

type CardSettingProps = {
  _id: NonNullable<Card['_id']>;
};

export function CardSetting({ _id }: CardSettingProps) {
  const { toggleTo } = useCardSide();
  const { deleteCard } = useCardMutation();

  const handleDelete = useCallback(() => {
    deleteCard(_id);
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
