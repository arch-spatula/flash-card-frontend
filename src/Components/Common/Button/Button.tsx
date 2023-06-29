import theme from '@/styles/theme';
import {
  LoaderWrapper,
  NewButtonButton,
  NewButtonLink,
  NewButtonWrapper,
  TextWrapper,
} from './Button.style';
import { PulseLoader } from 'react-spinners';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  width?: number | 'grow';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  hierarchy?: 'primary' | 'secondary' | 'ghost';
  color?: 'green' | 'red' | 'neutral';
};

export function Button({
  children,
  onClick,
  isLoading = false,
  href,
  width,
  hierarchy = 'primary',
  disabled = false,
  color = 'green',
}: ButtonProps) {
  const handleColor = (color: 'green' | 'red' | 'neutral') => {
    if (hierarchy === 'primary') {
      return theme.colors.white;
    } else {
      if (color === 'green') return theme.colors.green500;
      if (color === 'red') return theme.colors.red500;
      if (color === 'neutral') return theme.colors.gray700;
    }
  };
  return (
    <NewButtonWrapper
      width={width}
      disabled={disabled}
      hierarchy={hierarchy}
      isLoading={isLoading}
      color={color}
    >
      {href && (
        <NewButtonLink
          to={href}
          {...(disabled && { tabIndex: -1 })}
          disabled={disabled}
        >
          <TextWrapper
            isLoading={isLoading}
            hierarchy={hierarchy}
            disabled={disabled}
            color={color}
          >
            {children}
          </TextWrapper>
        </NewButtonLink>
      )}
      {onClick && (
        <NewButtonButton
          onClick={onClick}
          disabled={disabled || isLoading}
          {...(disabled && { tabIndex: -1 })}
        >
          <TextWrapper
            isLoading={isLoading}
            hierarchy={hierarchy}
            disabled={disabled}
            color={color}
          >
            {children}
          </TextWrapper>
        </NewButtonButton>
      )}
      {isLoading && (
        <LoaderWrapper>
          <PulseLoader
            color={handleColor(color)}
            loading
            margin={4}
            size={12}
            speedMultiplier={0.5}
          />
        </LoaderWrapper>
      )}
    </NewButtonWrapper>
  );
}
