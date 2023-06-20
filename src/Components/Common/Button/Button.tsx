import {
  ButtonWrapper,
  LinkWrapper,
  LoaderWrapper,
  TextWrapper,
} from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  width?: number | 'grow';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  hierarchy?: 'primary' | 'secondary';
};

/**
 * @todo hierarchy "ghost" 추가하기
 */
export function Button({
  children,
  onClick,
  isLoading = false,
  href,
  width,
  hierarchy = 'primary',
  ...other
}: ButtonProps) {
  if (href) {
    return (
      <LinkWrapper
        to={href}
        disabled={isLoading}
        isLoading={isLoading}
        width={width}
        hierarchy={hierarchy}
      >
        <TextWrapper isLoading={isLoading}>{children}</TextWrapper>
      </LinkWrapper>
    );
  }
  return (
    <ButtonWrapper
      onClick={onClick}
      disabled={isLoading}
      isLoading={isLoading}
      width={width}
      hierarchy={hierarchy}
      {...other}
    >
      <TextWrapper isLoading={isLoading}>{children}</TextWrapper>
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
