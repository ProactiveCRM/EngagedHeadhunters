import { useEffect, useRef, RefObject } from 'react';

interface UseFocusOnMountOptions {
  enabled?: boolean;
  delay?: number;
}

export const useFocusOnMount = <T extends HTMLElement>(
  options: UseFocusOnMountOptions = {}
): RefObject<T | null> => {
  const { enabled = true, delay = 0 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const focusElement = () => {
      if (ref.current) {
        ref.current.focus();
      }
    };

    if (delay > 0) {
      const timeoutId = setTimeout(focusElement, delay);
      return () => clearTimeout(timeoutId);
    } else {
      // Use requestAnimationFrame for smoother focus
      const frameId = requestAnimationFrame(focusElement);
      return () => cancelAnimationFrame(frameId);
    }
  }, [enabled, delay]);

  return ref;
};
