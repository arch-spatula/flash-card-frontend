import { ButtonWrapper } from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

export function Button({
  children,
  onClick,
  isLoading,
  ...other
}: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} {...other}>
      {isLoading ? (
        <PulseLoader
          color="#ffffff"
          loading
          margin={4}
          size={12}
          speedMultiplier={0.5}
        />
      ) : (
        children
      )}
    </ButtonWrapper>
  );
}
