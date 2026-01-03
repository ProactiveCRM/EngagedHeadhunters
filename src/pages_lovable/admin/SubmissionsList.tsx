import { useState, useEffect } from 'react';
import { RefreshCw, Mail, Phone, Building, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminRoute from '@/components/AdminRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: string | null;
  source_page: string | null;
  inquiry_type: string | null;
  created_at: string | null;
}

const SubmissionsListContent = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch submissions',
        variant: 'destructive',
      });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  }

  async function handleUpdateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    } else {
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status } : s))
      );
      toast({
        title: 'Updated',
        description: `Status changed to ${status}`,
      });
    }
  }

  const filteredSubmissions = submissions.filter(sub => {
    if (search) {
      const searchLower = search.toLowerCase();
      if (
        !sub.name.toLowerCase().includes(searchLower) &&
        !sub.email.toLowerCase().includes(searchLower) &&
        !sub.company?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (statusFilter !== 'all' && sub.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'new':
        return <Badge variant="default">New</Badge>;
      case 'contacted':
        return <Badge variant="secondary">Contacted</Badge>;
      case 'qualified':
        return <Badge className="bg-green-600">Qualified</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status || 'new'}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Contact Submissions">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Submissions</h2>
          <p className="text-muted-foreground">
            {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" onClick={fetchSubmissions} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <p className="text-muted-foreground">No submissions found</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{sub.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {sub.email}
                      </div>
                      {sub.phone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {sub.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {sub.company ? (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building className="h-3 w-3" />
                        {sub.company}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {sub.source_page && (
                      <Badge variant="outline" className="text-xs">
                        {sub.source_page.replace(/-page$/, '').replace(/-/g, ' ')}
                      </Badge>
                    )}
                    {sub.inquiry_type && (
                      <Badge variant="secondary" className="text-xs ml-1">
                        {sub.inquiry_type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(sub.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(sub.created_at)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={sub.status || 'new'}
                      onValueChange={(v) => handleUpdateStatus(sub.id, v)}
                    >
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardLayout>
  );
};

const SubmissionsList = () => (
  <AdminRoute>
    <SubmissionsListContent />
  </AdminRoute>
);

export default SubmissionsList;
