import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import AdminRoute from '@/components/AdminRoute';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Search, 
  RefreshCw, 
  Mail,
  Users,
  UserCheck,
  UserX,
  Download
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  source_page: string | null;
  is_active: boolean | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  ghl_contact_id: string | null;
}

function SubscribersListContent() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean | null) => {
    try {
      const updates: { is_active: boolean; unsubscribed_at: string | null } = {
        is_active: !currentStatus,
        unsubscribed_at: currentStatus ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('subscribers')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setSubscribers(prev =>
        prev.map(sub => (sub.id === id ? { ...sub, ...updates } : sub))
      );
      toast.success(currentStatus ? 'Subscriber deactivated' : 'Subscriber reactivated');
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast.error('Failed to update subscriber');
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredSubscribers.map(sub => ({
      email: sub.email,
      source: sub.source_page || '',
      status: sub.is_active ? 'Active' : 'Unsubscribed',
      subscribed_at: sub.subscribed_at,
      unsubscribed_at: sub.unsubscribed_at || ''
    }));

    const headers = ['Email', 'Source', 'Status', 'Subscribed At', 'Unsubscribed At'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch =
      searchQuery === '' ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.source_page?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && sub.is_active) ||
      (statusFilter === 'unsubscribed' && !sub.is_active);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Stats
  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.is_active).length;
  const unsubscribed = subscribers.filter(s => !s.is_active).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
            <p className="text-muted-foreground">Manage email subscribers</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={fetchSubscribers} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubscribers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeSubscribers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unsubscribed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading subscribers...</div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {subscribers.length === 0 ? 'No subscribers yet' : 'No subscribers match your filters'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>GHL Synced</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map(sub => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{sub.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {sub.source_page || '-'}
                    </TableCell>
                    <TableCell>
                      {sub.is_active ? (
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Unsubscribed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(sub.subscribed_at)}
                    </TableCell>
                    <TableCell>
                      {sub.ghl_contact_id ? (
                        <Badge variant="outline" className="text-xs">Synced</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(sub.id, sub.is_active)}
                      >
                        {sub.is_active ? 'Deactivate' : 'Reactivate'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

const SubscribersList = () => {
  return (
    <AdminRoute>
      <SubscribersListContent />
    </AdminRoute>
  );
};

export default SubscribersList;
