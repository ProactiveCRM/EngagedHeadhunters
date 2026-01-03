"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAgentRole } from '@/hooks/useAgentRole';
import { useAuth } from '@/hooks/useAuth';

interface AgentRouteProps {
  children: ReactNode;
}

const AgentRoute = ({ children }: AgentRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAgent, loading: agentLoading } = useAgentRole();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !agentLoading) {
      if (!user) {
        router.replace('/auth');
      } else if (!isAgent) {
        router.replace('/');
      }
    }
  }, [user, isAgent, authLoading, agentLoading, router]);

  if (authLoading || agentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAgent) {
    return null;
  }

  return <>{children}</>;
};

export default AgentRoute;
