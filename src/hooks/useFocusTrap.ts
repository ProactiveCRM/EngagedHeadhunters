import { useEffect, useRef, useCallback, RefObject } from 'react';

interface UseFocusTrapOptions {
  enabled?: boolean;
  returnFocusOnClose?: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
}

export const useFocusTrap = (options: UseFocusTrapOptions = {}) => {
  const { enabled = true, returnFocusOnClose = true, initialFocusRef } = options;
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => el.offsetParent !== null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: Move focus backwards
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: Move focus forwards
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [enabled, getFocusableElements]
  );

  const activate = useCallback(() => {
    if (!enabled) return;

    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus initial element or first focusable element
    requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    });

    // Add keydown listener
    document.addEventListener('keydown', handleKeyDown);
  }, [enabled, getFocusableElements, handleKeyDown, initialFocusRef]);

  const deactivate = useCallback(() => {
    // Remove keydown listener
    document.removeEventListener('keydown', handleKeyDown);

    // Return focus to previous element
    if (returnFocusOnClose && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [handleKeyDown, returnFocusOnClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    containerRef,
    activate,
    deactivate,
  };
};
