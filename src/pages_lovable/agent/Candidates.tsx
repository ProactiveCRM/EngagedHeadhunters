import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCandidates, useCreateCandidate, useUpdateCandidate, useDeleteCandidate, useSyncToATS } from '@/hooks/useATS';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SyncStatusBadge, getSyncStatus } from '@/components/dashboard/SyncStatusBadge';
import { ResponsiveTable } from '@/components/dashboard/ResponsiveTable';
import { SubmitToJobDialog } from '@/components/ats/SubmitToJobDialog';
import { BulkSyncButton } from '@/components/ats/BulkSyncButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  Linkedin, 
  Mail, 
  Phone,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  Send,
  X
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { Candidate, CandidateStatus } from '@/lib/ats/types';

const statusColors: Record<CandidateStatus, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  screening: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  interviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  offered: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  hired: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function Candidates() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const { data: candidates, isLoading, refetch } = useCandidates({
    search: search || undefined,
    status: statusFilter !== 'all' ? [statusFilter as CandidateStatus] : undefined,
  });

  const createCandidate = useCreateCandidate();
  const updateCandidate = useUpdateCandidate();
  const deleteCandidate = useDeleteCandidate();
  const syncToATS = useSyncToATS();

  // Calculate pending items for bulk sync
  const pendingItems = useMemo(() => 
    (candidates || []).filter(c => !c.last_synced_at).map(c => ({ id: c.id })),
    [candidates]
  );

  // Get selected candidate objects for the submit dialog
  const selectedCandidateObjects = useMemo(() =>
    (candidates || []).filter(c => selectedCandidates.includes(c.id)),
    [candidates, selectedCandidates]
  );

  const toggleCandidate = (id: string) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllCandidates = () => {
    if (!candidates) return;
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map(c => c.id));
    }
  };

  const clearSelection = () => setSelectedCandidates([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const candidateData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      linkedin_url: formData.get('linkedin_url') as string,
      current_title: formData.get('current_title') as string,
      current_company: formData.get('current_company') as string,
      location: formData.get('location') as string,
      salary_expectation: formData.get('salary_expectation') as string,
      notes: formData.get('notes') as string,
      status: (formData.get('status') as CandidateStatus) || 'new',
      created_by: user?.id,
    };

    if (editingCandidate) {
      await updateCandidate.mutateAsync({ id: editingCandidate.id, ...candidateData });
    } else {
      await createCandidate.mutateAsync(candidateData);
    }

    setIsAddDialogOpen(false);
    setEditingCandidate(null);
  };

  const handleSync = async (candidate: Candidate) => {
    setSyncingId(candidate.id);
    try {
      await syncToATS.mutateAsync({
        action: 'sync_candidate',
        data: { ...candidate } as Record<string, unknown>
      });
    } finally {
      setSyncingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      await deleteCandidate.mutateAsync(id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground">Manage your candidate pipeline</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <BulkSyncButton
              entityType="candidates"
              pendingItems={pendingItems}
              onComplete={() => refetch()}
            />
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input id="first_name" name="first_name" required defaultValue={editingCandidate?.first_name} />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input id="last_name" name="last_name" required defaultValue={editingCandidate?.last_name} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={editingCandidate?.email || ''} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" defaultValue={editingCandidate?.phone || ''} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input id="linkedin_url" name="linkedin_url" defaultValue={editingCandidate?.linkedin_url || ''} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current_title">Current Title</Label>
                      <Input id="current_title" name="current_title" defaultValue={editingCandidate?.current_title || ''} />
                    </div>
                    <div>
                      <Label htmlFor="current_company">Current Company</Label>
                      <Input id="current_company" name="current_company" defaultValue={editingCandidate?.current_company || ''} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" defaultValue={editingCandidate?.location || ''} />
                    </div>
                    <div>
                      <Label htmlFor="salary_expectation">Salary Expectation</Label>
                      <Input id="salary_expectation" name="salary_expectation" defaultValue={editingCandidate?.salary_expectation || ''} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingCandidate?.status || 'new'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" rows={3} defaultValue={editingCandidate?.notes || ''} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingCandidate(null); }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createCandidate.isPending || updateCandidate.isPending}>
                      {editingCandidate ? 'Update' : 'Create'} Candidate
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Candidates ({candidates?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                ))}
              </div>
            ) : !candidates?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                No candidates found. Add your first candidate to get started.
              </div>
            ) : (
              <ResponsiveTable>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                          onCheckedChange={toggleAllCandidates}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Title / Company</TableHead>
                      <TableHead className="hidden sm:table-cell">Contact</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sync</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id} className={selectedCandidates.includes(candidate.id) ? 'bg-muted/50' : ''}>
                        <TableCell>
                          <Checkbox
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={() => toggleCandidate(candidate.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{candidate.first_name} {candidate.last_name}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {candidate.current_title || '-'}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>{candidate.current_title || '-'}</div>
                          <div className="text-sm text-muted-foreground">{candidate.current_company || '-'}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex gap-2">
                            {candidate.email && (
                              <a href={`mailto:${candidate.email}`} className="text-muted-foreground hover:text-foreground">
                                <Mail className="h-4 w-4" />
                              </a>
                            )}
                            {candidate.phone && (
                              <a href={`tel:${candidate.phone}`} className="text-muted-foreground hover:text-foreground">
                                <Phone className="h-4 w-4" />
                              </a>
                            )}
                            {candidate.linkedin_url && (
                              <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{candidate.location || '-'}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[candidate.status as CandidateStatus]}>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <SyncStatusBadge
                            status={getSyncStatus(candidate)}
                            lastSyncedAt={candidate.last_synced_at}
                            onSync={() => handleSync(candidate)}
                            isSyncing={syncingId === candidate.id}
                            compact
                          />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setEditingCandidate(candidate); setIsAddDialogOpen(true); }}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedCandidates([candidate.id]);
                                setIsSubmitDialogOpen(true);
                              }}>
                                <Send className="h-4 w-4 mr-2" />
                                Submit to Job
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleSync(candidate)}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Sync to ATS
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(candidate.id)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ResponsiveTable>
            )}
          </CardContent>
        </Card>

        {/* Floating Action Bar for Selected Candidates */}
        {selectedCandidates.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background border shadow-lg rounded-lg p-4 flex items-center gap-4">
            <span className="font-medium">
              {selectedCandidates.length} candidate(s) selected
            </span>
            <Button onClick={() => setIsSubmitDialogOpen(true)}>
              <Send className="h-4 w-4 mr-2" />
              Submit to Job
            </Button>
            <Button variant="ghost" size="icon" onClick={clearSelection}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Submit to Job Dialog */}
        <SubmitToJobDialog
          candidateIds={selectedCandidates}
          candidates={selectedCandidateObjects}
          isOpen={isSubmitDialogOpen}
          onClose={() => setIsSubmitDialogOpen(false)}
          onSuccess={() => {
            clearSelection();
            refetch();
          }}
        />
      </div>
    </DashboardLayout>
  );
}
