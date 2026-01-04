import { useState, useEffect } from 'react';
import { useParams, useRouter, } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminRoute from '@/components/AdminRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
}

interface TargetMarket {
  id: string;
  display_name: string;
}

interface Niche {
  id: string;
  display_name: string;
}

const DirectoryEditorContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [markets, setMarkets] = useState<TargetMarket[]>([]);
  const [niches, setNiches] = useState<Niche[]>([]);

  const [formData, setFormData] = useState({
    profile_id: '',
    target_market: '',
    niche: '',
    listing_title: '',
    listing_description: '',
    is_featured: false,
    is_visible: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchOptions();
    if (!isNew) fetchListing();
  }, [id]);

  async function fetchOptions() {
    const [profilesRes, marketsRes, nichesRes] = await Promise.all([
      supabase.from('profiles').select('id, username, full_name').order('full_name'),
      supabase.from('target_markets').select('id, display_name').order('display_order'),
      supabase.from('niches').select('id, display_name').order('display_order'),
    ]);

    if (profilesRes.data) setProfiles(profilesRes.data);
    if (marketsRes.data) setMarkets(marketsRes.data);
    if (nichesRes.data) setNiches(nichesRes.data);
  }

  async function fetchListing() {
    const { data, error } = await supabase
      .from('directory_listings')
      .select('*')
      .eq('id', id as string)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: 'Error',
        description: 'Listing not found',
        variant: 'destructive',
      });
      router.push('/admin/directory');
      return;
    }

    setFormData({
      profile_id: data.profile_id,
      target_market: data.target_market,
      niche: data.niche,
      listing_title: data.listing_title || '',
      listing_description: data.listing_description || '',
      is_featured: data.is_featured || false,
      is_visible: data.is_visible ?? true,
      display_order: data.display_order || 0,
    });
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.profile_id || !formData.target_market || !formData.niche) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    const payload = {
      profile_id: formData.profile_id,
      target_market: formData.target_market,
      niche: formData.niche,
      listing_title: formData.listing_title || null,
      listing_description: formData.listing_description || null,
      is_featured: formData.is_featured,
      is_visible: formData.is_visible,
      display_order: formData.display_order,
    };

    let error;
    if (isNew) {
      const res = await supabase.from('directory_listings').insert(payload);
      error = res.error;
    } else {
      const res = await supabase.from('directory_listings').update(payload).eq('id', id as string);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save listing',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: isNew ? 'Listing created' : 'Listing updated',
      });
      router.push('/admin/directory');
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Loading...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={isNew ? 'New Listing' : 'Edit Listing'}>
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link href="/admin/directory" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Link>
      </Button>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          {/* Profile Selection */}
          <div className="space-y-2">
            <Label htmlFor="profile">Agent Profile *</Label>
            <Select
              value={formData.profile_id}
              onValueChange={(v) => setFormData(prev => ({ ...prev, profile_id: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.full_name || p.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Market & Niche */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market">Target Market *</Label>
              <Select
                value={formData.target_market}
                onValueChange={(v) => setFormData(prev => ({ ...prev, target_market: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.display_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="niche">Niche *</Label>
              <Select
                value={formData.niche}
                onValueChange={(v) => setFormData(prev => ({ ...prev, niche: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  {niches.map(n => (
                    <SelectItem key={n.id} value={n.id}>{n.display_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <Label htmlFor="title">Listing Title (Optional)</Label>
            <Input
              id="title"
              value={formData.listing_title}
              onChange={(e) => setFormData(prev => ({ ...prev, listing_title: e.target.value }))}
              placeholder="Custom title for this listing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Listing Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.listing_description}
              onChange={(e) => setFormData(prev => ({ ...prev, listing_description: e.target.value }))}
              placeholder="Custom description for this listing"
              rows={4}
            />
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
              min={0}
            />
            <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <Switch
                id="visible"
                checked={formData.is_visible}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_visible: checked }))}
              />
              <Label htmlFor="visible">Visible on site</Label>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="featured">Featured listing</Label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isNew ? 'Create Listing' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/admin/directory')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

const DirectoryEditor = () => (
  <AdminRoute>
    <DirectoryEditorContent />
  </AdminRoute>
);

export default DirectoryEditor;
