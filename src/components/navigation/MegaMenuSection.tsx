import { } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { MegaMenuItem } from './MegaMenuItem';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface MegaMenuSectionProps {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
  viewAll?: {
    text: string;
    href: string;
  };
  onItemClick?: () => void;
}

export const MegaMenuSection = ({
  title,
  icon: Icon,
  items,
  viewAll,
  onItemClick,
}: MegaMenuSectionProps) => {
  return (
    <div className="flex flex-col">
      {/* Section Header */}
      <div className="flex items-center gap-2 px-3 pb-3 border-b border-border/50 mb-4">
        <Icon className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
          {title}
        </h3>
      </div>

      {/* Items */}
      <div className="space-y-1">
        {items.map((item) => (
          <MegaMenuItem
            key={item.name}
            {...item}
            onClick={onItemClick}
          />
        ))}
      </div>

      {/* View All Link */}
      {viewAll && (
        <Link
          href={viewAll.href}
          onClick={onItemClick}
          className={cn(
            'mt-4 flex items-center gap-1 px-3 py-2 text-sm font-medium',
            'text-primary hover:text-primary/80 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded'
          )}
        >
          {viewAll.text}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};
