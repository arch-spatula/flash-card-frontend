import { DisabledTextWrapper } from './DisabledText.style';

type DisabledTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export function DisabledText({ children }: DisabledTextProps) {
  return <DisabledTextWrapper>{children}</DisabledTextWrapper>;
}
