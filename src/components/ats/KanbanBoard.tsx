import { useState, useMemo } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter
} from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { CandidateDetailModal } from './CandidateDetailModal';
import { JobSkillsEditor } from './JobSkillsEditor';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Wifi, WifiOff, Pencil } from 'lucide-react';
import { useRealtimeCandidates } from '@/hooks/useRealtimeCandidates';
import type { Candidate, JobOrder, CandidateStatus } from '@/lib/ats/types';
import { cn } from '@/lib/utils';
import { calculateSkillMatch } from '@/lib/ats/scoring';

interface KanbanBoardProps {
  candidates: Candidate[];
  jobOrders?: JobOrder[];
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
  isLoading?: boolean;
}

const STATUSES: CandidateStatus[] = [
  'new', 
  'screening', 
  'interviewed', 
  'offered', 
  'hired', 
  'rejected'
];

export function KanbanBoard({ 
  candidates, 
  jobOrders = [], 
  onStatusChange, 
  isLoading 
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillsEditorOpen, setSkillsEditorOpen] = useState(false);

  // Real-time subscription
  const { connectionStatus } = useRealtimeCandidates();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  // Get selected job for match scoring
  const selectedJob = useMemo(() => {
    if (selectedJobId === 'all') return null;
    return jobOrders.find(j => j.id === selectedJobId) || null;
  }, [selectedJobId, jobOrders]);

  // Filter candidates by job if selected
  const filteredCandidates = useMemo(() => {
    if (selectedJobId === 'all') return candidates;
    // For now, show all candidates - would need submission data for job filtering
    return candidates;
  }, [candidates, selectedJobId]);

  // Check if sorting by match is active
  const isSortingByMatch = useMemo(() => {
    return selectedJob?.required_skills && selectedJob.required_skills.length > 0;
  }, [selectedJob]);

  // Group candidates by status and sort by match when job selected
  const candidatesByStatus = useMemo(() => {
    const grouped: Record<CandidateStatus, Candidate[]> = {
      new: [],
      screening: [],
      interviewed: [],
      offered: [],
      hired: [],
      rejected: [],
    };

    filteredCandidates.forEach((candidate) => {
      const status = (candidate.status as CandidateStatus) || 'new';
      if (grouped[status]) {
        grouped[status].push(candidate);
      } else {
        grouped.new.push(candidate);
      }
    });

    // Sort each column by match score when job with required_skills is selected
    if (isSortingByMatch && selectedJob?.required_skills) {
      const requiredSkills = selectedJob.required_skills;
      (Object.keys(grouped) as CandidateStatus[]).forEach((status) => {
        grouped[status].sort((a, b) => {
          const scoreA = calculateSkillMatch(a.skills || [], requiredSkills).matchPercentage;
          const scoreB = calculateSkillMatch(b.skills || [], requiredSkills).matchPercentage;
          return scoreB - scoreA; // Highest first
        });
      });
    }

    return grouped;
  }, [filteredCandidates, selectedJob, isSortingByMatch]);

  // Get the active candidate for DragOverlay
  const activeCandidate = useMemo(() => {
    if (!activeId) return null;
    return candidates.find(c => c.id === activeId) || null;
  }, [activeId, candidates]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const candidateId = active.id as string;
    const newStatus = over.id as CandidateStatus;

    // Only update if dropped on a valid status column
    if (STATUSES.includes(newStatus)) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate && candidate.status !== newStatus) {
        onStatusChange(candidateId, newStatus);
      }
    }
  };

  const handleCardClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleModalStatusChange = (candidateId: string, status: CandidateStatus) => {
    onStatusChange(candidateId, status);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="flex gap-4 overflow-hidden">
          {STATUSES.map((status) => (
            <div key={status} className="w-[280px] min-w-[280px]">
              <Skeleton className="h-10 w-full mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Job Filter and Real-time Status */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger className="w-[220px] sm:w-[280px]">
              <SelectValue placeholder="Filter by Job Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Candidates</SelectItem>
              {jobOrders
                .filter(job => job.status === 'open')
                .map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.job_title} - {job.client_company}
                    {job.required_skills?.length ? ` (${job.required_skills.length})` : ''}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Inline Skills Editor */}
          {selectedJob && (
            <Popover open={skillsEditorOpen} onOpenChange={setSkillsEditorOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit Skills</span>
                  {selectedJob.required_skills?.length ? (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {selectedJob.required_skills.length}
                    </Badge>
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" align="start">
                <JobSkillsEditor
                  job={selectedJob}
                  onSave={() => setSkillsEditorOpen(false)}
                  onCancel={() => setSkillsEditorOpen(false)}
                />
              </PopoverContent>
            </Popover>
          )}

          <span className="text-sm text-muted-foreground">
            {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Real-time Status Indicator */}
        <Badge 
          variant="outline" 
          className={cn(
            "gap-1.5",
            connectionStatus === 'connected' && "border-green-500/50 text-green-600",
            connectionStatus === 'connecting' && "border-yellow-500/50 text-yellow-600",
            connectionStatus === 'disconnected' && "border-red-500/50 text-red-600",
            connectionStatus === 'error' && "border-red-500/50 text-red-600"
          )}
        >
          {connectionStatus === 'connected' ? (
            <>
              <Wifi className="h-3 w-3" />
              Live
            </>
          ) : connectionStatus === 'connecting' ? (
            <>
              <Wifi className="h-3 w-3 animate-pulse" />
              Connecting
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Offline
            </>
          )}
        </Badge>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ScrollArea className="w-full pb-4">
          <div className="flex gap-4 min-w-max">
            {STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                candidates={candidatesByStatus[status]}
                activeId={activeId}
                onCardClick={handleCardClick}
                selectedJob={selectedJob}
                isSortedByMatch={isSortingByMatch}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Drag Overlay - shows the card being dragged */}
        <DragOverlay>
          {activeCandidate ? (
            <div className="rotate-3 scale-105">
              <KanbanCard candidate={activeCandidate} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onStatusChange={handleModalStatusChange}
        initialJobId={selectedJobId !== 'all' ? selectedJobId : undefined}
      />
    </div>
  );
}
