import { useDroppable } from '@dnd-kit/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { KanbanCard } from './KanbanCard';
import type { Candidate, CandidateStatus, JobOrder } from '@/lib/ats/types';
import { cn } from '@/lib/utils';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  Gift, 
  CheckCircle2, 
  XCircle,
  ArrowDownWideNarrow
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KanbanColumnProps {
  status: CandidateStatus;
  candidates: Candidate[];
  activeId?: string | null;
  onCardClick?: (candidate: Candidate) => void;
  selectedJob?: JobOrder | null;
  isSortedByMatch?: boolean;
}

const statusConfig: Record<CandidateStatus, { 
  label: string; 
  icon: React.ElementType; 
  headerClass: string;
  dropClass: string;
}> = {
  new: { 
    label: 'New', 
    icon: UserPlus, 
    headerClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    dropClass: 'border-blue-500/50 bg-blue-500/5'
  },
  screening: { 
    label: 'Screening', 
    icon: Search, 
    headerClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    dropClass: 'border-purple-500/50 bg-purple-500/5'
  },
  interviewed: { 
    label: 'Interviewed', 
    icon: MessageSquare, 
    headerClass: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    dropClass: 'border-orange-500/50 bg-orange-500/5'
  },
  offered: { 
    label: 'Offered', 
    icon: Gift, 
    headerClass: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    dropClass: 'border-teal-500/50 bg-teal-500/5'
  },
  hired: { 
    label: 'Hired', 
    icon: CheckCircle2, 
    headerClass: 'bg-green-500/10 text-green-600 border-green-500/20',
    dropClass: 'border-green-500/50 bg-green-500/5'
  },
  rejected: { 
    label: 'Rejected', 
    icon: XCircle, 
    headerClass: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    dropClass: 'border-gray-500/50 bg-gray-500/5'
  },
};

export function KanbanColumn({ status, candidates, activeId, onCardClick, selectedJob, isSortedByMatch }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status }
  });

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "flex flex-col w-[280px] min-w-[280px] rounded-lg border bg-card",
        "transition-all duration-200",
        isOver && config.dropClass
      )}
    >
      {/* Column Header */}
      <div className={cn(
        "flex items-center justify-between p-3 border-b rounded-t-lg",
        config.headerClass
      )}>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="font-medium text-sm">{config.label}</span>
          {isSortedByMatch && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ArrowDownWideNarrow className="h-3.5 w-3.5 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sorted by match score</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-xs">
          {candidates.length}
        </Badge>
      </div>

      {/* Column Content */}
      <div 
        ref={setNodeRef}
        className="flex-1 min-h-[200px]"
      >
        <ScrollArea className="h-[calc(100vh-380px)]">
          <div className="p-2 space-y-2">
            {candidates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No candidates
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Drag candidates here
                </p>
              </div>
            ) : (
              candidates.map((candidate) => (
                <KanbanCard
                  key={candidate.id}
                  candidate={candidate}
                  isDragging={activeId === candidate.id}
                  onClick={onCardClick}
                  selectedJob={selectedJob}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
