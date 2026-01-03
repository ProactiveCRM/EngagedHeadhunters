import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export function useRealtimeCandidates() {
  const queryClient = useQueryClient();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');

  useEffect(() => {
    const channel = supabase
      .channel('candidates-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'candidates'
        },
        (payload) => {
          // Invalidate candidates query to refetch
          queryClient.invalidateQueries({ queryKey: ['candidates'] });

          // Show toast for changes (optional - only show for external changes)
          const eventType = payload.eventType;
          if (eventType === 'INSERT') {
            toast.info('New candidate added', { duration: 2000 });
          } else if (eventType === 'DELETE') {
            toast.info('Candidate removed', { duration: 2000 });
          }
          // Don't toast for UPDATE as it's too noisy with status changes
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CHANNEL_ERROR') {
          setConnectionStatus('error');
        } else if (status === 'CLOSED') {
          setConnectionStatus('disconnected');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { connectionStatus };
}
