import { useState } from 'react';
import { useSyncToATS } from '@/hooks/useATS';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BulkSyncButtonProps {
  entityType: 'candidates' | 'job_orders' | 'placements';
  pendingItems: { id: string }[];
  onComplete?: (results: { success: number; failed: number }) => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function BulkSyncButton({
  entityType,
  pendingItems,
  onComplete,
  className,
  variant = 'outline',
  size = 'default',
}: BulkSyncButtonProps) {
  const { toast } = useToast();
  const syncToATS = useSyncToATS();

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [cancelled, setCancelled] = useState(false);

  const actionMap = {
    candidates: 'sync_candidate' as const,
    job_orders: 'sync_job' as const,
    placements: 'create_placement' as const,
  };

  const labelMap = {
    candidates: 'Candidates',
    job_orders: 'Job Orders',
    placements: 'Placements',
  };

  const handleSync = async () => {
    if (pendingItems.length === 0) {
      toast({
        title: 'Nothing to sync',
        description: `All ${labelMap[entityType].toLowerCase()} are already synced`,
      });
      return;
    }

    setIsRunning(true);
    setCancelled(false);
    setProgress({ current: 0, total: pendingItems.length });

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < pendingItems.length; i++) {
      if (cancelled) break;

      const item = pendingItems[i];
      try {
        await syncToATS.mutateAsync({
          action: actionMap[entityType],
          data: { ...item },
        });
        successCount++;
      } catch {
        failedCount++;
      }

      setProgress({ current: i + 1, total: pendingItems.length });
    }

    setIsRunning(false);

    if (cancelled) {
      toast({
        title: 'Sync cancelled',
        description: `Synced ${successCount} of ${pendingItems.length} ${labelMap[entityType].toLowerCase()}`,
      });
    } else if (failedCount === 0) {
      toast({
        title: 'Sync complete',
        description: `Successfully synced ${successCount} ${labelMap[entityType].toLowerCase()}`,
      });
    } else {
      toast({
        title: 'Sync completed with errors',
        description: `${successCount} succeeded, ${failedCount} failed`,
        variant: 'destructive',
      });
    }

    onComplete?.({ success: successCount, failed: failedCount });
  };

  const handleCancel = () => {
    setCancelled(true);
  };

  if (isRunning) {
    const percent = (progress.current / progress.total) * 100;

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex-1 min-w-[100px]">
          <Progress value={percent} className="h-2" />
          <span className="text-xs text-muted-foreground">
            {progress.current} / {progress.total}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const pendingCount = pendingItems.length;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSync}
      disabled={pendingCount === 0}
      className={className}
    >
      {pendingCount === 0 ? (
        <>
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
          All Synced
        </>
      ) : (
        <>
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All ({pendingCount})
        </>
      )}
    </Button>
  );
}
