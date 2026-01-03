import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BulkSyncButton } from './BulkSyncButton';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Users,
  ClipboardList,
  DollarSign
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SyncHealthCardProps {
  entityType: 'candidates' | 'job_orders' | 'placements';
  total: number;
  synced: number;
  pending: number;
  lastSyncedAt?: string;
  pendingItems: { id: string }[];
  onSyncComplete?: () => void;
}

export function SyncHealthCard({
  entityType,
  total,
  synced,
  pending,
  lastSyncedAt,
  pendingItems,
  onSyncComplete,
}: SyncHealthCardProps) {
  const syncPercent = total > 0 ? (synced / total) * 100 : 100;
  
  const getStatus = () => {
    if (pending === 0) return 'healthy';
    if (syncPercent >= 80) return 'warning';
    return 'critical';
  };

  const status = getStatus();

  const iconMap = {
    candidates: Users,
    job_orders: ClipboardList,
    placements: DollarSign,
  };

  const labelMap = {
    candidates: 'Candidates',
    job_orders: 'Job Orders',
    placements: 'Placements',
  };

  const Icon = iconMap[entityType];

  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      color: 'text-green-600',
      badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      label: 'All Synced',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-600',
      badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      label: `${pending} Pending`,
    },
    critical: {
      icon: AlertCircle,
      color: 'text-red-600',
      badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      label: `${pending} Pending`,
    },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            {labelMap[entityType]}
          </CardTitle>
          <Badge className={statusConfig[status].badge}>
            <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig[status].color}`} />
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{synced}</div>
            <div className="text-xs text-muted-foreground">Synced</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress value={syncPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{syncPercent.toFixed(0)}% synced</span>
            {lastSyncedAt && (
              <span>Last: {formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })}</span>
            )}
          </div>
        </div>

        {/* Sync Button */}
        <BulkSyncButton
          entityType={entityType}
          pendingItems={pendingItems}
          onComplete={onSyncComplete}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
}
