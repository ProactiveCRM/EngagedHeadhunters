import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MegaMenuTriggerProps {
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const MegaMenuTrigger = forwardRef<HTMLButtonElement, MegaMenuTriggerProps>(
  ({ label, isActive, onMouseEnter, onMouseLeave, onKeyDown }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isActive}
        aria-haspopup="menu"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        className={cn(
          'flex items-center gap-1 px-4 py-3',
          'text-sm font-semibold rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isActive
            ? 'text-primary bg-muted'
            : 'text-foreground hover:text-primary hover:bg-muted'
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isActive && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

MegaMenuTrigger.displayName = 'MegaMenuTrigger';
