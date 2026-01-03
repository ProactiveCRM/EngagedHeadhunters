import { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminRoute from '@/components/AdminRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserTable from '@/components/dashboard/UserTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
  is_active: boolean | null;
  created_at: string;
}

const UsersListContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, search, roleFilter, statusFilter]);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  }

  function applyFilters() {
    let filtered = [...users];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        u =>
          u.full_name?.toLowerCase().includes(searchLower) ||
          u.username.toLowerCase().includes(searchLower) ||
          u.email?.toLowerCase().includes(searchLower)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(u => u.is_active === isActive);
    }

    setFilteredUsers(filtered);
  }

  async function handleToggleActive(id: string, active: boolean) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: active })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    } else {
      setUsers(prev =>
        prev.map(u => (u.id === id ? { ...u, is_active: active } : u))
      );
      toast({
        title: 'Updated',
        description: `User is now ${active ? 'active' : 'inactive'}`,
      });
    }
  }

  async function handleChangeRole(id: string, role: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    } else {
      setUsers(prev =>
        prev.map(u => (u.id === id ? { ...u, role } : u))
      );
      toast({
        title: 'Updated',
        description: `User role changed to ${role}`,
      });
    }
  }

  return (
    <DashboardLayout title="User Management">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Users</h2>
          <p className="text-muted-foreground">
            {filteredUsers.length} of {users.length} user{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" onClick={fetchUsers} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <UserTable
        users={filteredUsers}
        onToggleActive={handleToggleActive}
        onChangeRole={handleChangeRole}
        loading={loading}
      />
    </DashboardLayout>
  );
};

const UsersList = () => (
  <AdminRoute>
    <UsersListContent />
  </AdminRoute>
);

export default UsersList;
