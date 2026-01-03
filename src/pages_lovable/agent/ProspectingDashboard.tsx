import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { ProspectActivityLog } from '@/components/research/ProspectActivityLog';
import { ProspectTags } from '@/components/research/ProspectTags';
import { ProspectReminders, DueRemindersWidget } from '@/components/research/ProspectReminders';
import { ProspectCSVImport } from '@/components/research/ProspectCSVImport';
import { ProspectScore, ScoreBreakdown } from '@/components/research/ProspectScore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Search, Plus, Building2, User, Globe, Mail, Phone, Linkedin, 
  Zap, RefreshCw, Send, Loader2, ExternalLink, Target, 
  TrendingUp, Users, Briefcase, Database, Webhook, Settings,
  Filter, Download, Trash2, CheckCircle, Clock, AlertCircle,
  CheckSquare, Square, X, FileText, Tag, History, Bell, FileUp
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Prospect {
  id: string;
  created_at: string;
  updated_at: string;
  prospect_type: string;
  status: string;
  company_name: string | null;
  company_domain: string | null;
  company_industry: string | null;
  company_size: string | null;
  company_location: string | null;
  company_linkedin: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_title: string | null;
  contact_linkedin: string | null;
  enrichment_data: Record<string, any> | null;
  enriched_at: string | null;
  enrichment_source: string | null;
  outreach_campaign: string | null;
  outreach_status: string | null;
  last_outreach_at: string | null;
  score: number;
  tags: string[] | null;
  notes: string | null;
  source: string | null;
}

const ProspectingDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [outreachFilter, setOutreachFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEnrichDialogOpen, setIsEnrichDialogOpen] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<'outreach_status' | 'status' | 'delete'>('outreach_status');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [newTag, setNewTag] = useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  
  // New prospect form
  const [newProspect, setNewProspect] = useState({
    prospect_type: 'company',
    company_name: '',
    company_domain: '',
    contact_name: '',
    contact_email: '',
    contact_linkedin: '',
    notes: '',
    source: 'manual',
  });

  // Enrichment form
  const [enrichForm, setEnrichForm] = useState({
    url: '',
    enrichType: 'company',
  });

  // Webhook form
  const [webhookForm, setWebhookForm] = useState({
    webhookUrl: '',
    platform: 'smartlead',
    campaignId: '',
  });

  // Fetch prospects
  const { data: prospects = [], isLoading } = useQuery({
    queryKey: ['prospects', statusFilter, typeFilter, outreachFilter],
    queryFn: async () => {
      let query = supabase
        .from('prospects')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (typeFilter !== 'all') {
        query = query.eq('prospect_type', typeFilter);
      }
      if (outreachFilter !== 'all') {
        query = query.eq('outreach_status', outreachFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Prospect[];
    },
  });

  // Add prospect mutation
  const addProspectMutation = useMutation({
    mutationFn: async (prospect: typeof newProspect) => {
      const { data, error } = await supabase
        .from('prospects')
        .insert({
          ...prospect,
          created_by: user?.id,
          status: 'new',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Success', description: 'Prospect added successfully' });
      setIsAddDialogOpen(false);
      setNewProspect({
        prospect_type: 'company',
        company_name: '',
        company_domain: '',
        contact_name: '',
        contact_email: '',
        contact_linkedin: '',
        notes: '',
        source: 'manual',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Enrich prospect mutation
  const enrichMutation = useMutation({
    mutationFn: async ({ prospectId, url, enrichType }: { prospectId: string; url?: string; enrichType: string }) => {
      const { data, error } = await supabase.functions.invoke('prospect-enrich', {
        body: { prospectId, url, enrichType },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Success', description: `Prospect enriched via ${data.source}` });
      setIsEnrichDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Webhook mutation
  const webhookMutation = useMutation({
    mutationFn: async (params: { prospectId: string; webhookUrl: string; platform: string; campaignId?: string }) => {
      const { data, error } = await supabase.functions.invoke('outreach-webhook', {
        body: params,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ 
        title: data.success ? 'Success' : 'Warning', 
        description: data.message,
        variant: data.success ? 'default' : 'destructive',
      });
      setIsWebhookDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Delete prospect mutation
  const deleteMutation = useMutation({
    mutationFn: async (prospectId: string) => {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', prospectId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Deleted', description: 'Prospect removed' });
    },
  });

  // Update prospect mutation
  const updateProspectMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Prospect> }) => {
      const { data, error } = await supabase
        .from('prospects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Updated', description: 'Prospect updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: Partial<Prospect> }) => {
      const { error } = await supabase
        .from('prospects')
        .update(updates)
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: (_, { ids }) => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Updated', description: `${ids.length} prospects updated successfully` });
      setSelectedIds(new Set());
      setIsBulkActionDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({ title: 'Deleted', description: `${ids.length} prospects deleted` });
      setSelectedIds(new Set());
      setIsBulkActionDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const outreachStatuses = [
    { value: 'not_started', label: 'Not Started', icon: <Clock className="h-3 w-3" /> },
    { value: 'queued', label: 'Queued', icon: <Database className="h-3 w-3" /> },
    { value: 'email_sent', label: 'Email Sent', icon: <Mail className="h-3 w-3" /> },
    { value: 'linkedin_sent', label: 'LinkedIn Sent', icon: <Linkedin className="h-3 w-3" /> },
    { value: 'follow_up_1', label: 'Follow-up 1', icon: <Send className="h-3 w-3" /> },
    { value: 'follow_up_2', label: 'Follow-up 2', icon: <Send className="h-3 w-3" /> },
    { value: 'follow_up_3', label: 'Follow-up 3', icon: <Send className="h-3 w-3" /> },
    { value: 'replied', label: 'Replied', icon: <CheckCircle className="h-3 w-3" /> },
    { value: 'meeting_booked', label: 'Meeting Booked', icon: <Target className="h-3 w-3" /> },
    { value: 'not_interested', label: 'Not Interested', icon: <AlertCircle className="h-3 w-3" /> },
    { value: 'bounced', label: 'Bounced', icon: <AlertCircle className="h-3 w-3" /> },
  ];

  const getOutreachStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
    
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
      not_started: { variant: 'outline' },
      queued: { variant: 'secondary' },
      email_sent: { variant: 'outline', className: 'border-blue-500 text-blue-600' },
      linkedin_sent: { variant: 'outline', className: 'border-blue-500 text-blue-600' },
      follow_up_1: { variant: 'outline', className: 'border-orange-500 text-orange-600' },
      follow_up_2: { variant: 'outline', className: 'border-orange-500 text-orange-600' },
      follow_up_3: { variant: 'outline', className: 'border-orange-500 text-orange-600' },
      replied: { variant: 'default', className: 'bg-green-500' },
      meeting_booked: { variant: 'default', className: 'bg-green-600' },
      not_interested: { variant: 'destructive' },
      bounced: { variant: 'destructive' },
    };
    
    const config = statusConfig[status] || { variant: 'outline' as const };
    const statusInfo = outreachStatuses.find(s => s.value === status);
    
    return (
      <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className || ''}`}>
        {statusInfo?.icon}
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const openProspectDetail = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setEditingNotes(prospect.notes || '');
    setIsDetailDialogOpen(true);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProspects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProspects.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkOutreachUpdate = (status: string) => {
    const ids = Array.from(selectedIds);
    bulkUpdateMutation.mutate({
      ids,
      updates: {
        outreach_status: status,
        last_outreach_at: new Date().toISOString(),
      },
    });
  };

  const handleBulkStatusUpdate = (status: string) => {
    const ids = Array.from(selectedIds);
    bulkUpdateMutation.mutate({
      ids,
      updates: { status },
    });
  };

  const handleBulkDelete = () => {
    const ids = Array.from(selectedIds);
    bulkDeleteMutation.mutate(ids);
  };

  // Get all unique tags from prospects
  const allTags = Array.from(new Set(prospects.flatMap(p => p.tags || [])));

  const filteredProspects = prospects.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      p.company_name?.toLowerCase().includes(searchLower) ||
      p.contact_name?.toLowerCase().includes(searchLower) ||
      p.contact_email?.toLowerCase().includes(searchLower) ||
      p.company_domain?.toLowerCase().includes(searchLower)
    );
    const matchesTag = tagFilter === 'all' || (p.tags && p.tags.includes(tagFilter));
    return matchesSearch && matchesTag;
  });

  // CSV Export function
  const exportToCSV = () => {
    const prospectsToExport = selectedIds.size > 0 
      ? filteredProspects.filter(p => selectedIds.has(p.id))
      : filteredProspects;
    
    if (prospectsToExport.length === 0) {
      toast({ title: 'No data', description: 'No prospects to export', variant: 'destructive' });
      return;
    }

    const headers = [
      'Company Name', 'Contact Name', 'Contact Email', 'Contact Phone', 'Contact Title',
      'Company Domain', 'Company Industry', 'Company Size', 'Company Location',
      'LinkedIn', 'Status', 'Outreach Status', 'Last Outreach', 'Campaign',
      'Tags', 'Notes', 'Source', 'Created At'
    ];

    const rows = prospectsToExport.map(p => [
      p.company_name || '',
      p.contact_name || '',
      p.contact_email || '',
      p.contact_phone || '',
      p.contact_title || '',
      p.company_domain || '',
      p.company_industry || '',
      p.company_size || '',
      p.company_location || '',
      p.contact_linkedin || p.company_linkedin || '',
      p.status,
      p.outreach_status || '',
      p.last_outreach_at ? new Date(p.last_outreach_at).toLocaleDateString() : '',
      p.outreach_campaign || '',
      (p.tags || []).join('; '),
      (p.notes || '').replace(/"/g, '""'),
      p.source || '',
      new Date(p.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `prospects-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({ 
      title: 'Exported', 
      description: `${prospectsToExport.length} prospects exported to CSV` 
    });
  };

  // Log activity function
  const logActivity = async (prospectId: string, activityType: string, description: string, oldValue?: string, newValue?: string) => {
    if (!user) return;
    await supabase.from('prospect_activities').insert({
      prospect_id: prospectId,
      user_id: user.id,
      activity_type: activityType,
      description,
      old_value: oldValue,
      new_value: newValue,
    });
  };

  // Add tag to prospect
  const addTagToProspect = async (prospectId: string, tag: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;
    
    const currentTags = prospect.tags || [];
    if (currentTags.includes(tag)) return;
    
    const newTags = [...currentTags, tag];
    await supabase.from('prospects').update({ tags: newTags }).eq('id', prospectId);
    await logActivity(prospectId, 'tag_added', `Added tag: ${tag}`);
    queryClient.invalidateQueries({ queryKey: ['prospects'] });
  };

  // Remove tag from prospect
  const removeTagFromProspect = async (prospectId: string, tag: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;
    
    const newTags = (prospect.tags || []).filter(t => t !== tag);
    await supabase.from('prospects').update({ tags: newTags }).eq('id', prospectId);
    await logActivity(prospectId, 'tag_removed', `Removed tag: ${tag}`);
    queryClient.invalidateQueries({ queryKey: ['prospects'] });
  };

  const stats = {
    total: prospects.length,
    new: prospects.filter(p => p.status === 'new').length,
    enriched: prospects.filter(p => p.status === 'enriched').length,
    outreach: prospects.filter(p => p.status === 'outreach').length,
    converted: prospects.filter(p => p.status === 'converted').length,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
      new: { variant: 'secondary', icon: <Clock className="w-3 h-3" /> },
      enriching: { variant: 'outline', icon: <RefreshCw className="w-3 h-3 animate-spin" /> },
      enriched: { variant: 'default', icon: <CheckCircle className="w-3 h-3" /> },
      outreach: { variant: 'outline', icon: <Send className="w-3 h-3" /> },
      engaged: { variant: 'default', icon: <Target className="w-3 h-3" /> },
      converted: { variant: 'default', icon: <TrendingUp className="w-3 h-3" /> },
      archived: { variant: 'secondary', icon: <AlertCircle className="w-3 h-3" /> },
    };
    const config = variants[status] || variants.new;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {status}
      </Badge>
    );
  };

  return (
    <DashboardLayout title="Prospecting Pipeline">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Database className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enriched</p>
                <p className="text-2xl font-bold">{stats.enriched}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outreach</p>
                <p className="text-2xl font-bold">{stats.outreach}</p>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Add prospects, enrich data, and trigger outreach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setIsImportDialogOpen(true)}>
              <FileUp className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Prospect
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Prospect</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Type</Label>
                    <Select 
                      value={newProspect.prospect_type} 
                      onValueChange={(v) => setNewProspect({ ...newProspect, prospect_type: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="person">Person</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <Input 
                      value={newProspect.company_name}
                      onChange={(e) => setNewProspect({ ...newProspect, company_name: e.target.value })}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <Label>Domain/Website</Label>
                    <Input 
                      value={newProspect.company_domain}
                      onChange={(e) => setNewProspect({ ...newProspect, company_domain: e.target.value })}
                      placeholder="acme.com"
                    />
                  </div>
                  <div>
                    <Label>Contact Name</Label>
                    <Input 
                      value={newProspect.contact_name}
                      onChange={(e) => setNewProspect({ ...newProspect, contact_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input 
                      type="email"
                      value={newProspect.contact_email}
                      onChange={(e) => setNewProspect({ ...newProspect, contact_email: e.target.value })}
                      placeholder="john@acme.com"
                    />
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input 
                      value={newProspect.contact_linkedin}
                      onChange={(e) => setNewProspect({ ...newProspect, contact_linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea 
                      value={newProspect.notes}
                      onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                      placeholder="Any additional notes..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={() => addProspectMutation.mutate(newProspect)}
                    disabled={addProspectMutation.isPending}
                  >
                    {addProspectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Prospect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isEnrichDialogOpen} onOpenChange={setIsEnrichDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Zap className="mr-2 h-4 w-4" />
                  Quick Enrich
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enrich from URL</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>URL to Scrape (Website or LinkedIn)</Label>
                    <Input 
                      value={enrichForm.url}
                      onChange={(e) => setEnrichForm({ ...enrichForm, url: e.target.value })}
                      placeholder="https://company.com or https://linkedin.com/company/..."
                    />
                  </div>
                  <div>
                    <Label>Enrichment Type</Label>
                    <Select 
                      value={enrichForm.enrichType} 
                      onValueChange={(v) => setEnrichForm({ ...enrichForm, enrichType: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="person">Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This will scrape the URL via Firecrawl and enrich the data via Clay.
                  </p>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={() => {
                      // Create new prospect and enrich
                      addProspectMutation.mutate({
                        prospect_type: enrichForm.enrichType,
                        company_domain: enrichForm.url,
                        company_name: '',
                        contact_name: '',
                        contact_email: '',
                        contact_linkedin: '',
                        notes: '',
                        source: 'url-scrape',
                      });
                    }}
                    disabled={addProspectMutation.isPending}
                  >
                    {addProspectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create & Enrich
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Webhook className="mr-2 h-4 w-4" />
                  Configure Webhooks
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Outreach Webhook Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Platform</Label>
                    <Select 
                      value={webhookForm.platform} 
                      onValueChange={(v) => setWebhookForm({ ...webhookForm, platform: v })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartlead">SmartLead</SelectItem>
                        <SelectItem value="salesrobot">SalesRobot</SelectItem>
                        <SelectItem value="instantly">Instantly</SelectItem>
                        <SelectItem value="lemlist">Lemlist</SelectItem>
                        <SelectItem value="zapier">Zapier</SelectItem>
                        <SelectItem value="make">Make (Integromat)</SelectItem>
                        <SelectItem value="n8n">n8n</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Webhook URL</Label>
                    <Input 
                      value={webhookForm.webhookUrl}
                      onChange={(e) => setWebhookForm({ ...webhookForm, webhookUrl: e.target.value })}
                      placeholder="https://hooks.zapier.com/..."
                    />
                  </div>
                  <div>
                    <Label>Campaign/Sequence ID (optional)</Label>
                    <Input 
                      value={webhookForm.campaignId}
                      onChange={(e) => setWebhookForm({ ...webhookForm, campaignId: e.target.value })}
                      placeholder="campaign_123"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Save these settings to use when triggering outreach for prospects.
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    localStorage.setItem('outreach-webhook-config', JSON.stringify(webhookForm));
                    toast({ title: 'Saved', description: 'Webhook configuration saved' });
                    setIsWebhookDialogOpen(false);
                  }}>
                    Save Configuration
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Due Reminders Widget */}
      <DueRemindersWidget />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="enriched">Enriched</SelectItem>
            <SelectItem value="outreach">Outreach</SelectItem>
            <SelectItem value="engaged">Engaged</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="person">Person</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
          </SelectContent>
        </Select>
        <Select value={outreachFilter} onValueChange={setOutreachFilter}>
          <SelectTrigger className="w-44">
            <Send className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Outreach" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outreach</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="email_sent">Email Sent</SelectItem>
            <SelectItem value="linkedin_sent">LinkedIn Sent</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="meeting_booked">Meeting Booked</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
          </SelectContent>
        </Select>
        {allTags.length > 0 && (
          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-36">
              <Tag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <Card className="mb-4 border-primary bg-primary/5">
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  {selectedIds.size} selected
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Select onValueChange={handleBulkOutreachUpdate}>
                  <SelectTrigger className="w-44 h-9">
                    <Send className="mr-2 h-4 w-4" />
                    <span className="text-sm">Set Outreach Status</span>
                  </SelectTrigger>
                  <SelectContent>
                    {outreachStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        <span className="flex items-center gap-2">
                          {status.icon}
                          {status.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={handleBulkStatusUpdate}>
                  <SelectTrigger className="w-40 h-9">
                    <Target className="mr-2 h-4 w-4" />
                    <span className="text-sm">Set Status</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="enriched">Enriched</SelectItem>
                    <SelectItem value="outreach">Outreach</SelectItem>
                    <SelectItem value="engaged">Engaged</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setBulkActionType('delete');
                    setIsBulkActionDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prospects Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProspects.length === 0 ? (
            <div className="text-center py-12">
              <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No prospects yet</h3>
              <p className="text-muted-foreground mb-4">Add your first prospect to get started</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Prospect
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={filteredProspects.length > 0 && selectedIds.size === filteredProspects.length}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Company/Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Outreach</TableHead>
                  <TableHead>Last Outreach</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProspects.map((prospect) => (
                  <TableRow key={prospect.id} className={selectedIds.has(prospect.id) ? 'bg-muted/50' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(prospect.id)}
                        onCheckedChange={() => toggleSelect(prospect.id)}
                        aria-label={`Select ${prospect.company_name || prospect.contact_name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {prospect.prospect_type === 'company' ? (
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                          {prospect.company_name || prospect.contact_name || 'Unnamed'}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          {prospect.contact_email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {prospect.contact_email}
                            </span>
                          )}
                          {prospect.company_domain && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {prospect.company_domain}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{prospect.prospect_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <ProspectScore score={prospect.score} size="sm" />
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(prospect.status)}
                    </TableCell>
                    <TableCell>
                      {getOutreachStatusBadge(prospect.outreach_status)}
                    </TableCell>
                    <TableCell>
                      {prospect.last_outreach_at ? (
                        <span className="text-sm text-muted-foreground">
                          {new Date(prospect.last_outreach_at).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openProspectDetail(prospect)}
                          title="View Details"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProspect(prospect);
                            enrichMutation.mutate({
                              prospectId: prospect.id,
                              enrichType: prospect.prospect_type,
                              url: prospect.company_domain || prospect.contact_linkedin || undefined,
                            });
                          }}
                          disabled={enrichMutation.isPending}
                          title="Enrich"
                        >
                          {enrichMutation.isPending && selectedProspect?.id === prospect.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Zap className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(prospect.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Supported Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Enrichment</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clay.com (Company & Person)</li>
                <li>• Firecrawl (URL Scraping)</li>
                <li>• LinkedIn (Profile Data)</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Outreach Platforms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SmartLead</li>
                <li>• SalesRobot</li>
                <li>• Instantly</li>
                <li>• Lemlist</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Automation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Zapier Webhooks</li>
                <li>• Make (Integromat)</li>
                <li>• n8n Workflows</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prospect Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProspect?.prospect_type === 'company' ? (
                <Building2 className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
              {selectedProspect?.company_name || selectedProspect?.contact_name || 'Prospect Details'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProspect && (
            <div className="space-y-6">
              {/* Company/Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Company</Label>
                  <p className="font-medium">{selectedProspect.company_name || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Domain</Label>
                  <p className="font-medium">{selectedProspect.company_domain || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Contact</Label>
                  <p className="font-medium">{selectedProspect.contact_name || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Email</Label>
                  <p className="font-medium">{selectedProspect.contact_email || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Industry</Label>
                  <p className="font-medium">{selectedProspect.company_industry || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Company Size</Label>
                  <p className="font-medium">{selectedProspect.company_size || '-'}</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="border-t pt-4">
                <ScoreBreakdown prospect={selectedProspect} />
              </div>

              {/* Status Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Pipeline Status
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prospect Status</Label>
                    <Select 
                      value={selectedProspect.status} 
                      onValueChange={async (value) => {
                        await logActivity(selectedProspect.id, 'status_change', 'Changed prospect status', selectedProspect.status, value);
                        updateProspectMutation.mutate({
                          id: selectedProspect.id,
                          updates: { status: value },
                        });
                        setSelectedProspect({ ...selectedProspect, status: value });
                      }}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="enriched">Enriched</SelectItem>
                        <SelectItem value="outreach">Outreach</SelectItem>
                        <SelectItem value="engaged">Engaged</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Campaign</Label>
                    <Input 
                      value={selectedProspect.outreach_campaign || ''}
                      onChange={(e) => setSelectedProspect({ ...selectedProspect, outreach_campaign: e.target.value })}
                      onBlur={() => {
                        updateProspectMutation.mutate({
                          id: selectedProspect.id,
                          updates: { outreach_campaign: selectedProspect.outreach_campaign },
                        });
                      }}
                      placeholder="Enter campaign name..."
                    />
                  </div>
                </div>
              </div>

              {/* Outreach Tracking */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Outreach Tracking
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label>Outreach Status</Label>
                    <Select 
                      value={selectedProspect.outreach_status || 'not_started'} 
                      onValueChange={async (value) => {
                        const oldStatus = selectedProspect.outreach_status || 'not_started';
                        await logActivity(selectedProspect.id, 'outreach_status_change', 'Changed outreach status', oldStatus, value);
                        const updates: Partial<Prospect> = { 
                          outreach_status: value,
                          last_outreach_at: new Date().toISOString(),
                        };
                        updateProspectMutation.mutate({
                          id: selectedProspect.id,
                          updates,
                        });
                        setSelectedProspect({ 
                          ...selectedProspect, 
                          outreach_status: value,
                          last_outreach_at: new Date().toISOString(),
                        });
                      }}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {outreachStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            <span className="flex items-center gap-2">
                              {status.icon}
                              {status.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedProspect.last_outreach_at && (
                    <div className="text-sm text-muted-foreground">
                      Last outreach: {new Date(selectedProspect.last_outreach_at).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </h4>
                <ProspectTags 
                  tags={selectedProspect.tags || []}
                  allTags={allTags}
                  onAddTag={(tag) => addTagToProspect(selectedProspect.id, tag)}
                  onRemoveTag={(tag) => removeTagFromProspect(selectedProspect.id, tag)}
                />
              </div>

              {/* Notes Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Notes & Follow-up
                </h4>
                <Textarea 
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add notes about this prospect, follow-up actions, conversation history..."
                  rows={5}
                  className="mb-3"
                />
                <Button 
                  size="sm"
                  onClick={async () => {
                    await logActivity(selectedProspect.id, 'note_updated', 'Updated notes');
                    updateProspectMutation.mutate({
                      id: selectedProspect.id,
                      updates: { notes: editingNotes },
                    });
                    setSelectedProspect({ ...selectedProspect, notes: editingNotes });
                  }}
                  disabled={updateProspectMutation.isPending}
                >
                  {updateProspectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Notes
                </Button>
              </div>

              {/* Reminders Section */}
              <div className="border-t pt-4">
                <ProspectReminders 
                  prospectId={selectedProspect.id} 
                  prospectName={selectedProspect.company_name || selectedProspect.contact_name || undefined}
                />
              </div>

              {/* Activity Log */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Activity History
                </h4>
                <ProspectActivityLog prospectId={selectedProspect.id} />
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-4 flex flex-wrap gap-2">
                {selectedProspect.contact_email && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`mailto:${selectedProspect.contact_email}`, '_blank')}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                )}
                {selectedProspect.contact_linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(selectedProspect.contact_linkedin!, '_blank')}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    View LinkedIn
                  </Button>
                )}
                {selectedProspect.company_domain && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://${selectedProspect.company_domain}`, '_blank')}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProspect(selectedProspect);
                    enrichMutation.mutate({
                      prospectId: selectedProspect.id,
                      enrichType: selectedProspect.prospect_type,
                      url: selectedProspect.company_domain || selectedProspect.contact_linkedin || undefined,
                    });
                  }}
                  disabled={enrichMutation.isPending}
                >
                  {enrichMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Enrich Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={isBulkActionDialogOpen && bulkActionType === 'delete'} onOpenChange={setIsBulkActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.size} Prospects?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            This action cannot be undone. Are you sure you want to delete {selectedIds.size} selected prospects?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleBulkDelete}
              disabled={bulkDeleteMutation.isPending}
            >
              {bulkDeleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete {selectedIds.size} Prospects
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSV Import Dialog */}
      <ProspectCSVImport 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen} 
      />
    </DashboardLayout>
  );
};

export default ProspectingDashboard;
