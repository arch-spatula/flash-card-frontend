import { useCallback, useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  handlerCallback: () => void
) {
  const customRef = useRef<T>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (customRef.current?.contains(e.target as Node) === false) {
        handlerCallback();
      }
    },
    [handlerCallback]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return { customRef };
}
