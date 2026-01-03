import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useAgentRole() {
  const { user } = useAuth();
  const [isAgent, setIsAgent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAgentRole() {
      if (!user) {
        setIsAgent(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .in('role', ['agent', 'admin']);

        if (error) {
          console.error('Error checking agent role:', error);
          setIsAgent(false);
        } else {
          setIsAgent(data && data.length > 0);
        }
      } catch (err) {
        console.error('Error in useAgentRole:', err);
        setIsAgent(false);
      } finally {
        setLoading(false);
      }
    }

    checkAgentRole();
  }, [user]);

  return { isAgent, loading };
}

export default useAgentRole;
