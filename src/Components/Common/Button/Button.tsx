import { ButtonWrapper } from './Button.style';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ children, onClick, ...other }: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} {...other}>
      {children}
    </ButtonWrapper>
  );
}
