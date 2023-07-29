import { CardContainerWrapper } from './CardContainer.style';

type CardContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContainer({ children }: CardContainerProps) {
  return <CardContainerWrapper>{children}</CardContainerWrapper>;
}
