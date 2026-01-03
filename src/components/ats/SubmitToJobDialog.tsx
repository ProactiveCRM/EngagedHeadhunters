import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useJobOrders, useSubmitCandidate } from '@/hooks/useATS';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Building2, 
  MapPin, 
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import type { Candidate, JobOrder } from '@/lib/ats/types';

interface SubmitToJobDialogProps {
  candidateIds: string[];
  candidates?: Candidate[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface SubmissionResult {
  candidateId: string;
  jobOrderId: string;
  success: boolean;
  error?: string;
}

export function SubmitToJobDialog({
  candidateIds,
  candidates = [],
  isOpen,
  onClose,
  onSuccess,
}: SubmitToJobDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: jobOrders, isLoading: loadingJobs } = useJobOrders({ status: ['open'] });
  const submitCandidate = useSubmitCandidate();
  
  const [search, setSearch] = useState('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<SubmissionResult[]>([]);

  const filteredJobs = useMemo(() => {
    if (!jobOrders) return [];
    if (!search) return jobOrders;
    
    const searchLower = search.toLowerCase();
    return jobOrders.filter(job => 
      job.job_title.toLowerCase().includes(searchLower) ||
      job.client_company.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower)
    );
  }, [jobOrders, search]);

  const toggleJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const toggleAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(j => j.id));
    }
  };

  const handleSubmit = async () => {
    if (!user?.id || selectedJobs.length === 0 || candidateIds.length === 0) return;

    setIsSubmitting(true);
    const newResults: SubmissionResult[] = [];

    // Submit each candidate to each selected job
    for (const candidateId of candidateIds) {
      for (const jobOrderId of selectedJobs) {
        try {
          await submitCandidate.mutateAsync({
            candidateId,
            jobOrderId,
            submittedBy: user.id,
          });
          newResults.push({ candidateId, jobOrderId, success: true });
        } catch (error) {
          newResults.push({ 
            candidateId, 
            jobOrderId, 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    setResults(newResults);
    setIsSubmitting(false);

    const successCount = newResults.filter(r => r.success).length;
    const failCount = newResults.filter(r => !r.success).length;

    if (failCount === 0) {
      toast({
        title: 'All submissions successful',
        description: `${successCount} candidate-job submissions created`,
      });
      onSuccess?.();
      handleClose();
    } else if (successCount > 0) {
      toast({
        title: 'Partial success',
        description: `${successCount} succeeded, ${failCount} failed`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'All submissions failed',
        description: 'Please try again or contact support',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setSelectedJobs([]);
    setResults([]);
    onClose();
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const format = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `${format(min)}+`;
    return `Up to ${format(max!)}`;
  };

  const candidateNames = useMemo(() => {
    if (candidates.length === 0) return `${candidateIds.length} candidate(s)`;
    if (candidates.length <= 3) {
      return candidates.map(c => `${c.first_name} ${c.last_name}`).join(', ');
    }
    return `${candidates[0].first_name} ${candidates[0].last_name} and ${candidates.length - 1} others`;
  }, [candidates, candidateIds]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Submit to Job Orders</DialogTitle>
          <DialogDescription>
            Select job orders to submit {candidateNames}
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Select All */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center gap-2 py-2 border-b">
            <Checkbox
              id="select-all"
              checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
              onCheckedChange={toggleAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
              Select all open jobs ({filteredJobs.length})
            </label>
          </div>
        )}

        {/* Job List */}
        <ScrollArea className="flex-1 min-h-[300px] max-h-[400px] -mx-6 px-6">
          {loadingJobs ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3 p-3 border rounded-lg">
                  <Skeleton className="h-5 w-5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {search ? 'No jobs match your search' : 'No open jobs available'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredJobs.map((job) => (
                <label
                  key={job.id}
                  className={`flex gap-3 p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedJobs.includes(job.id) ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => toggleJob(job.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{job.job_title}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {job.client_company}
                      </span>
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                      )}
                      {formatSalary(job.salary_min, job.salary_max) && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {formatSalary(job.salary_min, job.salary_max)}
                        </span>
                      )}
                      {job.candidates_submitted !== undefined && job.candidates_submitted > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.candidates_submitted} submitted
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {job.employment_type || 'Full-time'}
                  </Badge>
                </label>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Results summary (if any) */}
        {results.length > 0 && (
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              {results.filter(r => r.success).length} succeeded
            </span>
            {results.filter(r => !r.success).length > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertCircle className="h-4 w-4" />
                {results.filter(r => !r.success).length} failed
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedJobs.length > 0 && (
              <>
                {candidateIds.length} candidate(s) × {selectedJobs.length} job(s) = {candidateIds.length * selectedJobs.length} submission(s)
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || selectedJobs.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit to {selectedJobs.length} Job(s)</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
