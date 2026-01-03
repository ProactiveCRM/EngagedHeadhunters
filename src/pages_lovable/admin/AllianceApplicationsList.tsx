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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Search, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe,
  Users,
  UserPlus,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface AllianceApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  location: string;
  years_experience: number;
  specialty_niche: string;
  current_placements_year: string;
  why_join: string;
  how_heard: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  status: string;
  created_at: string;
}

function AllianceApplicationsListContent() {
  const [applications, setApplications] = useState<AllianceApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('alliance_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('alliance_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
      );
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      searchQuery === '' ||
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || app.specialty_niche.toLowerCase() === specialtyFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-primary text-primary-foreground">New</Badge>;
      case 'contacted':
        return <Badge variant="secondary">Contacted</Badge>;
      case 'approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>;
      case 'declined':
        return <Badge className="bg-red-600 text-white">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const specialties = [...new Set(applications.map(app => app.specialty_niche))];

  // Stats calculations
  const totalApplications = applications.length;
  const newApplications = applications.filter(app => app.status === 'new').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const conversionRate = totalApplications > 0 ? ((approvedApplications / totalApplications) * 100).toFixed(1) : '0';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alliance Applications</h1>
            <p className="text-muted-foreground">Manage recruiter alliance applications</p>
          </div>
          <Button onClick={fetchApplications} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <UserPlus className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{newApplications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedApplications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company, location..."
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
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty.toLowerCase()}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading applications...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {applications.length === 0 ? 'No applications yet' : 'No applications match your filters'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company & Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Placements/Yr</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[140px]">Update Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map(app => (
                  <Collapsible key={app.id} asChild open={expandedRow === app.id}>
                    <>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setExpandedRow(expandedRow === app.id ? null : app.id)}
                            >
                              {expandedRow === app.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{app.full_name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <a href={`mailto:${app.email}`} className="hover:text-primary flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {app.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{app.company_name}</p>
                          <p className="text-sm text-muted-foreground">{app.location}</p>
                        </TableCell>
                        <TableCell>
                          <p>{app.years_experience} years</p>
                          <p className="text-sm text-muted-foreground">{app.specialty_niche}</p>
                        </TableCell>
                        <TableCell>
                          <p>{app.current_placements_year}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(app.created_at)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={app.status}
                            onValueChange={(value) => handleUpdateStatus(app.id, value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="declined">Declined</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={8} className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-sm font-medium text-foreground mb-1">Why They Want to Join</h4>
                                  <p className="text-sm text-muted-foreground">{app.why_join}</p>
                                </div>
                                {app.how_heard && (
                                  <div>
                                    <h4 className="text-sm font-medium text-foreground mb-1">How They Heard About Us</h4>
                                    <p className="text-sm text-muted-foreground">{app.how_heard}</p>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-foreground mb-1">Links</h4>
                                <div className="flex flex-wrap gap-2">
                                  {app.linkedin_url && (
                                    <a
                                      href={app.linkedin_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                    >
                                      <Linkedin className="h-4 w-4" />
                                      LinkedIn Profile
                                    </a>
                                  )}
                                  {app.website_url && (
                                    <a
                                      href={app.website_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                    >
                                      <Globe className="h-4 w-4" />
                                      Website
                                    </a>
                                  )}
                                  {!app.linkedin_url && !app.website_url && (
                                    <p className="text-sm text-muted-foreground">No links provided</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

const AllianceApplicationsList = () => {
  return (
    <AdminRoute>
      <AllianceApplicationsListContent />
    </AdminRoute>
  );
};

export default AllianceApplicationsList;
