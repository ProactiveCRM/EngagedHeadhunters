import {   } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MobileQuickLink } from './MobileQuickLink';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
  viewAll?: {
    text: string;
    href: string;
  };
}

interface FeaturedContent {
  type: 'promo' | 'cta' | 'resource';
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  badge?: string;
}

interface MobileNavSectionProps {
  id: string;
  label: string;
  icon: LucideIcon;
  columns: NavSection[];
  featured: FeaturedContent;
  onItemClick: () => void;
}

export const MobileNavSection = ({
  id,
  label,
  icon: SectionIcon,
  columns,
  featured,
  onItemClick,
}: MobileNavSectionProps) => {
  // Flatten all items from columns for quick links grid - limit to 4 for compact view
  const quickLinks = columns.flatMap(col => col.items).slice(0, 4);
  
  // Get the first viewAll link
  const viewAllLink = columns.find(col => col.viewAll)?.viewAll;

  const triggerId = `mobile-nav-trigger-${id}`;
  const contentId = `mobile-nav-content-${id}`;

  return (
    <AccordionItem value={id} className="border-b-0">
      <AccordionTrigger 
        id={triggerId}
        aria-controls={contentId}
        className={cn(
          'px-4 py-3 hover:no-underline hover:bg-muted',
          'min-h-[48px]',
          'active:bg-muted/80',
          'motion-reduce:transition-none'
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <SectionIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
      </AccordionTrigger>
      
      <AccordionContent 
        id={contentId}
        aria-labelledby={triggerId}
        role="region"
        className="pb-0"
      >
        <div className="px-4 pb-3 space-y-3">
          {/* Quick Links Grid - 2x2 compact layout */}
          <nav aria-label={`${label} navigation links`}>
            <ul className="grid grid-cols-2 gap-2" role="list">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <MobileQuickLink
                    name={item.name}
                    href={item.href}
                    icon={item.icon}
                    onClick={onItemClick}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* View All Link */}
          {viewAllLink && (
            <Link
              href={viewAllLink.href}
              onClick={onItemClick}
              className={cn(
                'flex items-center justify-center gap-2 w-full py-3',
                'text-sm font-semibold text-primary',
                'border border-primary/20 rounded-lg',
                'hover:bg-primary/5 transition-colors',
                'min-h-[48px]',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'active:scale-[0.98] motion-reduce:active:scale-100'
              )}
            >
              {viewAllLink.text}
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
          
          {/* Featured Card - Compact */}
          <div 
            className={cn(
              'p-3 rounded-lg',
              'bg-gradient-to-br from-dark-navy to-primary',
              'relative overflow-hidden'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                {featured.badge && (
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-bright-orange text-primary-foreground mb-1">
                    {featured.badge}
                  </span>
                )}
                <h4 className="font-semibold text-primary-foreground text-xs line-clamp-1">
                  {featured.title}
                </h4>
              </div>
              <Link
                href={featured.cta.href}
                onClick={onItemClick}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-2 rounded-md shrink-0',
                  'bg-primary-foreground text-dark-navy text-xs font-semibold',
                  'hover:bg-primary-foreground/90 transition-colors',
                  'min-h-[36px]',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'active:scale-[0.98] motion-reduce:active:scale-100'
                )}
              >
                {featured.cta.text}
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
