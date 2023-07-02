import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type HierarchyType = 'primary' | 'secondary' | 'ghost';
type ColorType = 'green' | 'red' | 'neutral';

type ButtonWrapperProps = {
  width?: number | 'grow';
  disabled?: boolean;
  hierarchy: HierarchyType;
  isLoading: boolean;
  color: ColorType;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  border-radius: 0.5rem;
  height: 2.75rem;
  min-width: 5.25rem;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => {
    // 숫자 입력시 숫자만큼 채우기
    if (!props.width) return 'fit-content';
    if (props.width !== 'grow') return (props.width / 16).toString() + 'rem';
    return 'fit-content';
  }};

  ${(props) => props.width === 'grow' && 'flex: 1 1 0px;'}

  button,
  a {
    all: unset;

    width: 100%;
    height: 100%;
    border-radius: 0.5rem;

    background-color: ${(props) => {
      if (props.hierarchy !== 'primary') return props.theme.colors.white;

      if (props.disabled && !props.isLoading) {
        if (props.hierarchy === 'primary') return props.theme.colors.gray400;
        else return props.theme.colors.white;
      }

      const colorMap = {
        green: props.theme.colors.green500,
        red: props.theme.colors.red500,
        neutral: props.theme.colors.gray700,
      };

      return colorMap[props.color];
    }};

    box-shadow: 0 0 0 2px
      ${(props) => {
        if (props.disabled && props.hierarchy === 'secondary')
          return props.theme.colors.gray400;

        const colorMap = {
          green: props.theme.colors.green500,
          red: props.theme.colors.red500,
          neutral: props.theme.colors.gray700,
        };

        if (props.hierarchy === 'secondary') return colorMap[props.color];

        return 'none';
      }}
      inset;

    ${(props) => props.theme.fonts.body16Regular}

    display: flex;
    justify-content: center;
    align-items: center;

    :focus-visible {
      box-shadow: 0 0 0 0.25rem
        ${(props) => {
          const colorMap = {
            green: props.theme.colors.green200,
            red: props.theme.colors.red200,
            neutral: props.theme.colors.gray400,
          } as const;

          return colorMap[props.color];
        }}
        inset;
    }

    :hover {
      background-color: ${(props) => {
        if (props.disabled) return props.theme.colors.gray400;

        const colorMap = {
          primary: {
            green: props.theme.colors.green400,
            red: props.theme.colors.red400,
            neutral: props.theme.colors.gray600,
          },
          secondary: {
            green: props.theme.colors.green050,
            red: props.theme.colors.red050,
            neutral: props.theme.colors.gray100,
          },
          ghost: {
            green: props.theme.colors.green050,
            red: props.theme.colors.red050,
            neutral: props.theme.colors.gray100,
          },
        } as const;

        return colorMap[props.hierarchy][props.color];
      }};
    }

    :active {
      background-color: ${(props) => {
        if (props.disabled) return props.theme.colors.gray400;

        const colorMap = {
          primary: {
            green: props.theme.colors.green600,
            red: props.theme.colors.red600,
            neutral: props.theme.colors.gray800,
          },
          secondary: {
            green: props.theme.colors.green100,
            red: props.theme.colors.red100,
            neutral: props.theme.colors.gray200,
          },
          ghost: {
            green: props.theme.colors.green100,
            red: props.theme.colors.red100,
            neutral: props.theme.colors.gray200,
          },
        } as const;

        return colorMap[props.hierarchy][props.color];
      }};
    }
  }
`;

type CustomLinkProps = Pick<ButtonWrapperProps, 'disabled'>;

export const CustomLink = styled(Link)<CustomLinkProps>`
  ${(props) => !props.disabled && 'cursor: pointer;'}
`;

export const CustomButton = styled.button``;

type TextWrapperProps = Omit<ButtonWrapperProps, 'width'>;

export const TextWrapper = styled.span<TextWrapperProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: ${(props) => {
    if (props.isLoading) return 'transparent';
    if (props.disabled && props.hierarchy !== 'primary')
      return props.theme.colors.gray400;
    if (props.hierarchy === 'primary') return props.theme.colors.white;

    const colorMap = {
      green: props.theme.colors.green500,
      red: props.theme.colors.red500,
      neutral: props.theme.colors.gray700,
    } as const;

    return colorMap[props.color];
  }};
  margin: 0 1rem;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
