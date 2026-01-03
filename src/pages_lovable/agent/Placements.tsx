import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePlacements, useCreatePlacement, useUpdatePlacement, useATSStats, useSyncToATS, useSubmissions } from '@/hooks/useATS';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SyncStatusBadge, getSyncStatus } from '@/components/dashboard/SyncStatusBadge';
import { ResponsiveTable } from '@/components/dashboard/ResponsiveTable';
import { BulkSyncButton } from '@/components/ats/BulkSyncButton';
import { GuaranteePeriodMonitor } from '@/components/ats/GuaranteePeriodMonitor';
import { FeeCalculator } from '@/components/ats/FeeCalculator';
import { CommissionSplitEditor } from '@/components/ats/CommissionSplitEditor';
import { CommissionSplitChart } from '@/components/ats/CommissionSplitChart';
import { PlacementAnalytics } from '@/components/ats/PlacementAnalytics';
import { RevenueForecast } from '@/components/ats/RevenueForecast';
import { InvoiceGenerator } from '@/components/ats/InvoiceGenerator';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search,
  Filter,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  MoreHorizontal,
  Pencil,
  ExternalLink,
  BarChart3,
  Shield,
  List,
  FileText
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Placement, FeeStatus, CommissionSplit } from '@/lib/ats/types';

