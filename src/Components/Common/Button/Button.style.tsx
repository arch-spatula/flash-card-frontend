import styled from '@emotion/styled';

export const ButtonWrapper = styled.button<{
  isLoading: boolean;
  width?: number | 'grow';
}>`
  all: unset;
  ${(props) => props.theme.fonts.body16Regular}
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  border: none;
  /* disabled 이면 gray가 되고 loading이면 green을 유지 */
  background-color: ${(props) =>
    props.disabled && !props.isLoading
      ? props.theme.colors.gray400
      : props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  height: 2.75rem;

  width: ${(props) => {
    // 숫자 입력시 숫자만큼 채우기
    if (!props.width) return 'fit-content';
    if (props.width !== 'grow') return `${props.width / 16}rem`;
    return 'fit-content';
  }};
  ${(props) => (props.width === 'grow' ? 'flex-grow: 1;' : null)}
  min-width: 5.25rem;

  a {
    /* a 태그 스타일링 초기화 */
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
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
