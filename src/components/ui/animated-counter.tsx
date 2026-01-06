"use client";

import { useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ 
    threshold: 0.5, 
    triggerOnce: true 
  });
  
  const { count, triggerCount } = useCountUp({
    start,
    end,
    duration,
    delay,
    startOnView: true,
    decimals,
  });

  useEffect(() => {
    if (inView) {
      triggerCount();
    }
  }, [inView, triggerCount]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{count}{suffix}
    </span>
  );
}
