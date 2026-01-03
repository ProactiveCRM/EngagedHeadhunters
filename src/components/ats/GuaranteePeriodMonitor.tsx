import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Shield, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Placement } from '@/lib/ats/types';
import { differenceInDays, addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface GuaranteePeriodMonitorProps {
  placements: Placement[];
  onMarkCleared?: (placementId: string) => void;
  className?: string;
}

interface GuaranteeStatus {
  status: 'safe' | 'warning' | 'critical' | 'expired' | 'cleared';
  daysRemaining: number | null;
  expirationDate: Date | null;
  progress: number;
}

function calculateGuaranteeStatus(placement: Placement): GuaranteeStatus {
  if (placement.fee_status === 'paid') {
    return { status: 'cleared', daysRemaining: null, expirationDate: null, progress: 100 };
  }
  
  if (!placement.start_date || !placement.guarantee_period_days) {
    return { status: 'safe', daysRemaining: null, expirationDate: null, progress: 0 };
  }
  
  const startDate = new Date(placement.start_date);
  const guaranteeEnd = addDays(startDate, placement.guarantee_period_days);
  const today = new Date();
  const daysRemaining = differenceInDays(guaranteeEnd, today);
  const totalDays = placement.guarantee_period_days;
  const daysElapsed = totalDays - daysRemaining;
  const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
  
  let status: GuaranteeStatus['status'];
  if (daysRemaining < 0) status = 'expired';
  else if (daysRemaining < 15) status = 'critical';
  else if (daysRemaining < 30) status = 'warning';
  else status = 'safe';
  
  return { status, daysRemaining, expirationDate: guaranteeEnd, progress };
}

const statusConfig = {
  safe: { 
    color: 'text-green-600 dark:text-green-400', 
    bgColor: 'bg-green-500',
    badgeVariant: 'default' as const,
    icon: CheckCircle2 
  },
  warning: { 
    color: 'text-yellow-600 dark:text-yellow-400', 
    bgColor: 'bg-yellow-500',
    badgeVariant: 'secondary' as const,
    icon: AlertTriangle 
  },
  critical: { 
    color: 'text-orange-600 dark:text-orange-400', 
    bgColor: 'bg-orange-500',
    badgeVariant: 'destructive' as const,
    icon: AlertTriangle 
  },
  expired: { 
    color: 'text-red-600 dark:text-red-400', 
    bgColor: 'bg-red-500',
    badgeVariant: 'destructive' as const,
    icon: XCircle 
  },
  cleared: { 
    color: 'text-muted-foreground', 
    bgColor: 'bg-muted',
    badgeVariant: 'outline' as const,
    icon: CheckCircle2 
  },
};

export function GuaranteePeriodMonitor({ 
  placements, 
  onMarkCleared,
  className 
}: GuaranteePeriodMonitorProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Filter and sort placements with active guarantees
  const placementsWithGuarantee = placements
    .filter(p => p.guarantee_period_days && p.start_date && p.fee_status !== 'paid')
    .map(p => ({
      placement: p,
      guarantee: calculateGuaranteeStatus(p)
    }))
    .sort((a, b) => {
      // Sort by urgency: expired first, then by days remaining
      if (a.guarantee.status === 'expired' && b.guarantee.status !== 'expired') return -1;
      if (b.guarantee.status === 'expired' && a.guarantee.status !== 'expired') return 1;
      return (a.guarantee.daysRemaining ?? 999) - (b.guarantee.daysRemaining ?? 999);
    });
  
  const atRiskCount = placementsWithGuarantee.filter(
    p => p.guarantee.status === 'critical' || p.guarantee.status === 'warning' || p.guarantee.status === 'expired'
  ).length;
  
  const expiringSoon = placementsWithGuarantee.filter(
    p => p.guarantee.status !== 'safe' && p.guarantee.status !== 'cleared'
  );
  
  const safeGuarantees = placementsWithGuarantee.filter(
    p => p.guarantee.status === 'safe'
  );

  const renderPlacementCard = (item: typeof placementsWithGuarantee[0]) => {
    const { placement, guarantee } = item;
    const config = statusConfig[guarantee.status];
    const Icon = config.icon;
    
    return (
      <div 
        key={placement.id} 
        className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={cn("h-4 w-4", config.color)} />
              <span className="font-medium truncate">{placement.candidate_name}</span>
              <Badge variant={config.badgeVariant} className="text-xs">
                {guarantee.status === 'expired' 
                  ? `Expired ${Math.abs(guarantee.daysRemaining!)} days ago`
                  : guarantee.daysRemaining !== null 
                    ? `${guarantee.daysRemaining} days left`
                    : 'No guarantee'
                }
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {placement.job_title} @ {placement.client_company}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>Started: {placement.start_date ? format(new Date(placement.start_date), 'MMM d, yyyy') : 'N/A'}</span>
              <span>•</span>
              <span>Guarantee: {placement.guarantee_period_days} days</span>
            </div>
          </div>
          {onMarkCleared && guarantee.status !== 'cleared' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onMarkCleared(placement.id)}
            >
              Mark Cleared
            </Button>
          )}
        </div>
        
        {guarantee.daysRemaining !== null && (
          <div className="mt-3">
            <Progress 
              value={guarantee.progress} 
              className={cn("h-2", guarantee.status === 'expired' && "bg-red-200 dark:bg-red-900")}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Guarantee Period Monitor
          </CardTitle>
          {atRiskCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {atRiskCount} at risk
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {placementsWithGuarantee.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No active guarantee periods to monitor
          </p>
        ) : (
          <>
            {/* Expiring Soon Section */}
            {expiringSoon.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Expiring Soon ({expiringSoon.length})
                </h4>
                <div className="space-y-2">
                  {expiringSoon.map(renderPlacementCard)}
                </div>
              </div>
            )}
            
            {/* Safe Guarantees (Collapsible) */}
            {safeGuarantees.length > 0 && (
              <Collapsible open={showAll} onOpenChange={setShowAll}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="text-sm">
                      Show All Active Guarantees ({safeGuarantees.length} safe)
                    </span>
                    {showAll ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {safeGuarantees.map(renderPlacementCard)}
                </CollapsibleContent>
              </Collapsible>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
