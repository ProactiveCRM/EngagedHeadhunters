import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityTimelineProps {
  candidateId: string;
  createdAt?: string;
  updatedAt?: string;
  lastSyncedAt?: string;
}

interface ActivityEvent {
  id: string;
  type: 'submission' | 'sync' | 'created' | 'updated' | 'stage_change';
  title: string;
  description?: string;
  timestamp: string;
  icon: React.ReactNode;
  iconClass: string;
}

export function ActivityTimeline({ 
  candidateId, 
  createdAt, 
  updatedAt, 
  lastSyncedAt 
}: ActivityTimelineProps) {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ['candidate-submissions', candidateId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidate_submissions')
        .select(`
          id,
          stage,
          submitted_at,
          updated_at,
          client_feedback,
          rejection_reason,
          job_order_id
        `)
        .eq('candidate_id', candidateId)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!candidateId,
  });

  // Fetch job details for submissions
  const { data: jobOrders } = useQuery({
    queryKey: ['submission-jobs', submissions?.map(s => s.job_order_id)],
    queryFn: async () => {
      if (!submissions?.length) return {};
      const jobIds = [...new Set(submissions.map(s => s.job_order_id).filter(Boolean))];
      if (!jobIds.length) return {};
      
      const { data, error } = await supabase
        .from('job_orders')
        .select('id, job_title, client_company')
        .in('id', jobIds);
      
      if (error) throw error;
      return (data || []).reduce((acc, job) => {
        acc[job.id] = job;
        return acc;
      }, {} as Record<string, { job_title: string; client_company: string }>);
    },
    enabled: !!submissions?.length,
  });

  // Build activity events
  const buildEvents = (): ActivityEvent[] => {
    const events: ActivityEvent[] = [];

    // Submission events
    submissions?.forEach((sub) => {
      const job = jobOrders?.[sub.job_order_id];
      events.push({
        id: `sub-${sub.id}`,
        type: 'submission',
        title: 'Submitted to job',
        description: job ? `${job.job_title} at ${job.client_company}` : 'Unknown job',
        timestamp: sub.submitted_at || '',
        icon: <Send className="h-4 w-4" />,
        iconClass: 'bg-primary text-primary-foreground',
      });

      // Stage changes from submission
      if (sub.stage && sub.stage !== 'submitted' && sub.updated_at !== sub.submitted_at) {
        const stageLabels: Record<string, string> = {
          screening: 'Moved to Screening',
          interview: 'Scheduled Interview',
          offer: 'Offer Extended',
          hired: 'Hired!',
          rejected: 'Rejected',
        };
        events.push({
          id: `stage-${sub.id}`,
          type: 'stage_change',
          title: stageLabels[sub.stage] || `Stage: ${sub.stage}`,
          description: sub.client_feedback || sub.rejection_reason || undefined,
          timestamp: sub.updated_at || '',
          icon: <ArrowRight className="h-4 w-4" />,
          iconClass: sub.stage === 'rejected' 
            ? 'bg-destructive text-destructive-foreground' 
            : sub.stage === 'hired'
            ? 'bg-green-500 text-white'
            : 'bg-secondary text-secondary-foreground',
        });
      }
    });

    // Sync event
    if (lastSyncedAt) {
      events.push({
        id: 'sync',
        type: 'sync',
        title: 'Synced to ATS',
        timestamp: lastSyncedAt,
        icon: <CheckCircle2 className="h-4 w-4" />,
        iconClass: 'bg-green-500 text-white',
      });
    }

    // Updated event (only if different from created)
    if (updatedAt && createdAt && updatedAt !== createdAt) {
      events.push({
        id: 'updated',
        type: 'updated',
        title: 'Profile updated',
        timestamp: updatedAt,
        icon: <RefreshCw className="h-4 w-4" />,
        iconClass: 'bg-muted text-muted-foreground',
      });
    }

    // Created event
    if (createdAt) {
      events.push({
        id: 'created',
        type: 'created',
        title: 'Candidate created',
        timestamp: createdAt,
        icon: <Plus className="h-4 w-4" />,
        iconClass: 'bg-primary text-primary-foreground',
      });
    }

    // Sort by timestamp descending
    return events.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const events = buildEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <Clock className="h-8 w-8 mb-2" />
        <p className="text-sm">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex gap-3 pl-0">
            {/* Icon */}
            <div className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full",
              event.iconClass
            )}>
              {event.icon}
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-medium">{event.title}</p>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
              <p 
                className="text-xs text-muted-foreground mt-1"
                title={event.timestamp ? format(new Date(event.timestamp), 'PPpp') : undefined}
              >
                {event.timestamp && formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
