import { useCallback, useEffect, useRef, useState } from 'react';

type OutSideProviderProps = {
  component: JSX.Element;
};

export function useOutsideClick<T extends HTMLElement>() {
  const areaRef = useRef<T>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (areaRef.current?.contains(e.target as Node) === false) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleRevers = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const OutSideProvider = ({ component }: OutSideProviderProps) => {
    return <>{isOpen && component}</>;
  };

  return {
    customRef: areaRef,
    isOpen,
    handleClose,
    handleOpen,
    handleRevers,
    OutSideProvider,
  };
}
