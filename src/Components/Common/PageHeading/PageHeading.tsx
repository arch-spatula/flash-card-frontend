import { Title } from './PageHeading.style';

type PageHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export function PageHeading({ children, ...other }: PageHeadingProps) {
  return <Title {...other}>{children}</Title>;
}
