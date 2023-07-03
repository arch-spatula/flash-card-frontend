import theme from '@/styles/theme';
import {
  LoaderWrapper,
  CustomButton,
  CustomLink,
  ButtonWrapper,
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
  ...other
}: ButtonProps) {
  const handleColor = (color: 'green' | 'red' | 'neutral') => {
    if (hierarchy === 'primary') return theme.colors.white;

    const colorMap = {
      green: theme.colors.green500,
      red: theme.colors.red500,
      neutral: theme.colors.gray700,
    };

    return colorMap[color];
  };
  return (
    <ButtonWrapper
      width={width}
      disabled={disabled}
      hierarchy={hierarchy}
      isLoading={isLoading}
      color={color}
    >
      {href ? (
        <CustomLink
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
        </CustomLink>
      ) : (
        <CustomButton
          onClick={onClick}
          disabled={disabled || isLoading}
          {...(disabled && { tabIndex: -1 })}
          {...other}
        >
          <TextWrapper
            isLoading={isLoading}
            hierarchy={hierarchy}
            disabled={disabled}
            color={color}
          >
            {children}
          </TextWrapper>
        </CustomButton>
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
    </ButtonWrapper>
  );
}
