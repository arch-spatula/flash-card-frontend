import { ButtonWrapper, VisibilityWrapper } from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

/** loader는 텍스트 너비가 필요해서 2개의 VisibilityWrapper 활용 */
export function Button({
  children,
  onClick,
  isLoading,
  ...other
}: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} {...other}>
      <VisibilityWrapper visibility={!!isLoading}>
        <PulseLoader
          color="#ffffff"
          loading
          margin={4}
          size={12}
          speedMultiplier={0.5}
        />
      </VisibilityWrapper>
      <VisibilityWrapper visibility={!isLoading}>{children}</VisibilityWrapper>
    </ButtonWrapper>
  );
}
