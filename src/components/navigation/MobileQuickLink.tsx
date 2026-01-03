import {   } from 'next/navigation';
import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileQuickLinkProps {
  name: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const MobileQuickLink = ({
  name,
  href,
  icon: Icon,
  onClick,
  className,
}: MobileQuickLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      aria-label={`Navigate to ${name}`}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5',
        'p-2.5 rounded-lg',
        'bg-muted/50 hover:bg-muted',
        'transition-all duration-200',
        'min-h-[64px]',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'active:scale-95 active:bg-muted/80',
        'motion-reduce:transition-none motion-reduce:active:scale-100',
        'touch-manipulation',
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-[11px] font-medium text-center text-foreground line-clamp-2 leading-tight">
        {name}
      </span>
    </Link>
  );
};
