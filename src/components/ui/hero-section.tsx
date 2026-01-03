import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  variant?: 'home' | 'page' | 'service' | 'minimal';
  badge?: ReactNode;
  badgeColor?: 'primary' | 'destructive' | 'secondary';
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  image?: ReactNode;
  stats?: {
    value: string;
    label: string;
  }[];
  className?: string;
  contentClassName?: string;
}

export const HeroSection = ({
  variant = 'page',
  badge,
  badgeColor = 'primary',
  title,
  description,
  children,
  image,
  stats,
  className,
  contentClassName,
}: HeroSectionProps) => {
  const badgeColors = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    secondary: 'bg-secondary text-secondary-foreground border-secondary/50',
  };

  const isFullWidth = variant === 'home' || variant === 'service';
  
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variant === 'home' && 'pt-20 min-h-screen flex items-center',
        variant === 'page' && 'pt-24 pb-16 md:pt-28 md:pb-20',
        variant === 'service' && 'pt-24 pb-16 md:pt-28 md:pb-20',
        variant === 'minimal' && 'pt-24 pb-12 md:pt-28 md:pb-16',
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />
      
      {/* Animated Decorations for larger variants */}
      {(variant === 'home' || variant === 'service') && (
        <>
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-blob opacity-50" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-blob opacity-40" style={{ animationDelay: '-5s' }} />
        </>
      )}
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      <div className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
        isFullWidth && 'py-16 lg:py-24'
      )}>
        <div className={cn(
          isFullWidth && image ? 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center' : 'max-w-4xl mx-auto',
          !isFullWidth && 'text-center',
          contentClassName
        )}>
          <div className={cn(!isFullWidth && 'mx-auto')}>
            {/* Badge */}
            {badge && (
              <div className="mb-6 animate-fade-in">
                <span className={cn(
                  'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border',
                  badgeColors[badgeColor]
                )}>
                  {badge}
                </span>
              </div>
            )}
            
            {/* Title */}
            <h1 className={cn(
              'font-extrabold text-foreground tracking-tight leading-tight animate-fade-in',
              variant === 'home' && 'text-4xl md:text-5xl lg:text-6xl mb-6',
              variant === 'page' && 'text-3xl md:text-4xl lg:text-5xl mb-4',
              variant === 'service' && 'text-3xl md:text-4xl lg:text-5xl mb-4',
              variant === 'minimal' && 'text-2xl md:text-3xl lg:text-4xl mb-4'
            )} style={{ animationDelay: '100ms' }}>
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p className={cn(
                'text-muted-foreground animate-fade-in',
                variant === 'home' && 'text-xl md:text-2xl mb-10 leading-relaxed max-w-xl',
                variant === 'page' && 'text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0',
                variant === 'service' && 'text-lg md:text-xl mb-8 max-w-2xl',
                variant === 'minimal' && 'text-base md:text-lg mb-6 max-w-xl mx-auto'
              )} style={{ animationDelay: '200ms' }}>
                {description}
              </p>
            )}
            
            {/* Stats Grid */}
            {stats && stats.length > 0 && (
              <div className={cn(
                'grid gap-6 mb-8 animate-fade-in',
                stats.length === 2 && 'grid-cols-2',
                stats.length === 3 && 'grid-cols-3',
                stats.length >= 4 && 'grid-cols-2 md:grid-cols-4'
              )} style={{ animationDelay: '250ms' }}>
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* CTA Children */}
            {children && (
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                {children}
              </div>
            )}
          </div>
          
          {/* Image Section */}
          {image && isFullWidth && (
            <div className="animate-fade-in hidden lg:block" style={{ animationDelay: '200ms' }}>
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
