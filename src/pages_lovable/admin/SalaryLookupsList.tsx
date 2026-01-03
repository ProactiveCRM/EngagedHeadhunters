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
  DollarSign,
  MapPin,
  Briefcase,
  TrendingUp,
  Download
} from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

interface SalaryLookup {
  id: string;
  role_title: string;
  location: string;
  experience_level: string | null;
  industry: string | null;
  user_email: string | null;
  result_data: Json;
  created_at: string | null;
}

function SalaryLookupsListContent() {
  const [lookups, setLookups] = useState<SalaryLookup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchLookups = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('salary_lookups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLookups(data || []);
    } catch (error) {
      console.error('Error fetching lookups:', error);
      toast.error('Failed to load salary lookups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLookups();
  }, []);

  const handleExportCSV = () => {
    const csvData = filteredLookups.map(lookup => ({
      role: lookup.role_title,
      location: lookup.location,
      experience: lookup.experience_level || '',
      industry: lookup.industry || '',
      email: lookup.user_email || '',
      date: lookup.created_at || ''
    }));

    const headers = ['Role', 'Location', 'Experience', 'Industry', 'Email', 'Date'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-lookups-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const filteredLookups = lookups.filter(lookup => {
    const matchesSearch =
      searchQuery === '' ||
      lookup.role_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lookup.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lookup.user_email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = locationFilter === 'all' || 
      lookup.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const locations = [...new Set(lookups.map(l => l.location))];

  // Stats
  const totalLookups = lookups.length;
  const uniqueRoles = [...new Set(lookups.map(l => l.role_title))].length;
  const uniqueLocations = locations.length;
  const withEmail = lookups.filter(l => l.user_email).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Salary Lookups</h1>
            <p className="text-muted-foreground">View salary research data from users</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={fetchLookups} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lookups</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLookups}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Roles</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{uniqueRoles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueLocations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Email</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{withEmail}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by role, location, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading lookups...</div>
          ) : filteredLookups.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {lookups.length === 0 ? 'No salary lookups yet' : 'No lookups match your filters'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLookups.map(lookup => (
                  <Collapsible key={lookup.id} asChild open={expandedRow === lookup.id}>
                    <>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setExpandedRow(expandedRow === lookup.id ? null : lookup.id)}
                            >
                              {expandedRow === lookup.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="font-medium">{lookup.role_title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {lookup.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          {lookup.experience_level ? (
                            <Badge variant="secondary">{lookup.experience_level}</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lookup.industry || '-'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lookup.user_email || '-'}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(lookup.created_at)}
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={7} className="p-4">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Result Data</h4>
                              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                                {JSON.stringify(lookup.result_data, null, 2)}
                              </pre>
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

const SalaryLookupsList = () => {
  return (
    <AdminRoute>
      <SalaryLookupsListContent />
    </AdminRoute>
  );
};

export default SalaryLookupsList;
