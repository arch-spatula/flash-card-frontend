import { Link } from 'react-router-dom';
import { ButtonWrapper, LoaderWrapper, TextWrapper } from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

/** loader는 텍스트 너비가 필요해서 2개의 VisibilityWrapper 활용 */
export function Button({
  children,
  onClick,
  isLoading = false,
  href,
  ...other
}: ButtonProps) {
  return (
    <ButtonWrapper
      onClick={onClick}
      disabled={isLoading}
      isLoading={isLoading}
      {...other}
    >
      {href ? (
        <TextWrapper isLoading={isLoading}>
          <Link to={href}>{children}</Link>
        </TextWrapper>
      ) : (
        <TextWrapper isLoading={isLoading}>{children}</TextWrapper>
      )}
      {isLoading && (
        <LoaderWrapper>
          <PulseLoader
            color="#ffffff"
            loading
            margin={4}
            size={12}
            speedMultiplier={0.5}
          />
        </LoaderWrapper>
      )}
    </ButtonWrapper>
  );
}
