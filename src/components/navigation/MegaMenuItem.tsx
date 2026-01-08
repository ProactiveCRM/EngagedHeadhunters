import { } from 'next/navigation';
import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MegaMenuItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  onClick?: () => void;
}

export const MegaMenuItem = ({
  name,
  href,
  icon: Icon,
  description,
  onClick,
}: MegaMenuItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group flex items-start gap-4 rounded-xl p-3',
        'transition-all duration-300',
        'hover:bg-muted/50',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        'relative overflow-hidden'
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          'bg-primary/5 text-primary',
          'group-hover:bg-primary group-hover:text-primary-foreground',
          'transition-all duration-300 shadow-sm'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors tracking-tight">
          {name}
        </p>
        <p className="text-[11px] font-medium text-muted-foreground/70 mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};
