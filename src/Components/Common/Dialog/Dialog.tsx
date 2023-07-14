import { createPortal } from 'react-dom';
import { DialogContainer, Overlay, WindowContainer } from './Dialog.style';
import { useStopScroll } from '@/hooks';
import { DialogBody, DialogFooter } from './subcomponents';
import { DialogHeader } from './subcomponents/DialogHeader';

const modalRoot = document.querySelector('#modal-root');

type closeCB = () => void;

type DialogProps = {
  closeCB: closeCB;
  actionCB: () => void;
  paragraph: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function Dialog({
  closeCB,
  actionCB,
  paragraph,
  primaryLabel = '실행',
  secondaryLabel = '취소',
}: DialogProps) {
  useStopScroll();

  if (modalRoot)
    return createPortal(
      <WindowContainer>
        <DialogContainer>
          <DialogHeader title="caution" closeCB={closeCB} />
          <DialogBody paragraph={paragraph} />
          <DialogFooter
            actionCB={actionCB}
            closeCB={closeCB}
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
          />
        </DialogContainer>
        <Overlay onClick={closeCB} />
      </WindowContainer>,
      modalRoot
    );
  else return <></>;
}
