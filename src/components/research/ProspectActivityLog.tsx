import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Tag, Send, CheckCircle, Edit, Trash2, Plus, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  prospect_id: string;
  user_id: string;
  activity_type: string;
  description: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
}

interface ProspectActivityLogProps {
  prospectId: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'status_change':
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case 'outreach_status_change':
      return <Send className="h-4 w-4 text-orange-500" />;
    case 'tag_added':
    case 'tag_removed':
      return <Tag className="h-4 w-4 text-purple-500" />;
    case 'note_updated':
      return <Edit className="h-4 w-4 text-gray-500" />;
    case 'enriched':
      return <Zap className="h-4 w-4 text-yellow-500" />;
    case 'created':
      return <Plus className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

export const ProspectActivityLog = ({ prospectId }: ProspectActivityLogProps) => {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['prospect-activities', prospectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospect_activities')
        .select('*')
        .eq('prospect_id', prospectId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as Activity[];
    },
    enabled: !!prospectId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        No activity recorded yet
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3 text-sm">
          <div className="flex-shrink-0 mt-0.5">
            {getActivityIcon(activity.activity_type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground">{activity.description}</p>
            {(activity.old_value || activity.new_value) && (
              <div className="flex items-center gap-2 mt-1">
                {activity.old_value && (
                  <Badge variant="outline" className="text-xs text-muted-foreground line-through">
                    {activity.old_value}
                  </Badge>
                )}
                {activity.old_value && activity.new_value && (
                  <span className="text-muted-foreground">→</span>
                )}
                {activity.new_value && (
                  <Badge variant="secondary" className="text-xs">
                    {activity.new_value}
                  </Badge>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProspectActivityLog;
