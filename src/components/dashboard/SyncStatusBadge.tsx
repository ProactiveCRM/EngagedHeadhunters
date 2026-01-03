import { CheckCircle2, RefreshCw, Cloud, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'failed';

interface SyncStatusBadgeProps {
  status: SyncStatus;
  lastSyncedAt?: string | null;
  onSync?: () => void;
  isSyncing?: boolean;
  compact?: boolean;
}

const statusConfig: Record<SyncStatus, { icon: typeof CheckCircle2; label: string; className: string }> = {
  synced: {
    icon: CheckCircle2,
    label: 'Synced',
    className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  syncing: {
    icon: RefreshCw,
    label: 'Syncing',
    className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  },
  pending: {
    icon: Cloud,
    label: 'Not synced',
    className: 'bg-muted text-muted-foreground border-border',
  },
  failed: {
    icon: AlertCircle,
    label: 'Failed',
    className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  },
};

export function SyncStatusBadge({ 
  status, 
  lastSyncedAt, 
  onSync, 
  isSyncing = false,
  compact = false 
}: SyncStatusBadgeProps) {
  const effectiveStatus = isSyncing ? 'syncing' : status;
  const config = statusConfig[effectiveStatus];
  const Icon = config.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const badge = (
    <Badge 
      variant="outline" 
      className={cn(
        'gap-1.5 font-normal border',
        config.className,
        compact && 'px-1.5 py-0.5'
      )}
    >
      <Icon className={cn(
        'h-3 w-3',
        effectiveStatus === 'syncing' && 'animate-spin'
      )} />
      {!compact && <span>{config.label}</span>}
    </Badge>
  );

  // If synced and has timestamp, show tooltip with date
  if (effectiveStatus === 'synced' && lastSyncedAt) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>Last synced: {formatDate(lastSyncedAt)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // If pending/failed and has sync action, make it clickable
  if ((effectiveStatus === 'pending' || effectiveStatus === 'failed') && onSync) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 hover:bg-transparent"
              onClick={onSync}
              disabled={isSyncing}
            >
              {badge}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to sync</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}

export function getSyncStatus(entity: { 
  ats_id?: string | null; 
  last_synced_at?: string | null 
}): SyncStatus {
  if (!entity.ats_id && !entity.last_synced_at) {
    return 'pending';
  }
  if (entity.last_synced_at) {
    return 'synced';
  }
  return 'pending';
}
