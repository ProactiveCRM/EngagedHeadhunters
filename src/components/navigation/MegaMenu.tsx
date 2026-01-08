import { forwardRef, useEffect } from 'react';
import { MegaMenuSection } from './MegaMenuSection';
import { MegaMenuFeatured } from './MegaMenuFeatured';
import { type MegaMenuData } from './navigationData';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  data: MegaMenuData;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ data, isOpen, onClose, onMouseEnter, onMouseLeave, onKeyDown }, ref) => {
    const { containerRef, activate, deactivate } = useFocusTrap({
      enabled: isOpen,
      returnFocusOnClose: true,
    });

    // Activate focus trap when menu opens
    useEffect(() => {
      if (isOpen) {
        activate();
      } else {
        deactivate();
      }
    }, [isOpen, activate, deactivate]);

    // Handle touch events for hybrid devices
    const handleTouchStart = (e: React.TouchEvent) => {
      // Prevent default only if needed
      e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 top-20 bg-foreground/10 dark:bg-foreground/5 backdrop-blur-sm z-40 animate-fade-in motion-reduce:animate-none"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Menu Panel */}
        <div
          ref={(el) => {
            // Handle both refs
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            containerRef.current = el;
          }}
          role="menu"
          aria-label={`${data.label} menu`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onTouchStart={handleTouchStart}
          className={cn(
            'fixed left-1/2 -translate-x-1/2 top-[84px]',
            'w-[95vw] max-w-4xl z-[55]',
            'bg-background/98 backdrop-blur-xl border border-border rounded-[2rem] shadow-[var(--shadow-mega)]',
            'animate-[mega-menu-open_0.3s_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none',
            'lg:max-w-4xl xl:max-w-5xl'
          )}
        >
          {/* Responsive grid: 2 columns on smaller screens, 3 on larger */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 overflow-hidden">
            {/* Navigation Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 p-10">
              {data.columns.map((column) => (
                <MegaMenuSection
                  key={column.title}
                  {...column}
                  onItemClick={onClose}
                />
              ))}
            </div>

            {/* Featured Panel - High contrast CTA card */}
            <div className="hidden lg:block p-1">
              <MegaMenuFeatured
                content={data.featured}
                onItemClick={onClose}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
);

MegaMenu.displayName = 'MegaMenu';
