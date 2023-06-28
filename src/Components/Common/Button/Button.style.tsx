import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type NewButtonWrapperProps = {
  width?: number | 'grow';
  disabled?: boolean;
  hierarchy: 'primary' | 'secondary';
  isLoading: boolean;
};

export const NewButtonWrapper = styled.div<NewButtonWrapperProps>`
  background-color: ${(props) =>
    props.disabled && !props.isLoading
      ? props.theme.colors.gray400
      : props.theme.colors.green500};
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
    ${(props) => props.theme.fonts.body16Regular}
    ${(props) => !props.disabled && 'cursor: pointer;'}
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => props.disabled && 'pointer-events: none;'}

    :focus-visible {
      box-shadow: 0 0 0 0.25rem
        ${(props) => {
          if (props.disabled) return props.theme.colors.gray400;
          return props.theme.colors.green200;
        }}
        inset;
    }

    :active {
      box-shadow: 0 0 0 0.25rem
        ${(props) => {
          if (props.disabled) return props.theme.colors.gray400;
          return props.theme.colors.green200;
        }}
        inset;
    }
  }
`;

export const NewButtonLink = styled(Link)``;

export const NewButtonButton = styled.button``;

export const ButtonWrapper = styled.button<{
  isLoading: boolean;
  width?: number | 'grow';
  hierarchy: 'primary' | 'secondary';
}>`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;

  border: none;
  ${(props) => !props.disabled && 'cursor: pointer;'}

  /* disabled 이면 gray가 되고 loading이면 green을 유지 */
  background-color: ${(props) =>
    props.disabled && !props.isLoading
      ? props.theme.colors.gray400
      : props.theme.colors.green500};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;

  width: ${(props) => {
    // 숫자 입력시 숫자만큼 채우기
    if (!props.width) return 'fit-content';
    if (props.width !== 'grow') return (props.width / 16).toString() + 'rem';
    return 'fit-content';
  }};
  ${(props) => props.width === 'grow' && 'flex: 1 1 0px;'}
  min-width: 5.25rem;
`;

export const LinkWrapper = styled(Link)<{
  width?: number | 'grow';
  disabled?: boolean;
  hierarchy: 'primary' | 'secondary';
}>`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;

  border: none;
  ${(props) => !props.disabled && 'cursor: pointer;'}

  /* disabled 이면 gray가 되고 loading이면 green을 유지 */
  background-color: ${(props) => {
    return props.theme.colors.green500;
  }};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;

  width: ${(props) => {
    // 숫자 입력시 숫자만큼 채우기
    if (!props.width) return 'fit-content';
    if (props.width !== 'grow') return (props.width / 16).toString() + 'rem';
    return 'fit-content';
  }};
  ${(props) => props.width === 'grow' && 'flex: 1 1 0px;'}
  min-width: 5.25rem;

  /* 링크를 위한 스타일링 */
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
`;

export const VisibilityWrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.span<{ isLoading: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: ${(props) =>
    props.isLoading ? 'transparent' : props.theme.colors.white};
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
