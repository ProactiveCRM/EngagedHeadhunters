import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Location {
  id: string;
  display_name: string;
  region: string;
  population: string | null;
  description: string | null;
  industries: string[] | null;
  major_companies: string[] | null;
  geo_lat: number | null;
  geo_lng: number | null;
  market_type: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

export const usePathname = (slug: string) => {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      return data as Location | null;
    },
    enabled: !!slug,
  });
};

export const usePathnames = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('region')
        .order('display_order');

      if (error) throw error;
      return data as Location[];
    },
  });
};

// Group locations by region for display
export const groupLocationsByRegion = (locations: Location[]) => {
  const grouped: Record<string, Location[]> = {};
  
  locations.forEach((location) => {
    if (!grouped[location.region]) {
      grouped[location.region] = [];
    }
    grouped[location.region].push(location);
  });
  
  // Sort regions with Texas first, then alphabetically, Major Markets last
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (a === 'Texas') return -1;
    if (b === 'Texas') return 1;
    if (a === 'Major Markets') return 1;
    if (b === 'Major Markets') return -1;
    return a.localeCompare(b);
  });
  
  return sortedKeys.map(region => ({
    name: region,
    cities: grouped[region],
  }));
};
