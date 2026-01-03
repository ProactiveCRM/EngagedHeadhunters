import { cn } from '@/lib/utils';

interface SkipNavigationProps {
  mainContentId?: string;
  className?: string;
}

export const SkipNavigation = ({
  mainContentId = 'main-content',
  className,
}: SkipNavigationProps) => {
  return (
    <a
      href={`#${mainContentId}`}
      className={cn(
        'sr-only focus:not-sr-only',
        'fixed top-4 left-4 z-[100]',
        'px-4 py-2 rounded-lg',
        'bg-primary text-primary-foreground',
        'font-semibold text-sm',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'transition-transform duration-200',
        'focus:translate-y-0 -translate-y-20',
        className
      )}
    >
      Skip to main content
    </a>
  );
};
