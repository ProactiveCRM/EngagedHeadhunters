import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  GripVertical, 
  MapPin, 
  Building2, 
  RefreshCw,
  CheckCircle2,
  Check
} from 'lucide-react';
import type { Candidate, JobOrder } from '@/lib/ats/types';
import { cn } from '@/lib/utils';
import { CompactMatchScore } from './CandidateMatchScore';
import { isSkillMatched } from '@/lib/ats/scoring';

interface KanbanCardProps {
  candidate: Candidate;
  isDragging?: boolean;
  onClick?: (candidate: Candidate) => void;
  selectedJob?: JobOrder | null;
}

export function KanbanCard({ candidate, isDragging, onClick, selectedJob }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: candidate.id,
    data: { candidate }
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const initials = `${candidate.first_name?.[0] || ''}${candidate.last_name?.[0] || ''}`.toUpperCase();
  const isSynced = !!candidate.last_synced_at;
  const displaySkills = candidate.skills?.slice(0, 3) || [];
  const extraSkills = (candidate.skills?.length || 0) - 3;
  const requiredSkills = selectedJob?.required_skills || [];

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (!isDragging && onClick) {
      onClick(candidate);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        isDragging && "opacity-50 shadow-lg rotate-2 scale-105 z-50",
        onClick && "cursor-pointer"
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-3 space-y-2">
        {/* Header with avatar and sync status */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div 
              className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none"
              {...listeners}
              {...attributes}
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground" />
            </div>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">
                {candidate.first_name} {candidate.last_name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {selectedJob && requiredSkills.length > 0 && (
              <CompactMatchScore
                candidateSkills={candidate.skills || []}
                requiredSkills={requiredSkills}
              />
            )}
            {isSynced ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Title and company */}
        {(candidate.current_title || candidate.current_company) && (
          <div className="space-y-1 pl-6">
            {candidate.current_title && (
              <p className="text-xs text-muted-foreground truncate">
                {candidate.current_title}
              </p>
            )}
            {candidate.current_company && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{candidate.current_company}</span>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {candidate.location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground pl-6">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{candidate.location}</span>
          </div>
        )}

        {/* Skills with match highlighting */}
        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-1 pl-6">
            {displaySkills.map((skill, idx) => {
              const matched = requiredSkills.length > 0 && isSkillMatched(skill, requiredSkills);
              return (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className={cn(
                    "text-[10px] px-1.5 py-0 h-5 gap-0.5",
                    matched && "bg-green-500/10 text-green-600 border border-green-500/20"
                  )}
                >
                  {matched && <Check className="h-2.5 w-2.5" />}
                  {skill}
                </Badge>
              );
            })}
            {extraSkills > 0 && (
              <Badge 
                variant="outline" 
                className="text-[10px] px-1.5 py-0 h-5"
              >
                +{extraSkills}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
