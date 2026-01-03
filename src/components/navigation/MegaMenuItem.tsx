import {   } from 'next/navigation';
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
        'group flex items-start gap-3 rounded-lg p-3',
        'transition-all duration-200',
        'hover:bg-muted',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'relative overflow-hidden'
      )}
    >
      {/* Hover indicator */}
      <span
        className={cn(
          'absolute left-0 top-0 h-full w-0.5 bg-primary',
          'scale-y-0 transition-transform duration-200 origin-top',
          'group-hover:scale-y-100'
        )}
        aria-hidden="true"
      />
      
      {/* Icon */}
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          'bg-primary/5 text-primary',
          'group-hover:bg-primary group-hover:text-primary-foreground',
          'transition-colors duration-200'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>
    </Link>
  );
};
