import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GlobalSetting {
  id: string;
  value: string | null;
  value_type: string;
  category: string;
  label: string | null;
  description: string | null;
  display_order: number;
  updated_at: string;
}

export function useGlobalSettings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['global-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_settings')
        .select('*')
        .order('category')
        .order('display_order');

      if (error) throw error;
      return data as GlobalSetting[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create a lookup map for easy access
  const settingsMap: Record<string, string> = {};
  data?.forEach((setting) => {
    settingsMap[setting.id] = setting.value || '';
  });

  const get = (key: string, fallback = ''): string => {
    return settingsMap[key] || fallback;
  };

  const getByCategory = (category: string): GlobalSetting[] => {
    return data?.filter((s) => s.category === category) || [];
  };

  return {
    settings: data || [],
    settingsMap,
    get,
    getByCategory,
    loading: isLoading,
    error,
  };
}

export function useAdminGlobalSettings() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-global-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_settings')
        .select('*')
        .order('category')
        .order('display_order');

      if (error) throw error;
      return data as GlobalSetting[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: { id: string; value: string }) => {
      const { data, error } = await supabase
        .from('global_settings')
        .update({ value: updates.value, updated_at: new Date().toISOString() })
        .eq('id', updates.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-global-settings'] });
      queryClient.invalidateQueries({ queryKey: ['global-settings'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newSetting: Omit<GlobalSetting, 'updated_at'>) => {
      const { data, error } = await supabase
        .from('global_settings')
        .insert(newSetting)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-global-settings'] });
      queryClient.invalidateQueries({ queryKey: ['global-settings'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('global_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-global-settings'] });
      queryClient.invalidateQueries({ queryKey: ['global-settings'] });
    },
  });

  // Group by category
  const byCategory: Record<string, GlobalSetting[]> = {};
  data?.forEach((setting) => {
    if (!byCategory[setting.category]) {
      byCategory[setting.category] = [];
    }
    byCategory[setting.category].push(setting);
  });

  return {
    settings: data || [],
    byCategory,
    loading: isLoading,
    error,
    refetch,
    updateSetting: updateMutation.mutateAsync,
    createSetting: createMutation.mutateAsync,
    deleteSetting: deleteMutation.mutateAsync,
    isUpdating: updateMutation.isPending || createMutation.isPending,
  };
}
