import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useJobOrders, useCreateJobOrder, useUpdateJobOrder, useSyncToATS } from '@/hooks/useATS';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SyncStatusBadge, getSyncStatus } from '@/components/dashboard/SyncStatusBadge';
import { ResponsiveTable } from '@/components/dashboard/ResponsiveTable';
import { BulkSyncButton } from '@/components/ats/BulkSyncButton';
import { TagInput } from '@/components/ats/TagInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Building2,
  MapPin,
  DollarSign,
  Users,
  MoreHorizontal,
  Pencil,
  ExternalLink,
  Target
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { JobOrder, JobStatus } from '@/lib/ats/types';

// Common skill suggestions for recruiting
const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C#', 'Go',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'SQL', 'PostgreSQL', 'MongoDB',
  'GraphQL', 'REST API', 'Git', 'CI/CD', 'Agile', 'Scrum', 'Leadership',
  'Communication', 'Project Management', 'Data Analysis', 'Machine Learning',
  'DevOps', 'Linux', 'Terraform', 'Microservices', 'Redis', 'Elasticsearch'
];

const statusColors: Record<JobStatus, string> = {
  open: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'on-hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  filled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const priorityColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function JobOrders() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOrder | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);

  const { data: jobs, isLoading, refetch } = useJobOrders({
    search: search || undefined,
    status: statusFilter !== 'all' ? [statusFilter as JobStatus] : undefined,
  });

  const createJobOrder = useCreateJobOrder();
  const updateJobOrder = useUpdateJobOrder();
  const syncToATS = useSyncToATS();

  // Calculate pending items for bulk sync
  const pendingItems = useMemo(() => 
    (jobs || []).filter(j => !j.last_synced_at).map(j => ({ id: j.id })),
    [jobs]
  );

  // Reset form when dialog opens with editing job
  const handleOpenDialog = (job?: JobOrder) => {
    if (job) {
      setEditingJob(job);
      setRequiredSkills(job.required_skills || []);
    } else {
      setEditingJob(null);
      setRequiredSkills([]);
    }
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingJob(null);
    setRequiredSkills([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const jobData = {
      client_company: formData.get('client_company') as string,
      client_contact_name: formData.get('client_contact_name') as string,
      client_contact_email: formData.get('client_contact_email') as string,
      job_title: formData.get('job_title') as string,
      department: formData.get('department') as string,
      location: formData.get('location') as string,
      employment_type: formData.get('employment_type') as string,
      salary_min: parseInt(formData.get('salary_min') as string) || undefined,
      salary_max: parseInt(formData.get('salary_max') as string) || undefined,
      fee_type: formData.get('fee_type') as string,
      fee_amount: parseFloat(formData.get('fee_amount') as string) || undefined,
      description: formData.get('description') as string,
      requirements: formData.get('requirements') as string,
      required_skills: requiredSkills,
      status: (formData.get('status') as string) || 'open',
      priority: formData.get('priority') as string || 'normal',
      created_by: user?.id,
      assigned_agent: user?.id,
    };

    if (editingJob) {
      await updateJobOrder.mutateAsync({ id: editingJob.id, ...jobData } as any);
    } else {
      await createJobOrder.mutateAsync(jobData as any);
    }

    handleCloseDialog();
  };

  const handleSync = async (job: JobOrder) => {
    setSyncingId(job.id);
    try {
      await syncToATS.mutateAsync({
        action: 'sync_job',
        data: { ...job } as Record<string, unknown>
      });
    } finally {
      setSyncingId(null);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return '-';
    const format = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `${format(min)}+`;
    return `Up to ${format(max!)}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Job Orders</h1>
            <p className="text-muted-foreground">Manage client job requisitions</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <BulkSyncButton
              entityType="job_orders"
              pendingItems={pendingItems}
              onComplete={() => refetch()}
            />
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Job Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingJob ? 'Edit Job Order' : 'Add New Job Order'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client_company">Client Company *</Label>
                      <Input id="client_company" name="client_company" required defaultValue={editingJob?.client_company} />
                    </div>
                    <div>
                      <Label htmlFor="job_title">Job Title *</Label>
                      <Input id="job_title" name="job_title" required defaultValue={editingJob?.job_title} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client_contact_name">Client Contact Name</Label>
                      <Input id="client_contact_name" name="client_contact_name" defaultValue={editingJob?.client_contact_name || ''} />
                    </div>
                    <div>
                      <Label htmlFor="client_contact_email">Client Contact Email</Label>
                      <Input id="client_contact_email" name="client_contact_email" type="email" defaultValue={editingJob?.client_contact_email || ''} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" defaultValue={editingJob?.department || ''} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" defaultValue={editingJob?.location || ''} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employment_type">Employment Type</Label>
                      <Select name="employment_type" defaultValue={editingJob?.employment_type || 'full-time'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-Time</SelectItem>
                          <SelectItem value="part-time">Part-Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="temp">Temporary</SelectItem>
                          <SelectItem value="temp-to-perm">Temp-to-Perm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select name="priority" defaultValue={editingJob?.priority || 'normal'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary_min">Salary Min</Label>
                      <Input id="salary_min" name="salary_min" type="number" defaultValue={editingJob?.salary_min || ''} />
                    </div>
                    <div>
                      <Label htmlFor="salary_max">Salary Max</Label>
                      <Input id="salary_max" name="salary_max" type="number" defaultValue={editingJob?.salary_max || ''} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fee_type">Fee Type</Label>
                      <Select name="fee_type" defaultValue={editingJob?.fee_type || 'percentage'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="flat">Flat Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fee_amount">Fee Amount</Label>
                      <Input id="fee_amount" name="fee_amount" type="number" step="0.01" defaultValue={editingJob?.fee_amount || ''} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingJob?.status || 'open'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="filled">Filled</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" name="description" rows={3} defaultValue={editingJob?.description || ''} />
                  </div>
                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea id="requirements" name="requirements" rows={3} defaultValue={editingJob?.requirements || ''} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <Label>Required Skills</Label>
                    </div>
                    <TagInput
                      value={requiredSkills}
                      onChange={setRequiredSkills}
                      suggestions={SKILL_SUGGESTIONS}
                      placeholder="Add required skill..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for candidate matching and scoring
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createJobOrder.isPending || updateJobOrder.isPending}>
                      {editingJob ? 'Update' : 'Create'} Job Order
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
                  placeholder="Search job orders..."
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
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Job Orders ({jobs?.length || 0})</CardTitle>
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
            ) : !jobs?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                No job orders found. Add your first job order to get started.
              </div>
            ) : (
              <ResponsiveTable>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead className="hidden md:table-cell">Client</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead className="hidden sm:table-cell">Salary</TableHead>
                      <TableHead className="hidden lg:table-cell">Skills</TableHead>
                      <TableHead className="hidden md:table-cell">Candidates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sync</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="font-medium">{job.job_title}</div>
                          <div className="text-sm text-muted-foreground">{job.employment_type}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{job.client_company}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {job.client_company}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {job.location || '-'}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            {formatSalary(job.salary_min, job.salary_max)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            {job.required_skills?.length || 0}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {job.candidates_submitted || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[job.status as JobStatus]}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <SyncStatusBadge
                            status={getSyncStatus(job)}
                            lastSyncedAt={job.last_synced_at}
                            onSync={() => handleSync(job)}
                            isSyncing={syncingId === job.id}
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
                              <DropdownMenuItem onClick={() => handleOpenDialog(job)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSync(job)}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Sync to ATS
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
      </div>
    </DashboardLayout>
  );
}
