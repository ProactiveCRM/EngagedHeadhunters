import { useEffect, useState, useCallback, useRef } from 'react';

interface ParallaxPosition {
  x: number;
  y: number;
}

interface UseMouseParallaxOptions {
  intensity?: number;
  disabled?: boolean;
}

export function useMouseParallax({ 
  intensity = 0.02,
  disabled = false 
}: UseMouseParallaxOptions = {}) {
  const [position, setPosition] = useState<ParallaxPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (disabled || prefersReducedMotion) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const x = (e.clientX - centerX) * intensity;
      const y = (e.clientY - centerY) * intensity;
      
      setPosition({ x, y });
    });
  }, [intensity, disabled, prefersReducedMotion]);

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    // Only add listener on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, disabled, prefersReducedMotion]);

  const getParallaxStyle = useCallback((speed: number = 1) => ({
    transform: `translate(${position.x * speed}px, ${position.y * speed}px)`,
    transition: 'transform 0.1s ease-out',
  }), [position]);

  return { position, getParallaxStyle, containerRef };
}