const statusColors: Record<FeeStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  invoiced: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  partial: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export default function Placements() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [invoicePlacement, setInvoicePlacement] = useState<Placement | null>(null);

  // Form state for fee calculation and commission splits
  const [formFeeData, setFormFeeData] = useState({
    salary: 0,
    feeType: 'percentage' as 'percentage' | 'flat',
    feePercentage: 20,
    feeFlat: 0,
    feeTotal: 0
  });
  const [formCommissionSplits, setFormCommissionSplits] = useState<CommissionSplit[]>([]);

  const { data: placements, isLoading, refetch } = usePlacements({
    fee_status: statusFilter !== 'all' ? [statusFilter as FeeStatus] : undefined,
  });

  const { data: stats } = useATSStats();
  const { data: submissions } = useSubmissions();
  const createPlacement = useCreatePlacement();
  const updatePlacement = useUpdatePlacement();
  const syncToATS = useSyncToATS();

  // Mock agents for commission splits (in real app, fetch from profiles)
  const availableAgents = useMemo(() => [
    { id: user?.id || '1', name: 'Current User' },
    { id: '2', name: 'James Pemberton' },
    { id: '3', name: 'Sarah Johnson' },
  ], [user?.id]);

  // Calculate pending items for bulk sync
  const pendingItems = useMemo(() => 
    (placements || []).filter(p => !p.last_synced_at).map(p => ({ id: p.id })),
    [placements]
  );

  // Filter placements by search
  const filteredPlacements = placements?.filter(p => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      p.candidate_name.toLowerCase().includes(searchLower) ||
      p.job_title.toLowerCase().includes(searchLower) ||
      p.client_company.toLowerCase().includes(searchLower)
    );
  });

  const handleOpenForm = (placement?: Placement) => {
    if (placement) {
      setEditingPlacement(placement);
      setFormFeeData({
        salary: Number(placement.salary) || 0,
        feeType: (placement.fee_type as 'percentage' | 'flat') || 'percentage',
        feePercentage: Number(placement.fee_percentage) || 20,
        feeFlat: Number(placement.fee_flat) || 0,
        feeTotal: Number(placement.fee_total) || 0
      });
      setFormCommissionSplits(placement.commission_split as CommissionSplit[] || []);
    } else {
      setEditingPlacement(null);
      setFormFeeData({ salary: 0, feeType: 'percentage', feePercentage: 20, feeFlat: 0, feeTotal: 0 });
      setFormCommissionSplits([]);
    }
    setIsAddDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const placementData = {
      client_company: formData.get('client_company') as string,
      job_title: formData.get('job_title') as string,
      candidate_name: formData.get('candidate_name') as string,
      start_date: formData.get('start_date') as string || undefined,
      salary: formFeeData.salary,
      fee_type: formFeeData.feeType,
      fee_percentage: formFeeData.feePercentage || undefined,
      fee_flat: formFeeData.feeFlat || undefined,
      fee_total: formFeeData.feeTotal,
      fee_status: (formData.get('fee_status') as string) || 'pending',
      placement_type: formData.get('placement_type') as string,
      guarantee_period_days: parseInt(formData.get('guarantee_period_days') as string) || 90,
      notes: formData.get('notes') as string,
      agent_id: user?.id,
      commission_split: formCommissionSplits.length > 0 ? formCommissionSplits : undefined,
    };

    if (editingPlacement) {
      await updatePlacement.mutateAsync({ id: editingPlacement.id, ...placementData } as any);
    } else {
      await createPlacement.mutateAsync(placementData as any);
    }

    setIsAddDialogOpen(false);
    setEditingPlacement(null);
  };

  const handleMarkGuaranteeCleared = async (placementId: string) => {
    await updatePlacement.mutateAsync({ id: placementId, fee_status: 'paid' } as any);
  };

  const handleSync = async (placement: Placement) => {
    setSyncingId(placement.id);
    try {
      await syncToATS.mutateAsync({
        action: 'create_placement',
        data: { ...placement } as Record<string, unknown>
      });
    } finally {
      setSyncingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Placements</h1>
            <p className="text-muted-foreground">Track placements, revenue, and guarantees</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <BulkSyncButton
              entityType="placements"
              pendingItems={pendingItems}
              onComplete={() => refetch()}
            />
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Placement
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4 hidden sm:inline" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="placements" className="gap-2">
              <List className="h-4 w-4 hidden sm:inline" />
              All
            </TabsTrigger>
            <TabsTrigger value="guarantees" className="gap-2">
              <Shield className="h-4 w-4 hidden sm:inline" />
              Guarantees
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2">
              <DollarSign className="h-4 w-4 hidden sm:inline" />
              Revenue
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                      <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-xl lg:text-2xl font-bold">{formatCurrency(stats?.totalRevenue || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Revenue</p>
                      <p className="text-xl lg:text-2xl font-bold">{formatCurrency(stats?.pendingRevenue || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Placements</p>
                      <p className="text-xl lg:text-2xl font-bold">{stats?.totalPlacements || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Fee</p>
                      <p className="text-xl lg:text-2xl font-bold">
                        {stats?.totalPlacements 
                          ? formatCurrency((stats.totalRevenue + stats.pendingRevenue) / stats.totalPlacements)
                          : '$0'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Charts */}
            {placements && placements.length > 0 && (
              <PlacementAnalytics placements={placements} />
            )}

            {/* Guarantee Monitor Preview */}
            {placements && (
              <GuaranteePeriodMonitor 
                placements={placements}
                onMarkCleared={handleMarkGuaranteeCleared}
              />
            )}
          </TabsContent>

          {/* All Placements Tab */}
          <TabsContent value="placements" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search placements..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="invoiced">Invoiced</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Placements Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Placements ({filteredPlacements?.length || 0})</CardTitle>
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
                ) : !filteredPlacements?.length ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No placements found. Add your first placement to track revenue.
                  </div>
                ) : (
                  <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead className="hidden md:table-cell">Position / Company</TableHead>
                          <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                          <TableHead className="hidden sm:table-cell">Salary</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sync</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPlacements.map((placement) => (
                          <TableRow key={placement.id}>
                            <TableCell>
                              <div className="font-medium">{placement.candidate_name}</div>
                              <div className="text-sm text-muted-foreground md:hidden">
                                {placement.job_title}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div>{placement.job_title}</div>
                              <div className="text-sm text-muted-foreground">{placement.client_company}</div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {placement.start_date 
                                ? new Date(placement.start_date).toLocaleDateString()
                                : '-'
                              }
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {placement.salary ? formatCurrency(Number(placement.salary)) : '-'}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{formatCurrency(Number(placement.fee_total) || 0)}</div>
                              <div className="text-xs text-muted-foreground">
                                {placement.fee_type === 'percentage' 
                                  ? `${placement.fee_percentage}%`
                                  : 'Flat'
                                }
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusColors[placement.fee_status as FeeStatus]}>
                                {placement.fee_status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <SyncStatusBadge
                                status={getSyncStatus(placement)}
                                lastSyncedAt={placement.last_synced_at}
                                onSync={() => handleSync(placement)}
                                isSyncing={syncingId === placement.id}
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
                                  <DropdownMenuItem onClick={() => handleOpenForm(placement)}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setInvoicePlacement(placement)}>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generate Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSync(placement)}>
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
          </TabsContent>

          {/* Guarantees Tab */}
          <TabsContent value="guarantees" className="space-y-6">
            {placements && (
              <GuaranteePeriodMonitor 
                placements={placements}
                onMarkCleared={handleMarkGuaranteeCleared}
              />
            )}
            
            {/* Additional guarantee stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {placements?.filter(p => p.fee_status === 'paid' && p.guarantee_period_days).length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Cleared Guarantees</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-600">
                      {placements?.filter(p => p.fee_status !== 'paid' && p.guarantee_period_days).length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Active Guarantees</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {placements?.[0]?.guarantee_period_days || 90} days
                    </p>
                    <p className="text-sm text-muted-foreground">Standard Period</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            {placements && placements.length > 0 ? (
              <>
                <RevenueForecast 
                  placements={placements} 
                  submissions={submissions}
                />
                <PlacementAnalytics placements={placements} />
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No placement data available for revenue analysis
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => { setIsAddDialogOpen(open); if (!open) setEditingPlacement(null); }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPlacement ? 'Edit Placement' : 'Add New Placement'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_company">Client Company *</Label>
                  <Input id="client_company" name="client_company" required defaultValue={editingPlacement?.client_company} />
                </div>
                <div>
                  <Label htmlFor="job_title">Job Title *</Label>
                  <Input id="job_title" name="job_title" required defaultValue={editingPlacement?.job_title} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="candidate_name">Candidate Name *</Label>
                  <Input id="candidate_name" name="candidate_name" required defaultValue={editingPlacement?.candidate_name} />
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input id="start_date" name="start_date" type="date" defaultValue={editingPlacement?.start_date || ''} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placement_type">Placement Type</Label>
                  <Select name="placement_type" defaultValue={editingPlacement?.placement_type || 'permanent'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temp">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guarantee_period_days">Guarantee Period (days)</Label>
                  <Input id="guarantee_period_days" name="guarantee_period_days" type="number" defaultValue={editingPlacement?.guarantee_period_days || 90} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fee_status">Fee Status</Label>
                  <Select name="fee_status" defaultValue={editingPlacement?.fee_status || 'pending'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="invoiced">Invoiced</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fee Calculator Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <FeeCalculator
                  salary={formFeeData.salary}
                  feeType={formFeeData.feeType}
                  feePercentage={formFeeData.feePercentage}
                  feeFlat={formFeeData.feeFlat}
                  commissionSplits={formCommissionSplits}
                  onChange={(values) => setFormFeeData(values)}
                />

                <CommissionSplitEditor
                  splits={formCommissionSplits}
                  feeTotal={formFeeData.feeTotal}
                  availableAgents={availableAgents}
                  onChange={setFormCommissionSplits}
                />
              </div>

              {/* Commission Split Chart Preview */}
              {formCommissionSplits.length > 0 && formFeeData.feeTotal > 0 && (
                <CommissionSplitChart
                  splits={formCommissionSplits}
                  feeTotal={formFeeData.feeTotal}
                />
              )}

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={3} defaultValue={editingPlacement?.notes || ''} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingPlacement(null); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createPlacement.isPending || updatePlacement.isPending}>
                  {editingPlacement ? 'Update' : 'Create'} Placement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Invoice Generator Dialog */}
        {invoicePlacement && (
          <InvoiceGenerator
            placement={invoicePlacement}
            open={!!invoicePlacement}
            onOpenChange={(open) => !open && setInvoicePlacement(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
