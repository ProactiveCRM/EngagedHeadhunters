import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  UserPlus, 
  ClipboardList, 
  DollarSign,
  Send,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import type { Candidate, JobOrder, Placement, CandidateSubmission } from '@/lib/ats/types';

interface ActivityItem {
  id: string;
  type: 'sync' | 'create' | 'submit' | 'update';
  entityType: 'candidate' | 'job_order' | 'placement' | 'submission';
  entityName: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

interface ActivityFeedProps {
  candidates?: Candidate[];
  jobOrders?: JobOrder[];
  placements?: Placement[];
  submissions?: CandidateSubmission[];
  limit?: number;
}

export function ActivityFeed({
  candidates = [],
  jobOrders = [],
  placements = [],
  submissions = [],
  limit = 10,
}: ActivityFeedProps) {
  // Derive activities from recent data
  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    // Add synced candidates as activities
    candidates
      .filter(c => c.last_synced_at)
      .forEach(c => {
        items.push({
          id: `sync-candidate-${c.id}`,
          type: 'sync',
          entityType: 'candidate',
          entityName: `${c.first_name} ${c.last_name}`,
          status: 'success',
          timestamp: c.last_synced_at!,
        });
      });

    // Add synced job orders
    jobOrders
      .filter(j => j.last_synced_at)
      .forEach(j => {
        items.push({
          id: `sync-job-${j.id}`,
          type: 'sync',
          entityType: 'job_order',
          entityName: j.job_title,
          status: 'success',
          timestamp: j.last_synced_at!,
        });
      });

    // Add synced placements
    placements
      .filter(p => p.last_synced_at)
      .forEach(p => {
        items.push({
          id: `sync-placement-${p.id}`,
          type: 'sync',
          entityType: 'placement',
          entityName: `${p.candidate_name} at ${p.client_company}`,
          status: 'success',
          timestamp: p.last_synced_at!,
        });
      });

    // Add submissions
    submissions.forEach(s => {
      items.push({
        id: `submit-${s.id}`,
        type: 'submit',
        entityType: 'submission',
        entityName: `Submission ${s.id.slice(0, 8)}`,
        status: s.stage === 'rejected' ? 'failed' : s.stage === 'hired' ? 'success' : 'pending',
        timestamp: s.submitted_at || s.updated_at || new Date().toISOString(),
      });
    });

    // Add recently created items
    candidates
      .filter(c => !c.last_synced_at && c.created_at)
      .slice(0, 5)
      .forEach(c => {
        items.push({
          id: `create-candidate-${c.id}`,
          type: 'create',
          entityType: 'candidate',
          entityName: `${c.first_name} ${c.last_name}`,
          status: 'pending',
          timestamp: c.created_at!,
        });
      });

    // Sort by timestamp, most recent first
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return items.slice(0, limit);
  }, [candidates, jobOrders, placements, submissions, limit]);

  const getIcon = (activity: ActivityItem) => {
    if (activity.type === 'sync') return RefreshCw;
    if (activity.type === 'submit') return Send;
    
    switch (activity.entityType) {
      case 'candidate': return UserPlus;
      case 'job_order': return ClipboardList;
      case 'placement': return DollarSign;
      default: return Clock;
    }
  };

  const getStatusIcon = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-3 w-3 text-green-600" />;
      case 'failed': return <XCircle className="h-3 w-3 text-red-600" />;
      case 'pending': return <Clock className="h-3 w-3 text-yellow-600" />;
    }
  };

  const getTypeLabel = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'sync': return 'Synced';
      case 'create': return 'Created';
      case 'submit': return 'Submitted';
      case 'update': return 'Updated';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activity
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity);
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-full bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{activity.entityName}</span>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(activity)}
                  </Badge>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
