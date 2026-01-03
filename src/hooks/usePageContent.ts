import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface ContentBlock {
  id: string;
  page_slug: string;
  section_id: string;
  content_key: string;
  content_type: string;
  content_value: string | null;
  content_metadata: Json;
  display_order: number;
  is_active: boolean;
  updated_at: string;
}

export interface SectionContent {
  [key: string]: ContentBlock;
}

export interface PageContentMap {
  [sectionId: string]: SectionContent;
}

export function usePageContent(pageSlug: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['page-content', pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_slug', pageSlug)
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      return data as ContentBlock[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Organize content by section and key
  const content: PageContentMap = {};
  data?.forEach((block) => {
    if (!content[block.section_id]) {
      content[block.section_id] = {};
    }
    content[block.section_id][block.content_key] = block;
  });

  const getSection = (sectionId: string): SectionContent => {
    return content[sectionId] || {};
  };

  const getText = (sectionId: string, key: string, fallback = ''): string => {
    return content[sectionId]?.[key]?.content_value || fallback;
  };

  const getImage = (sectionId: string, key: string): { url: string; alt: string } => {
    const block = content[sectionId]?.[key];
    const metadata = block?.content_metadata as Record<string, unknown> | null;
    return {
      url: block?.content_value || '',
      alt: (metadata?.alt as string) || '',
    };
  };

  const getCTA = (sectionId: string, key: string): { text: string; url: string; variant?: string } => {
    const block = content[sectionId]?.[key];
    const metadata = block?.content_metadata as Record<string, unknown> | null;
    return {
      text: block?.content_value || '',
      url: (metadata?.url as string) || '',
      variant: (metadata?.variant as string) || 'default',
    };
  };

  const updateMutation = useMutation({
    mutationFn: async (updates: { id: string; content_value?: string; content_metadata?: Json; is_active?: boolean }) => {
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from('page_content')
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content', pageSlug] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newContent: {
      page_slug: string;
      section_id: string;
      content_key: string;
      content_type?: string;
      content_value?: string;
      content_metadata?: Json;
      display_order?: number;
      is_active?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('page_content')
        .insert(newContent)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content', pageSlug] });
    },
  });

  return {
    content,
    rawContent: data || [],
    loading: isLoading,
    error,
    getSection,
    getText,
    getImage,
    getCTA,
    updateContent: updateMutation.mutateAsync,
    createContent: createMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}

// Hook for admin to get ALL content for a page (including inactive)
export function useAdminPageContent(pageSlug: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-page-content', pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_slug', pageSlug)
        .order('section_id')
        .order('display_order');

      if (error) throw error;
      return data as ContentBlock[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: { id: string; content_value?: string; content_metadata?: Json; is_active?: boolean }) => {
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from('page_content')
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-content', pageSlug] });
      queryClient.invalidateQueries({ queryKey: ['page-content', pageSlug] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newContent: {
      page_slug: string;
      section_id: string;
      content_key: string;
      content_type?: string;
      content_value?: string;
      content_metadata?: Json;
      display_order?: number;
      is_active?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('page_content')
        .insert(newContent)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-content', pageSlug] });
      queryClient.invalidateQueries({ queryKey: ['page-content', pageSlug] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-content', pageSlug] });
      queryClient.invalidateQueries({ queryKey: ['page-content', pageSlug] });
    },
  });

  return {
    content: data || [],
    loading: isLoading,
    error,
    refetch,
    updateContent: updateMutation.mutateAsync,
    createContent: createMutation.mutateAsync,
    deleteContent: deleteMutation.mutateAsync,
    isUpdating: updateMutation.isPending || createMutation.isPending,
  };
}
