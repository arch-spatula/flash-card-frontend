import { createPortal } from 'react-dom';
import {
  DialogFooterContainer,
  DialogContainer,
  Overlay,
  DialogHeaderContainer,
  DialogClose,
  DialogHeaderTitle,
  DialogBodyContainer,
  WindowContainer,
} from './Dialog.style';
import { Button } from '..';
import theme from '@/styles/theme';

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

type DialogHeaderProps = {
  closeCB: closeCB;
  title: string;
};

function DialogHeader({ title, closeCB }: DialogHeaderProps) {
  return (
    <DialogHeaderContainer>
      <DialogHeaderTitle>{title}</DialogHeaderTitle>
      <DialogClose onClick={closeCB}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke={theme.colors.gray700}
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </DialogClose>
    </DialogHeaderContainer>
  );
}

type DialogBodyProps = {
  paragraph: string;
};

function DialogBody({ paragraph }: DialogBodyProps) {
  return (
    <DialogBodyContainer>
      <p>{paragraph}</p>
    </DialogBodyContainer>
  );
}

type DialogFooterProps = {
  primaryLabel: string;
  secondaryLabel: string;
  closeCB: closeCB;
  actionCB: () => void;
};

function DialogFooter({
  actionCB,
  closeCB,
  primaryLabel = '실행',
  secondaryLabel = '취소',
}: DialogFooterProps) {
  return (
    <DialogFooterContainer>
      <Button hierarchy="primary" onClick={actionCB} width={'grow'}>
        {primaryLabel}
      </Button>
      <Button hierarchy="secondary" onClick={closeCB} width={'grow'}>
        {secondaryLabel}
      </Button>
    </DialogFooterContainer>
  );
}
