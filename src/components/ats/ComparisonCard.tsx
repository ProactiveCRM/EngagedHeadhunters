import { X, Mail, Phone, MapPin, Building2, Briefcase, DollarSign, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateSkillMatch, getMatchColorClass, getMatchLabel } from '@/lib/ats/scoring';
import { cn } from '@/lib/utils';
import type { Candidate, CandidateStatus } from '@/lib/ats/types';

interface ComparisonCardProps {
  candidate: Candidate;
  requiredSkills?: string[];
  onRemove?: () => void;
  onStatusChange?: (status: CandidateStatus) => void;
  className?: string;
}

const STATUS_OPTIONS: { value: CandidateStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'screening', label: 'Screening' },
  { value: 'interviewed', label: 'Interviewed' },
  { value: 'offered', label: 'Offered' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' },
];

export function ComparisonCard({
  candidate,
  requiredSkills = [],
  onRemove,
  onStatusChange,
  className,
}: ComparisonCardProps) {
  const initials = `${candidate.first_name?.[0] || ''}${candidate.last_name?.[0] || ''}`.toUpperCase();
  
  const matchResult = requiredSkills.length > 0
    ? calculateSkillMatch(candidate.skills || [], requiredSkills)
    : null;

  const matchLabel = matchResult ? getMatchLabel(matchResult.matchPercentage) : null;
  const matchColorClass = matchResult ? getMatchColorClass(matchResult.matchPercentage) : '';

  return (
    <Card className={cn("relative h-full flex flex-col", className)}>
      {/* Remove button */}
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 z-10"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <CardHeader className="pb-3">
        {/* Avatar and name */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold truncate">
              {candidate.first_name} {candidate.last_name}
            </h3>
            {matchResult && (
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn("text-xs", matchColorClass)}>
                  {matchResult.matchPercentage}% Match
                </Badge>
                <span className="text-xs text-muted-foreground">{matchLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title and company */}
        {(candidate.current_title || candidate.current_company) && (
          <div className="mt-2 space-y-1">
            {candidate.current_title && (
              <p className="text-sm font-medium truncate">{candidate.current_title}</p>
            )}
            {candidate.current_company && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{candidate.current_company}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <Separator />

        {/* Skills section */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground">Skills</h4>
          
          {/* Matched skills */}
          {matchResult && matchResult.matchedSkills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {matchResult.matchedSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs bg-green-500/10 text-green-600 border border-green-500/20 gap-1"
                >
                  <Check className="h-3 w-3" />
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Extra skills (candidate has but not required) */}
          {candidate.skills && candidate.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(matchResult ? matchResult.extraSkills : candidate.skills).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Missing skills */}
          {matchResult && matchResult.missingSkills.length > 0 && (
            <div className="mt-2 p-2 rounded-md bg-destructive/5 border border-destructive/10">
              <div className="flex items-center gap-1.5 text-xs text-destructive mb-1">
                <AlertCircle className="h-3 w-3" />
                <span className="font-medium">Missing Skills ({matchResult.missingSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {matchResult.missingSkills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs border-destructive/30 text-destructive/80"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(!candidate.skills || candidate.skills.length === 0) && (
            <p className="text-xs text-muted-foreground italic">No skills listed</p>
          )}
        </div>

        <Separator />

        {/* Contact info */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground">Contact</h4>
          <div className="space-y-1.5 text-sm">
            {candidate.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
            )}
            {candidate.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{candidate.phone}</span>
              </div>
            )}
            {candidate.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{candidate.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Experience info */}
        {(candidate.experience_years || candidate.salary_expectation) && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Details</h4>
              <div className="space-y-1.5 text-sm">
                {candidate.experience_years && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{candidate.experience_years} years experience</span>
                  </div>
                )}
                {candidate.salary_expectation && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{candidate.salary_expectation}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Status selector */}
        {onStatusChange && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Status</h4>
              <Select
                value={candidate.status}
                onValueChange={(value) => onStatusChange(value as CandidateStatus)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
