import { useCallback } from 'react';
import { Dialog, DropdownMenu } from '../../..';
import { MenuWrapper } from './CardSetting.style';
import { useCardMutation, useCardSide, useOutsideClick } from '@/hooks';

export function CardSetting({ _id }: { _id: string }) {
  const { toggleTo } = useCardSide();
  const { deleteCard } = useCardMutation();

  const { OutSideProvider, handleOpen, handleClose } = useOutsideClick();

  const handleDelete = useCallback(() => {
    if (_id) {
      deleteCard(_id);
      handleClose();
    }
  }, [deleteCard, _id, handleClose]);

  const handleEdit = useCallback(() => {
    toggleTo('edit');
  }, [toggleTo]);

  return (
    <MenuWrapper>
      <OutSideProvider
        component={
          <Dialog
            closeCB={handleClose}
            actionCB={handleDelete}
            paragraph="삭제하시겠습니까?"
            primaryLabel="삭제"
          />
        }
      />
      <DropdownMenu
        menuItem={[
          { label: '편집', cb: handleEdit },
          { label: '삭제', cb: handleOpen },
        ]}
        direction="right"
      />
    </MenuWrapper>
  );
}
