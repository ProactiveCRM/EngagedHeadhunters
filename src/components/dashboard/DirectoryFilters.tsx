import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface DirectoryFiltersProps {
  onFilterChange: (filters: DirectoryFilters) => void;
}

export interface DirectoryFilters {
  search: string;
  market: string;
  niche: string;
  status: 'all' | 'visible' | 'hidden' | 'featured';
}

interface TargetMarket {
  id: string;
  display_name: string;
}

interface Niche {
  id: string;
  display_name: string;
}

export function DirectoryFiltersComponent({ onFilterChange }: DirectoryFiltersProps) {
  const [filters, setFilters] = useState<DirectoryFilters>({
    search: '',
    market: 'all',
    niche: 'all',
    status: 'all',
  });
  const [markets, setMarkets] = useState<TargetMarket[]>([]);
  const [niches, setNiches] = useState<Niche[]>([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  async function fetchFilterOptions() {
    const [marketsRes, nichesRes] = await Promise.all([
      supabase.from('target_markets').select('id, display_name').order('display_order'),
      supabase.from('niches').select('id, display_name').order('display_order'),
    ]);

    if (marketsRes.data) setMarkets(marketsRes.data);
    if (nichesRes.data) setNiches(nichesRes.data);
  }

  const updateFilter = (key: keyof DirectoryFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: DirectoryFilters = {
      search: '',
      market: 'all',
      niche: 'all',
      status: 'all',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.market !== 'all' || 
    filters.niche !== 'all' || 
    filters.status !== 'all';

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, title, location..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Market Filter */}
        <Select value={filters.market} onValueChange={(v) => updateFilter('market', v)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="All Markets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Markets</SelectItem>
            {markets.map(m => (
              <SelectItem key={m.id} value={m.id}>{m.display_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Niche Filter */}
        <Select value={filters.niche} onValueChange={(v) => updateFilter('niche', v)}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="All Niches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Niches</SelectItem>
            {niches.map(n => (
              <SelectItem key={n.id} value={n.id}>{n.display_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(v) => updateFilter('status', v as DirectoryFilters['status'])}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="visible">Visible</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{filters.search}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('search', '')} 
              />
            </Badge>
          )}
          {filters.market !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Market: {markets.find(m => m.id === filters.market)?.display_name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('market', 'all')} 
              />
            </Badge>
          )}
          {filters.niche !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Niche: {niches.find(n => n.id === filters.niche)?.display_name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('niche', 'all')} 
              />
            </Badge>
          )}
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('status', 'all')} 
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default DirectoryFiltersComponent;
