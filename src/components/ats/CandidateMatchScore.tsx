import { Target, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { calculateSkillMatch, getMatchLabel, getMatchColorClass } from '@/lib/ats/scoring';

interface CandidateMatchScoreProps {
  candidateSkills: string[];
  requiredSkills: string[];
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  className?: string;
  jobTitle?: string;
}

export function CandidateMatchScore({
  candidateSkills = [],
  requiredSkills = [],
  size = 'md',
  showBreakdown = false,
  className,
  jobTitle,
}: CandidateMatchScoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const result = calculateSkillMatch(candidateSkills, requiredSkills);
  const label = getMatchLabel(result.matchPercentage);
  const colorClass = getMatchColorClass(result.matchPercentage);

  // If no required skills, show a different state
  if (requiredSkills.length === 0) {
    return (
      <div className={cn("text-sm text-muted-foreground", className)}>
        <span className="italic">No job skills to compare</span>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Score Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={cn(
            "font-medium border gap-1.5",
            sizeClasses[size],
            colorClass
          )}
        >
          <Target className={iconSizes[size]} />
          {result.matchPercentage}% Match
        </Badge>
        
        <span className={cn("text-muted-foreground", size === 'sm' ? 'text-xs' : 'text-sm')}>
          {label}
        </span>

        {jobTitle && (
          <span className={cn("text-muted-foreground truncate max-w-[200px]", size === 'sm' ? 'text-xs' : 'text-sm')}>
            for {jobTitle}
          </span>
        )}

        {showBreakdown && (result.matchedSkills.length > 0 || result.missingSkills.length > 0) && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className={iconSizes[size]} />
            ) : (
              <ChevronDown className={iconSizes[size]} />
            )}
          </button>
        )}
      </div>

      {/* Breakdown */}
      {showBreakdown && isExpanded && (
        <div className="space-y-2 pl-1 text-sm">
          {result.matchedSkills.length > 0 && (
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                <span className="text-muted-foreground mr-1">Matched:</span>
                {result.matchedSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {result.missingSkills.length > 0 && (
            <div className="flex items-start gap-2">
              <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                <span className="text-muted-foreground mr-1">Missing:</span>
                {result.missingSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact breakdown for non-expandable */}
      {!showBreakdown && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-green-600">{result.matchedSkills.length} matched</span>
          <span>·</span>
          <span className="text-destructive">{result.missingSkills.length} missing</span>
        </div>
      )}
    </div>
  );
}

/**
 * Compact score indicator for cards
 */
export function CompactMatchScore({
  candidateSkills = [],
  requiredSkills = [],
  className,
}: {
  candidateSkills: string[];
  requiredSkills: string[];
  className?: string;
}) {
  if (requiredSkills.length === 0) return null;

  const result = calculateSkillMatch(candidateSkills, requiredSkills);
  const colorClass = getMatchColorClass(result.matchPercentage);

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] px-1.5 py-0 h-5 font-medium border gap-1",
        colorClass,
        className
      )}
    >
      <Target className="h-3 w-3" />
      {result.matchPercentage}%
    </Badge>
  );
}
