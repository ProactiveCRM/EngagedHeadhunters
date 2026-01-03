import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface PageSEOData {
  id: string;
  page_slug: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  canonical_url: string | null;
  robots: string;
  keywords: string[];
  structured_data: Json | null;
  updated_at: string;
}

export function usePageSEO(pageSlug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['page-seo', pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_seo')
        .select('*')
        .eq('page_slug', pageSlug)
        .maybeSingle();

      if (error) throw error;
      return data as PageSEOData | null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    seo: data,
    loading: isLoading,
    error,
  };
}

export function useAdminPageSEO(pageSlug?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-page-seo', pageSlug || 'all'],
    queryFn: async () => {
      let query = supabase.from('page_seo').select('*');
      
      if (pageSlug) {
        query = query.eq('page_slug', pageSlug);
      }
      
      const { data, error } = await query.order('page_slug');

      if (error) throw error;
      return data as PageSEOData[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: {
      id?: string;
      page_slug: string;
      meta_title?: string | null;
      meta_description?: string | null;
      og_title?: string | null;
      og_description?: string | null;
      og_image?: string | null;
      twitter_title?: string | null;
      twitter_description?: string | null;
      twitter_image?: string | null;
      canonical_url?: string | null;
      robots?: string;
      keywords?: string[];
      structured_data?: Json | null;
    }) => {
      const { id, ...rest } = updates;
      
      if (id) {
        // Update existing
        const { data, error } = await supabase
          .from('page_seo')
          .update({ ...rest, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Upsert new
        const { data, error } = await supabase
          .from('page_seo')
          .upsert({ ...rest }, { onConflict: 'page_slug' })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-seo'] });
      queryClient.invalidateQueries({ queryKey: ['page-seo'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('page_seo')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-seo'] });
      queryClient.invalidateQueries({ queryKey: ['page-seo'] });
    },
  });

  return {
    seoData: data || [],
    loading: isLoading,
    error,
    refetch,
    updateSEO: updateMutation.mutateAsync,
    deleteSEO: deleteMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
