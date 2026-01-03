import {   } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedContent {
  type: 'promo' | 'cta' | 'resource';
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  badge?: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
}

interface MegaMenuFeaturedProps {
  content: FeaturedContent;
  onItemClick?: () => void;
}

export const MegaMenuFeatured = ({ content, onItemClick }: MegaMenuFeaturedProps) => {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between rounded-xl p-6 h-full min-h-[280px]',
        'bg-gradient-to-br from-dark-navy to-primary',
        'text-primary-foreground overflow-hidden'
      )}
    >
      {/* Background decoration */}
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-bright-orange/20 blur-xl"
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        {/* Badge */}
        {content.badge && (
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-xs font-semibold',
              'bg-bright-orange text-primary-foreground mb-4'
            )}
          >
            {content.badge}
          </span>
        )}
        
        {/* Title */}
        <h4 className="text-xl font-bold mb-2">{content.title}</h4>
        
        {/* Description */}
        <p className="text-sm text-primary-foreground/80 leading-relaxed">
          {content.description}
        </p>
      </div>
      
      {/* CTAs */}
      <div className="relative z-10 mt-6 space-y-3">
        <Link
          href={content.cta.href}
          onClick={onItemClick}
          className={cn(
            'flex items-center justify-center gap-2 w-full',
            'px-4 py-3 rounded-lg font-semibold text-sm',
            'bg-primary-foreground text-dark-navy',
            'hover:bg-primary-foreground/90 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-dark-navy'
          )}
        >
          {content.cta.text}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        
        {content.secondaryCta && (
          <Link
            href={content.secondaryCta.href}
            onClick={onItemClick}
            className={cn(
              'flex items-center justify-center w-full',
              'px-4 py-2 text-sm font-medium',
              'text-primary-foreground/80 hover:text-primary-foreground transition-colors',
              'underline underline-offset-4',
              'focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-dark-navy rounded'
            )}
          >
            {content.secondaryCta.text}
          </Link>
        )}
      </div>
    </div>
  );
};
