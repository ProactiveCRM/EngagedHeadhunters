import { useRef, useCallback, useEffect } from 'react';

interface SwipeGestureOptions {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  velocityThreshold?: number;
  enabled?: boolean;
}

interface TouchData {
  startX: number;
  startY: number;
  startTime: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions = {}) => {
  const {
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocityThreshold = 0.3,
    enabled = true,
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const touchDataRef = useRef<TouchData | null>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      
      const touch = e.touches[0];
      touchDataRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
      };
    },
    [enabled]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !touchDataRef.current) return;

      const touch = e.changedTouches[0];
      const { startX, startY, startTime } = touchDataRef.current;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const deltaTime = Date.now() - startTime;

      // Calculate velocity (pixels per millisecond)
      const velocityX = Math.abs(deltaX) / deltaTime;
      const velocityY = Math.abs(deltaY) / deltaTime;

      // Determine if it's a horizontal or vertical swipe
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontalSwipe) {
        // Horizontal swipe
        if (
          Math.abs(deltaX) >= threshold &&
          velocityX >= velocityThreshold
        ) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (
          Math.abs(deltaY) >= threshold &&
          velocityY >= velocityThreshold
        ) {
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }

      touchDataRef.current = null;
    },
    [enabled, threshold, velocityThreshold, onSwipeRight, onSwipeLeft, onSwipeUp, onSwipeDown]
  );

  // Attach event listeners to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchEnd]);

  // Bind function for manual attachment
  const bind = useCallback(
    () => ({
      onTouchStart: (e: React.TouchEvent) => handleTouchStart(e.nativeEvent),
      onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e.nativeEvent),
    }),
    [handleTouchStart, handleTouchEnd]
  );

  return {
    containerRef,
    bind,
  };
};
