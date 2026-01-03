import { cn } from '@/lib/utils';

interface TrustBadge {
  emoji: string;
  label: string;
}

const badges: TrustBadge[] = [
  {
    emoji: "🛡️",
    label: 'Replacement Guarantee',
  },
  {
    emoji: "⏱️",
    label: 'Same-Day Response',
  },
  {
    emoji: "🏆",
    label: 'Industry Specialists',
  },
  {
    emoji: "🔒",
    label: '100% Confidential',
  },
];

interface BookingTrustBadgesProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const BookingTrustBadges = ({ 
  className,
  variant = 'default' 
}: BookingTrustBadgesProps) => {
  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-4 justify-center', className)}>
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="text-lg" role="img" aria-hidden="true">{badge.emoji}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 text-center"
        >
          <div className="p-2 rounded-full bg-primary/10">
            <span className="text-2xl" role="img" aria-hidden="true">{badge.emoji}</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BookingTrustBadges;