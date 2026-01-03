import { useState, useEffect } from 'react';
import { useParams, useRouter,   } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/AdminRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  role: string | null;
  is_active: boolean | null;
  niche: string | null;
  location: string | null;
  bio: string | null;
  title: string | null;
  calendly_url: string | null;
  avatar_url: string | null;
  specialties: string[] | null;
}

const AgentEditorContent = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  async function fetchProfile() {
    if (!id) return;
    
    setLoading(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } else {
      setProfile(data);
    }

    setLoading(false);
  }

  async function handleSave() {
    if (!profile) return;
    
    setSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        role: profile.role,
        is_active: profile.is_active,
        niche: profile.niche,
        location: profile.location,
        bio: profile.bio,
        title: profile.title,
        calendly_url: profile.calendly_url,
        specialties: profile.specialties
      })
      .eq('id', profile.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to save changes');
    } else {
      toast.success('Profile updated successfully');
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-muted-foreground">Loading profile...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-muted-foreground">Profile not found</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/admin/agents" className="text-primary hover:underline flex items-center mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Agents
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Agent Profile</h1>
            <p className="text-muted-foreground">Update agent information and settings</p>
          </div>

          <div className="bg-card rounded-xl border shadow-sm p-8">
            <div className="space-y-6">
              {/* Status Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label className="text-base font-semibold">Agent Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {profile.is_active ? 'This agent is currently active and visible on the site' : 'This agent is pending approval'}
                  </p>
                </div>
                <Switch
                  checked={profile.is_active || false}
                  onCheckedChange={(checked) => setProfile({ ...profile, is_active: checked })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name || ''}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={profile.title || ''}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="e.g., Healthcare Recruiting Director"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={profile.role || 'user'}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niche">Niche / Specialty</Label>
                  <select
                    id="niche"
                    value={profile.niche || ''}
                    onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="">Select niche</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Sales">Sales</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="e.g., Houston, TX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calendly_url">Calendly URL</Label>
                <Input
                  id="calendly_url"
                  value={profile.calendly_url || ''}
                  onChange={(e) => setProfile({ ...profile, calendly_url: e.target.value })}
                  placeholder="https://calendly.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Enter agent bio..."
                  rows={5}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/agents')}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const AgentEditor = () => (
  <AdminRoute>
    <AgentEditorContent />
  </AdminRoute>
);

export default AgentEditor;
