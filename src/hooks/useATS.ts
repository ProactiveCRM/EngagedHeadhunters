import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { 
  Candidate, 
  JobOrder, 
  Placement, 
  CandidateSubmission,
  CandidateFilters,
  JobFilters,
  PlacementFilters,
  CandidateStatus
} from '@/lib/ats/types';

// ============ CANDIDATES ============

export function useCandidates(filters?: CandidateFilters) {
  return useQuery({
    queryKey: ['candidates', filters],
    queryFn: async () => {
      let query = supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status?.length) {
        query = query.in('status', filters.status);
      }
      if (filters?.source) {
        query = query.eq('source', filters.source);
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.search) {
        query = query.or(
          `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,current_company.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as Candidate[];
    },
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as Candidate | null;
    },
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (candidate: Partial<Candidate>) => {
      const { data, error } = await supabase
        .from('candidates')
        .insert(candidate as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating candidate', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateCandidate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Candidate> & { id: string }) => {
      const { data, error } = await supabase
        .from('candidates')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidate', data.id] });
      toast({ title: 'Candidate updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating candidate', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('candidates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting candidate', description: error.message, variant: 'destructive' });
    },
  });
}

// ============ JOB ORDERS ============

export function useJobOrders(filters?: JobFilters) {
  return useQuery({
    queryKey: ['job-orders', filters],
    queryFn: async () => {
      let query = supabase
        .from('job_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status?.length) {
        query = query.in('status', filters.status);
      }
      if (filters?.client_company) {
        query = query.ilike('client_company', `%${filters.client_company}%`);
      }
      if (filters?.assigned_agent) {
        query = query.eq('assigned_agent', filters.assigned_agent);
      }
      if (filters?.search) {
        query = query.or(
          `job_title.ilike.%${filters.search}%,client_company.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as JobOrder[];
    },
  });
}

export function useJobOrder(id: string) {
  return useQuery({
    queryKey: ['job-order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_orders')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as JobOrder | null;
    },
    enabled: !!id,
  });
}

export function useCreateJobOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (job: Partial<JobOrder>) => {
      const { data, error } = await supabase
        .from('job_orders')
        .insert(job as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-orders'] });
      toast({ title: 'Job order created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating job order', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateJobOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<JobOrder> & { id: string }) => {
      const { data, error } = await supabase
        .from('job_orders')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['job-orders'] });
      queryClient.invalidateQueries({ queryKey: ['job-order', data.id] });
      toast({ title: 'Job order updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating job order', description: error.message, variant: 'destructive' });
    },
  });
}

// ============ PLACEMENTS ============

export function usePlacements(filters?: PlacementFilters) {
  return useQuery({
    queryKey: ['placements', filters],
    queryFn: async () => {
      let query = supabase
        .from('placements')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.fee_status?.length) {
        query = query.in('fee_status', filters.fee_status);
      }
      if (filters?.placement_type?.length) {
        query = query.in('placement_type', filters.placement_type);
      }
      if (filters?.agent_id) {
        query = query.eq('agent_id', filters.agent_id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as Placement[];
    },
  });
}

export function useCreatePlacement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (placement: Partial<Placement>) => {
      const { data, error } = await supabase
        .from('placements')
        .insert(placement as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast({ title: 'Placement created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating placement', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdatePlacement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Placement> & { id: string }) => {
      const { data, error } = await supabase
        .from('placements')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast({ title: 'Placement updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating placement', description: error.message, variant: 'destructive' });
    },
  });
}

// ============ SUBMISSIONS ============

export function useSubmissions(jobOrderId?: string) {
  return useQuery({
    queryKey: ['submissions', jobOrderId],
    queryFn: async () => {
      let query = supabase
        .from('candidate_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (jobOrderId) {
        query = query.eq('job_order_id', jobOrderId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as CandidateSubmission[];
    },
  });
}

export function useSubmitCandidate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      candidateId, 
      jobOrderId, 
      submittedBy 
    }: { 
      candidateId: string; 
      jobOrderId: string; 
      submittedBy: string;
    }) => {
      const { data, error } = await supabase
        .from('candidate_submissions')
        .insert({
          candidate_id: candidateId,
          job_order_id: jobOrderId,
          submitted_by: submittedBy,
          stage: 'submitted'
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['job-orders'] });
      toast({ title: 'Candidate submitted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error submitting candidate', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateSubmissionStage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      id, 
      stage, 
      ...updates 
    }: { 
      id: string; 
      stage: string;
      client_feedback?: string;
      rejection_reason?: string;
    }) => {
      const { data, error } = await supabase
        .from('candidate_submissions')
        .update({ stage, ...updates })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      toast({ title: 'Submission stage updated' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating stage', description: error.message, variant: 'destructive' });
    },
  });
}

// ============ ATS SYNC ============

export function useSyncToATS() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      action, 
      data 
    }: { 
      action: 'sync_candidate' | 'sync_job' | 'submit_candidate' | 'create_placement';
      data: Record<string, unknown>;
    }) => {
      const { data: result, error } = await supabase.functions.invoke('ats-sync', {
        body: { action, data }
      });
      if (error) throw error;
      return result;
    },
    onSuccess: (_, { action }) => {
      const actionMessages: Record<string, string> = {
        sync_candidate: 'Candidate synced to ATS',
        sync_job: 'Job synced to ATS',
        submit_candidate: 'Candidate submitted via ATS',
        create_placement: 'Placement synced to ATS'
      };
      toast({ title: actionMessages[action] || 'Synced successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Sync failed', description: error.message, variant: 'destructive' });
    },
  });
}

// ============ CANDIDATE STATUS UPDATE ============

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      candidateId, 
      status 
    }: { 
      candidateId: string; 
      status: CandidateStatus;
    }) => {
      const { data, error } = await supabase
        .from('candidates')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', candidateId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate status updated' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Error updating status', 
        description: error.message, 
        variant: 'destructive' 
      });
    },
  });
}

// ============ STATS ============

export function useATSStats() {
  return useQuery({
    queryKey: ['ats-stats'],
    queryFn: async () => {
      const [candidates, jobs, placements] = await Promise.all([
        supabase.from('candidates').select('status', { count: 'exact' }),
        supabase.from('job_orders').select('status', { count: 'exact' }),
        supabase.from('placements').select('fee_status, fee_total', { count: 'exact' })
      ]);

      const placementData = placements.data || [];
      const totalRevenue = placementData
        .filter(p => p.fee_status === 'paid')
        .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);
      const pendingRevenue = placementData
        .filter(p => p.fee_status !== 'paid')
        .reduce((sum, p) => sum + (Number(p.fee_total) || 0), 0);

      return {
        totalCandidates: candidates.count || 0,
        totalJobs: jobs.count || 0,
        totalPlacements: placements.count || 0,
        totalRevenue,
        pendingRevenue
      };
    },
  });
}
