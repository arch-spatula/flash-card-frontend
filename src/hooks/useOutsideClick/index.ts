import { useCallback, useEffect, useRef, useState } from 'react';

export function useOutsideClick<T extends HTMLElement>() {
  const areaRef = useRef<T>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback((e: MouseEvent) => {
    if (areaRef.current?.contains(e.target as Node) === false) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleRevers = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { customRef: areaRef, isOpen, handleClose, handleOpen, handleRevers };
}
