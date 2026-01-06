"use client";

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  className?: string;
  targetId?: string;
  hideAfterScroll?: boolean;
  scrollThreshold?: number;
}

export function ScrollIndicator({
  className,
  targetId,
  hideAfterScroll = true,
  scrollThreshold = 100,
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (!hideAfterScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > scrollThreshold && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideAfterScroll, scrollThreshold, hasScrolled]);

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
        'text-muted-foreground hover:text-primary transition-colors duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-2',
        className
      )}
      aria-label="Scroll down to learn more"
    >
      <span className="text-xs font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
        Scroll
      </span>
      <div className={cn(
        'relative w-6 h-10 border-2 border-current rounded-full flex justify-center',
        !prefersReducedMotion && 'group-hover:border-primary'
      )}>
        {/* Animated dot inside */}
        <span 
          className={cn(
            'absolute top-2 w-1.5 h-1.5 bg-current rounded-full',
            !prefersReducedMotion && 'animate-scroll-indicator'
          )}
        />
      </div>
      <ChevronDown 
        className={cn(
          'w-5 h-5 -mt-1',
          !prefersReducedMotion && 'animate-bounce-subtle'
        )} 
      />
    </button>
  );
}
