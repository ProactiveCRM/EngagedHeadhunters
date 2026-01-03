import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className 
}: StatsCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 border border-border shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
        )}
        <span className="text-3xl font-bold text-foreground">{value}</span>
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {trend && (
        <p className={cn(
          "text-sm mt-2",
          trend.value >= 0 ? "text-green-600" : "text-destructive"
        )}>
          {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
        </p>
      )}
    </div>
  );
}

export default StatsCard;
