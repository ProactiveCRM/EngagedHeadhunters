import { } from 'next/navigation';
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
        'relative flex flex-col justify-between rounded-[1.5rem] p-8 h-full min-h-[300px]',
        'bg-gradient-to-br from-[#002B57] to-[#0187DA]',
        'text-primary-foreground overflow-hidden shadow-brand'
      )}
    >
      {/* Background decoration - Premium Inner Glow */}
      <div
        className="absolute -right-4 -top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/4 bottom-0 h-32 w-32 rounded-full bg-primary/20 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Badge */}
        {content.badge && (
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
              'bg-[#F97316] text-white mb-6 shadow-sm'
            )}
          >
            {content.badge}
          </span>
        )}

        {/* Title */}
        <h4 className="text-2xl font-bold mb-3 tracking-tight leading-tight">
          {content.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-primary-foreground/90 leading-relaxed font-medium">
          {content.description}
        </p>
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-8 space-y-3">
        <Link
          href={content.cta.href}
          onClick={onItemClick}
          className={cn(
            'flex items-center justify-center gap-2 w-full',
            'px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300',
            'bg-white text-[#002B57] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B57]'
          )}
        >
          {content.cta.text}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>

        {content.secondaryCta && (
          <Link
            href={content.secondaryCta.href}
            onClick={onItemClick}
            className={cn(
              'flex items-center justify-center w-full',
              'px-4 py-2 text-sm font-semibold',
              'text-primary-foreground/80 hover:text-white transition-colors',
              'hover:underline underline-offset-8 decoration-2',
              'focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg'
            )}
          >
            {content.secondaryCta.text}
          </Link>
        )}
      </div>
    </div>
  );
};
