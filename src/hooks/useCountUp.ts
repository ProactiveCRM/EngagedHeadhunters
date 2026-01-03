import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  decimals?: number;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  startOnView = true,
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldStart, setShouldStart] = useState(!startOnView);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const triggerCount = () => {
    setShouldStart(true);
  };

  useEffect(() => {
    if (!shouldStart) return;

    // If reduced motion, skip animation
    if (prefersReducedMotion) {
      setCount(end);
      setIsComplete(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = start + (end - start) * easeOutCubic;
        setCount(Number(currentValue.toFixed(decimals)));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setIsComplete(true);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldStart, start, end, duration, delay, decimals, prefersReducedMotion]);

  const reset = () => {
    setCount(start);
    setIsComplete(false);
    startTimeRef.current = null;
    if (!startOnView) {
      setShouldStart(true);
    } else {
      setShouldStart(false);
    }
  };

  return { count, isComplete, triggerCount, reset };
}
