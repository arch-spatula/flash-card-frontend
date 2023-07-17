import { Button } from '@/Components';
import { DialogFooterContainer } from './DialogFooter.style';

type DialogFooterProps = {
  primaryLabel: string;
  secondaryLabel: string;
  closeCB: () => void;
  actionCB: () => void;
};

export function DialogFooter({
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
