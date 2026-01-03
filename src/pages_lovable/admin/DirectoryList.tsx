import { useState, useEffect } from 'react';
import {   } from 'next/navigation';
import Link from 'next/link';
import { Plus, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminRoute from '@/components/AdminRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DirectoryFiltersComponent, { DirectoryFilters } from '@/components/dashboard/DirectoryFilters';
import DirectoryCard from '@/components/dashboard/DirectoryCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DirectoryListing {
  id: string;
  listing_title: string | null;
  listing_description: string | null;
  is_featured: boolean;
  is_visible: boolean;
  target_market: string;
  niche: string;
  profile: {
    id: string;
    full_name: string | null;
    username: string;
    avatar_url: string | null;
    title: string | null;
    location: string | null;
  };
}

const DirectoryListContent = () => {
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DirectoryFilters>({
    search: '',
    market: 'all',
    niche: 'all',
    status: 'all',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, [filters]);

  async function fetchListings() {
    setLoading(true);

    let query = supabase
      .from('directory_listings')
      .select(`
        id,
        listing_title,
        listing_description,
        is_featured,
        is_visible,
        target_market,
        niche,
        profile:profiles!directory_listings_profile_id_fkey (
          id,
          full_name,
          username,
          avatar_url,
          title,
          location
        )
      `)
      .order('display_order', { ascending: true });

    // Apply filters
    if (filters.market !== 'all') {
      query = query.eq('target_market', filters.market);
    }
    if (filters.niche !== 'all') {
      query = query.eq('niche', filters.niche);
    }
    if (filters.status === 'visible') {
      query = query.eq('is_visible', true);
    } else if (filters.status === 'hidden') {
      query = query.eq('is_visible', false);
    } else if (filters.status === 'featured') {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch directory listings',
        variant: 'destructive',
      });
    } else {
      let filtered = (data || []).map(item => ({
        ...item,
        profile: item.profile as DirectoryListing['profile']
      }));

      // Apply search filter client-side
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(listing =>
          listing.profile.full_name?.toLowerCase().includes(searchLower) ||
          listing.profile.username.toLowerCase().includes(searchLower) ||
          listing.listing_title?.toLowerCase().includes(searchLower) ||
          listing.profile.location?.toLowerCase().includes(searchLower)
        );
      }

      setListings(filtered);
    }

    setLoading(false);
  }

  async function handleToggleVisibility(id: string, visible: boolean) {
    const { error } = await supabase
      .from('directory_listings')
      .update({ is_visible: visible })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update visibility',
        variant: 'destructive',
      });
    } else {
      setListings(prev =>
        prev.map(l => (l.id === id ? { ...l, is_visible: visible } : l))
      );
      toast({
        title: 'Updated',
        description: `Listing is now ${visible ? 'visible' : 'hidden'}`,
      });
    }
  }

  async function handleToggleFeatured(id: string, featured: boolean) {
    const { error } = await supabase
      .from('directory_listings')
      .update({ is_featured: featured })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update featured status',
        variant: 'destructive',
      });
    } else {
      setListings(prev =>
        prev.map(l => (l.id === id ? { ...l, is_featured: featured } : l))
      );
      toast({
        title: 'Updated',
        description: featured ? 'Listing is now featured' : 'Listing unfeatured',
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    const { error } = await supabase
      .from('directory_listings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      });
    } else {
      setListings(prev => prev.filter(l => l.id !== id));
      toast({
        title: 'Deleted',
        description: 'Listing has been removed',
      });
    }
  }

  return (
    <DashboardLayout title="Directory Listings" showSearch>
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Directory Management</h2>
          <p className="text-muted-foreground">
            {listings.length} listing{listings.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchListings} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button asChild className="gap-2">
            <Link href="/admin/directory/new">
              <Plus className="h-4 w-4" />
              Add Listing
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <DirectoryFiltersComponent onFilterChange={setFilters} />

      {/* Listings Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No listings found</p>
          <Button asChild>
            <Link href="/admin/directory/new">Create First Listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {listings.map(listing => (
            <DirectoryCard
              key={listing.id}
              listing={listing}
              onToggleVisibility={handleToggleVisibility}
              onToggleFeatured={handleToggleFeatured}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

const DirectoryList = () => (
  <AdminRoute>
    <DirectoryListContent />
  </AdminRoute>
);

export default DirectoryList;
