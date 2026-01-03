import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 80,
  className,
  cursorClassName,
  showCursor = true,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    // If reduced motion, show full text immediately
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay, speed, onComplete, prefersReducedMotion]);

  // Cursor blink effect
  useEffect(() => {
    if (!showCursor || prefersReducedMotion) return;

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [showCursor, prefersReducedMotion]);

  // Fade out cursor after complete
  useEffect(() => {
    if (isComplete && showCursor) {
      const fadeTimeout = setTimeout(() => {
        setCursorVisible(false);
      }, 2000);
      return () => clearTimeout(fadeTimeout);
    }
  }, [isComplete, showCursor]);

  return (
    <span className={cn('inline', className)} aria-label={text}>
      <span aria-hidden="true">{displayText}</span>
      {showCursor && !prefersReducedMotion && (
        <span
          className={cn(
            'inline-block w-[3px] h-[1em] ml-0.5 align-middle bg-primary transition-opacity duration-100',
            cursorClassName,
            cursorVisible ? 'opacity-100' : 'opacity-0',
            isComplete && 'animate-fade-out'
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
