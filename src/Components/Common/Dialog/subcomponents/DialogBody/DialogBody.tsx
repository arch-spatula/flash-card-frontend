import { DialogBodyContainer, DialogParagraph } from './DialogBody.style';

type DialogBodyProps = {
  paragraph: string;
};

export function DialogBody({ paragraph }: DialogBodyProps) {
  return (
    <DialogBodyContainer>
      <DialogParagraph>{paragraph}</DialogParagraph>
    </DialogBodyContainer>
  );
}
