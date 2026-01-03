import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SyncHealthCard } from '@/components/ats/SyncHealthCard';
import { PendingItemsTable } from '@/components/ats/PendingItemsTable';
import { ActivityFeed } from '@/components/ats/ActivityFeed';
import { KanbanBoard } from '@/components/ats/KanbanBoard';
import { SkillGapAnalysis } from '@/components/ats/SkillGapAnalysis';
import { CandidateComparison } from '@/components/ats/CandidateComparison';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  useCandidates, 
  useJobOrders, 
  usePlacements,
  useSubmissions,
  useATSStats,
  useUpdateCandidateStatus
} from '@/hooks/useATS';
import { 
  RefreshCw, 
  Users,
  ClipboardList,
  DollarSign,
  Send,
  LayoutGrid,
  Kanban,
  Clock,
  Activity,
  BarChart3,
  GitCompare
} from 'lucide-react';
import type { CandidateStatus, JobOrder } from '@/lib/ats/types';

export default function ATSDashboard() {
  const [selectedAnalysisJobId, setSelectedAnalysisJobId] = useState<string>('');
  const [comparisonJobId, setComparisonJobId] = useState<string>('');
  const { data: candidates, isLoading: loadingCandidates, refetch: refetchCandidates } = useCandidates();
  const { data: jobOrders, isLoading: loadingJobs, refetch: refetchJobs } = useJobOrders();
  const { data: placements, isLoading: loadingPlacements, refetch: refetchPlacements } = usePlacements();
  const { data: submissions } = useSubmissions();
  const { data: stats, isLoading: loadingStats } = useATSStats();
  const updateStatus = useUpdateCandidateStatus();

  const isLoading = loadingCandidates || loadingJobs || loadingPlacements || loadingStats;

  // Get selected job for skill gap analysis
  const selectedAnalysisJob = useMemo((): JobOrder | null => {
    if (!selectedAnalysisJobId || !jobOrders) return null;
    return jobOrders.find(j => j.id === selectedAnalysisJobId) || null;
  }, [selectedAnalysisJobId, jobOrders]);

  const refetchAll = () => {
    refetchCandidates();
    refetchJobs();
    refetchPlacements();
  };

  // Handle status change from Kanban
  const handleStatusChange = (candidateId: string, newStatus: CandidateStatus) => {
    updateStatus.mutate({ candidateId, status: newStatus });
  };

  // Calculate sync health metrics
  const candidateMetrics = useMemo(() => {
    if (!candidates) return { total: 0, synced: 0, pending: 0, lastSyncedAt: undefined, pendingItems: [] };
    const synced = candidates.filter(c => c.last_synced_at);
    const pending = candidates.filter(c => !c.last_synced_at);
    const lastSynced = synced.length > 0 
      ? synced.reduce((latest, c) => 
          !latest || new Date(c.last_synced_at!) > new Date(latest) ? c.last_synced_at! : latest, 
          ''
        )
      : undefined;
    return {
      total: candidates.length,
      synced: synced.length,
      pending: pending.length,
      lastSyncedAt: lastSynced,
      pendingItems: pending.map(c => ({ id: c.id })),
    };
  }, [candidates]);

  const jobMetrics = useMemo(() => {
    if (!jobOrders) return { total: 0, synced: 0, pending: 0, lastSyncedAt: undefined, pendingItems: [] };
    const synced = jobOrders.filter(j => j.last_synced_at);
    const pending = jobOrders.filter(j => !j.last_synced_at);
    const lastSynced = synced.length > 0 
      ? synced.reduce((latest, j) => 
          !latest || new Date(j.last_synced_at!) > new Date(latest) ? j.last_synced_at! : latest, 
          ''
        )
      : undefined;
    return {
      total: jobOrders.length,
      synced: synced.length,
      pending: pending.length,
      lastSyncedAt: lastSynced,
      pendingItems: pending.map(j => ({ id: j.id })),
    };
  }, [jobOrders]);

  const placementMetrics = useMemo(() => {
    if (!placements) return { total: 0, synced: 0, pending: 0, lastSyncedAt: undefined, pendingItems: [] };
    const synced = placements.filter(p => p.last_synced_at);
    const pending = placements.filter(p => !p.last_synced_at);
    const lastSynced = synced.length > 0 
      ? synced.reduce((latest, p) => 
          !latest || new Date(p.last_synced_at!) > new Date(latest) ? p.last_synced_at! : latest, 
          ''
        )
      : undefined;
    return {
      total: placements.length,
      synced: synced.length,
      pending: pending.length,
      lastSyncedAt: lastSynced,
      pendingItems: pending.map(p => ({ id: p.id })),
    };
  }, [placements]);

  const pendingCandidates = candidates?.filter(c => !c.last_synced_at) || [];
  const pendingJobs = jobOrders?.filter(j => !j.last_synced_at) || [];
  const pendingPlacements = placements?.filter(p => !p.last_synced_at) || [];

  const totalPending = candidateMetrics.pending + jobMetrics.pending + placementMetrics.pending;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ATS Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor sync health, manage pipeline, and track activities
            </p>
          </div>
          <Button variant="outline" onClick={refetchAll} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh All
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutGrid className="h-4 w-4 hidden sm:block" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="gap-2">
              <Kanban className="h-4 w-4 hidden sm:block" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2">
              <GitCompare className="h-4 w-4 hidden sm:block" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4 hidden sm:block" />
              Pending ({totalPending})
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4 hidden sm:block" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats?.totalCandidates || 0}</div>
                      <div className="text-sm text-muted-foreground">Candidates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <ClipboardList className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats?.totalJobs || 0}</div>
                      <div className="text-sm text-muted-foreground">Job Orders</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-accent">
                      <DollarSign className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats?.totalPlacements || 0}</div>
                      <div className="text-sm text-muted-foreground">Placements</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <Send className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{totalPending}</div>
                      <div className="text-sm text-muted-foreground">Pending Sync</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sync Health Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="pt-6 space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <div className="grid grid-cols-3 gap-2">
                          <Skeleton className="h-12" />
                          <Skeleton className="h-12" />
                          <Skeleton className="h-12" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <SyncHealthCard
                    entityType="candidates"
                    {...candidateMetrics}
                    onSyncComplete={() => refetchCandidates()}
                  />
                  <SyncHealthCard
                    entityType="job_orders"
                    {...jobMetrics}
                    onSyncComplete={() => refetchJobs()}
                  />
                  <SyncHealthCard
                    entityType="placements"
                    {...placementMetrics}
                    onSyncComplete={() => refetchPlacements()}
                  />
                </>
              )}
            </div>
          </TabsContent>

          {/* Pipeline Tab - Kanban Board */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Kanban className="h-5 w-5" />
                  Candidate Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <KanbanBoard
                  candidates={candidates || []}
                  jobOrders={jobOrders || []}
                  onStatusChange={handleStatusChange}
                  isLoading={loadingCandidates}
                />
              </CardContent>
            </Card>

            {/* Skill Gap Analysis Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Skill Gap Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select a job order to analyze skill gaps across your candidate pool
                </p>
              </CardHeader>
              <CardContent>
                <Select value={selectedAnalysisJobId} onValueChange={setSelectedAnalysisJobId}>
                  <SelectTrigger className="w-full md:w-[400px]">
                    <SelectValue placeholder="Select a job order to analyze..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobOrders
                      ?.filter(job => job.status === 'open' && job.required_skills?.length)
                      .map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.job_title} - {job.client_company}
                          {job.required_skills && (
                            <span className="text-muted-foreground ml-2">
                              ({job.required_skills.length} skills)
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    {jobOrders?.filter(job => job.status === 'open' && job.required_skills?.length).length === 0 && (
                      <SelectItem value="_none" disabled>
                        No job orders with required skills defined
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                {selectedAnalysisJob && selectedAnalysisJob.required_skills && (
                  <SkillGapAnalysis
                    candidates={candidates || []}
                    requiredSkills={selectedAnalysisJob.required_skills}
                    jobTitle={selectedAnalysisJob.job_title}
                    clientCompany={selectedAnalysisJob.client_company}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compare Tab - Candidate Comparison */}
          <TabsContent value="compare">
            <CandidateComparison
              candidates={candidates || []}
              jobOrders={jobOrders || []}
              selectedJobId={comparisonJobId}
              onJobChange={setComparisonJobId}
              onStatusChange={handleStatusChange}
              className="min-h-[600px]"
            />
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="candidates">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="candidates">
                      Candidates ({pendingCandidates.length})
                    </TabsTrigger>
                    <TabsTrigger value="jobs">
                      Jobs ({pendingJobs.length})
                    </TabsTrigger>
                    <TabsTrigger value="placements">
                      Placements ({pendingPlacements.length})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="candidates" className="mt-4">
                    <PendingItemsTable
                      entityType="candidates"
                      items={pendingCandidates}
                      limit={10}
                      onSyncComplete={() => refetchCandidates()}
                    />
                  </TabsContent>
                  <TabsContent value="jobs" className="mt-4">
                    <PendingItemsTable
                      entityType="job_orders"
                      items={pendingJobs}
                      limit={10}
                      onSyncComplete={() => refetchJobs()}
                    />
                  </TabsContent>
                  <TabsContent value="placements" className="mt-4">
                    <PendingItemsTable
                      entityType="placements"
                      items={pendingPlacements}
                      limit={10}
                      onSyncComplete={() => refetchPlacements()}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed
                  candidates={candidates}
                  jobOrders={jobOrders}
                  placements={placements}
                  submissions={submissions}
                  limit={20}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
