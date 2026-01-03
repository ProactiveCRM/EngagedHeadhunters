import { useState, useMemo } from 'react';
import { Users, X, Plus, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ComparisonCard } from './ComparisonCard';
import { CandidateSelector } from './CandidateSelector';
import { cn } from '@/lib/utils';
import type { Candidate, JobOrder, CandidateStatus } from '@/lib/ats/types';

interface CandidateComparisonProps {
  candidates: Candidate[];
  jobOrders: JobOrder[];
  selectedJobId?: string;
  onJobChange?: (jobId: string) => void;
  onStatusChange?: (candidateId: string, status: CandidateStatus) => void;
  className?: string;
}

export function CandidateComparison({
  candidates,
  jobOrders,
  selectedJobId,
  onJobChange,
  onStatusChange,
  className,
}: CandidateComparisonProps) {
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedJob = useMemo(() => 
    jobOrders.find(j => j.id === selectedJobId),
    [jobOrders, selectedJobId]
  );

  const selectedCandidates = useMemo(() =>
    selectedCandidateIds
      .map(id => candidates.find(c => c.id === id))
      .filter((c): c is Candidate => c !== undefined),
    [candidates, selectedCandidateIds]
  );

  const requiredSkills = selectedJob?.required_skills || [];

  const handleRemoveCandidate = (id: string) => {
    setSelectedCandidateIds(prev => prev.filter(i => i !== id));
  };

  const clearAll = () => {
    setSelectedCandidateIds([]);
  };

  const handleStatusChange = (candidateId: string, status: CandidateStatus) => {
    onStatusChange?.(candidateId, status);
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex-shrink-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Candidate Comparison</CardTitle>
            {selectedCandidates.length > 0 && (
              <Badge variant="secondary">{selectedCandidates.length} selected</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedCandidates.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Popover open={selectorOpen} onOpenChange={setSelectorOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Candidates
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" align="end">
                <CandidateSelector
                  candidates={candidates}
                  selectedIds={selectedCandidateIds}
                  onSelectionChange={setSelectedCandidateIds}
                  maxSelection={4}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Job selector for comparison context */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-muted-foreground">Compare against:</span>
          <Select
            value={selectedJobId || 'none'}
            onValueChange={(val) => onJobChange?.(val === 'none' ? '' : val)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a job order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No job selected</SelectItem>
              {jobOrders.filter(j => j.status === 'open').map(job => (
                <SelectItem key={job.id} value={job.id}>
                  {job.job_title} - {job.client_company}
                  {job.required_skills?.length ? ` (${job.required_skills.length} skills)` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {requiredSkills.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {requiredSkills.length} required skills
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {selectedCandidates.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No candidates selected</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Select up to 4 candidates to compare them side-by-side.
              {requiredSkills.length > 0 && ' Skills will be highlighted based on job requirements.'}
            </p>
            <Popover open={selectorOpen} onOpenChange={setSelectorOpen}>
              <PopoverTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Select Candidates
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" align="center">
                <CandidateSelector
                  candidates={candidates}
                  selectedIds={selectedCandidateIds}
                  onSelectionChange={setSelectedCandidateIds}
                  maxSelection={4}
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
              {selectedCandidates.map(candidate => (
                <ComparisonCard
                  key={candidate.id}
                  candidate={candidate}
                  requiredSkills={requiredSkills}
                  onRemove={() => handleRemoveCandidate(candidate.id)}
                  onStatusChange={(status) => handleStatusChange(candidate.id, status)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
