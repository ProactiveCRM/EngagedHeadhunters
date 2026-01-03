import { useState, useEffect } from 'react';
import {   } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserCheck, UserX, Edit, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/AdminRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  role: string | null;
  is_active: boolean | null;
  niche: string | null;
  location: string | null;
  created_at: string;
}

const AgentsListContent = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'active'>('all');

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
      toast.error('Failed to load profiles');
    } else {
      setProfiles(data || []);
    }

    setLoading(false);
  }

  async function toggleAgentStatus(profileId: string, currentStatus: boolean | null) {
    const newStatus = !currentStatus;
    
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: newStatus })
      .eq('id', profileId);

    if (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update agent status');
    } else {
      toast.success(`Agent ${newStatus ? 'activated' : 'deactivated'} successfully`);
      fetchProfiles();
    }
  }

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.niche?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'pending') {
      return matchesSearch && !profile.is_active;
    } else if (filter === 'active') {
      return matchesSearch && profile.is_active;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/admin" className="text-primary hover:underline flex items-center mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Agents</h1>
            <p className="text-muted-foreground">Approve, edit, and manage agent profiles</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search by name, username, or niche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'active' ? 'default' : 'outline'}
                onClick={() => setFilter('active')}
              >
                Active
              </Button>
            </div>
          </div>

          {/* Profiles Table */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Niche</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                        Loading profiles...
                      </td>
                    </tr>
                  ) : filteredProfiles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                        No profiles found
                      </td>
                    </tr>
                  ) : (
                    filteredProfiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">
                            {profile.full_name || 'Not set'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{profile.username}</td>
                        <td className="px-6 py-4">
                          <span className="capitalize text-muted-foreground">{profile.role || 'user'}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{profile.niche || '-'}</td>
                        <td className="px-6 py-4 text-muted-foreground">{profile.location || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            profile.is_active 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {profile.is_active ? 'Active' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAgentStatus(profile.id, profile.is_active)}
                              title={profile.is_active ? 'Deactivate' : 'Activate'}
                            >
                              {profile.is_active ? (
                                <UserX size={18} className="text-yellow-600" />
                              ) : (
                                <UserCheck size={18} className="text-green-600" />
                              )}
                            </Button>
                            <Link href={`/admin/agents/${profile.id}`}>
                              <Button variant="ghost" size="sm" title="Edit">
                                <Edit size={18} className="text-primary" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const AgentsList = () => (
  <AdminRoute>
    <AgentsListContent />
  </AdminRoute>
);

export default AgentsList;
