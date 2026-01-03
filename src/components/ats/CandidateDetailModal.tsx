import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  Linkedin,
  FileText,
  MapPin,
  Building2,
  DollarSign,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  Send,
  Briefcase,
  Clock,
  History,
  Target,
} from 'lucide-react';
import type { Candidate, CandidateStatus, JobOrder } from '@/lib/ats/types';
import { cn } from '@/lib/utils';
import { useUpdateCandidate, useJobOrders } from '@/hooks/useATS';
import { InlineEditField } from './InlineEditField';
import { ActivityTimeline } from './ActivityTimeline';
import { TagInput } from './TagInput';
import { CandidateMatchScore } from './CandidateMatchScore';
import { PREDEFINED_SKILLS, PREDEFINED_TAGS } from '@/lib/ats/scoring';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (candidateId: string, status: CandidateStatus) => void;
  onSubmitToJob?: (candidate: Candidate) => void;
  initialJobId?: string;
}

const STATUSES: { value: CandidateStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'screening', label: 'Screening', color: 'bg-purple-500' },
  { value: 'interviewed', label: 'Interviewed', color: 'bg-orange-500' },
  { value: 'offered', label: 'Offered', color: 'bg-teal-500' },
  { value: 'hired', label: 'Hired', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-gray-500' },
];

export function CandidateDetailModal({
  candidate,
  isOpen,
  onClose,
  onStatusChange,
  onSubmitToJob,
  initialJobId,
}: CandidateDetailModalProps) {
  const updateCandidate = useUpdateCandidate();
  
  const [localCandidate, setLocalCandidate] = useState<Candidate | null>(candidate);
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobId || '');

  // Keep local state in sync with prop changes
  useEffect(() => {
    setLocalCandidate(candidate);
  }, [candidate]);

  useEffect(() => {
    setSelectedJobId(initialJobId || '');
  }, [initialJobId]);

  const { data: jobOrders = [] } = useJobOrders();

  if (!localCandidate) return null;

  const initials = `${localCandidate.first_name?.[0] || ''}${localCandidate.last_name?.[0] || ''}`.toUpperCase();
  const isSynced = !!localCandidate.last_synced_at;
  const currentStatus = STATUSES.find(s => s.value === localCandidate.status) || STATUSES[0];
  const selectedJob = jobOrders.find(j => j.id === selectedJobId);

  const handleStatusChange = (status: CandidateStatus) => {
    if (onStatusChange && localCandidate.id) {
      onStatusChange(localCandidate.id, status);
      setLocalCandidate(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleFieldSave = async (field: keyof Candidate, value: string | number | string[]) => {
    if (!localCandidate.id) return;
    
    await updateCandidate.mutateAsync({
      id: localCandidate.id,
      [field]: value,
    });

    // Optimistic update
    setLocalCandidate(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSkillsChange = async (skills: string[]) => {
    await handleFieldSave('skills', skills);
  };

  const handleTagsChange = async (tags: string[]) => {
    await handleFieldSave('tags', tags);
  };

  const validateEmail = (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email format';
  };

  const validateUrl = (value: string): string | null => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Invalid URL format';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold">
                {localCandidate.first_name} {localCandidate.last_name}
              </DialogTitle>
              {localCandidate.current_title && (
                <p className="text-muted-foreground mt-1">
                  {localCandidate.current_title}
                  {localCandidate.current_company && ` at ${localCandidate.current_company}`}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {localCandidate.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {localCandidate.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  {isSynced ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-green-600">Synced</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Not synced</span>
                    </>
                  )}
                </span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={cn("text-white", currentStatus.color)}
            >
              {currentStatus.label}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="contact" className="flex-1 min-h-0 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <History className="h-3.5 w-3.5" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="contact" className="mt-0 space-y-2">
              <InlineEditField
                label="Email"
                value={localCandidate.email || ''}
                type="email"
                icon={<Mail className="h-5 w-5" />}
                placeholder="Add email address"
                validation={validateEmail}
                onSave={(val) => handleFieldSave('email', val)}
              />
              <InlineEditField
                label="Phone"
                value={localCandidate.phone || ''}
                type="phone"
                icon={<Phone className="h-5 w-5" />}
                placeholder="Add phone number"
                onSave={(val) => handleFieldSave('phone', val)}
              />
              <InlineEditField
                label="LinkedIn"
                value={localCandidate.linkedin_url || ''}
                type="url"
                icon={<Linkedin className="h-5 w-5" />}
                placeholder="Add LinkedIn URL"
                validation={validateUrl}
                onSave={(val) => handleFieldSave('linkedin_url', val)}
              />
              <InlineEditField
                label="Resume"
                value={localCandidate.resume_url || ''}
                type="url"
                icon={<FileText className="h-5 w-5" />}
                placeholder="Add resume URL"
                validation={validateUrl}
                onSave={(val) => handleFieldSave('resume_url', val)}
              />
              <InlineEditField
                label="Location"
                value={localCandidate.location || ''}
                icon={<MapPin className="h-5 w-5" />}
                placeholder="Add location"
                onSave={(val) => handleFieldSave('location', val)}
              />
            </TabsContent>

            <TabsContent value="experience" className="mt-0 space-y-4">
              {/* Job Match Section */}
              <div className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Match Against Job</span>
                </div>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select a job to see match score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No job selected</SelectItem>
                    {jobOrders.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.job_title} at {job.client_company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedJob && (
                  <div className="mt-3">
                    <CandidateMatchScore
                      candidateSkills={localCandidate.skills || []}
                      requiredSkills={selectedJob.required_skills || []}
                      showBreakdown
                      jobTitle={selectedJob.job_title}
                    />
                  </div>
                )}
              </div>

              <InlineEditField
                label="Current Title"
                value={localCandidate.current_title || ''}
                icon={<Briefcase className="h-5 w-5" />}
                placeholder="Add current job title"
                onSave={(val) => handleFieldSave('current_title', val)}
              />
              <InlineEditField
                label="Current Company"
                value={localCandidate.current_company || ''}
                icon={<Building2 className="h-5 w-5" />}
                placeholder="Add current company"
                onSave={(val) => handleFieldSave('current_company', val)}
              />
              <InlineEditField
                label="Years of Experience"
                value={localCandidate.experience_years?.toString() || ''}
                type="number"
                icon={<Briefcase className="h-5 w-5" />}
                placeholder="Add years of experience"
                onSave={(val) => handleFieldSave('experience_years', parseInt(val) || 0)}
              />
              <InlineEditField
                label="Salary Expectation"
                value={localCandidate.salary_expectation || ''}
                icon={<DollarSign className="h-5 w-5" />}
                placeholder="Add salary expectation"
                onSave={(val) => handleFieldSave('salary_expectation', val)}
              />
              <InlineEditField
                label="Availability"
                value={localCandidate.availability || ''}
                type="select"
                icon={<Clock className="h-5 w-5" />}
                placeholder="Select availability"
                options={[
                  { value: 'immediate', label: 'Immediately Available' },
                  { value: '2-weeks', label: '2 Weeks Notice' },
                  { value: '1-month', label: '1 Month Notice' },
                  { value: 'negotiable', label: 'Negotiable' },
                ]}
                onSave={(val) => handleFieldSave('availability', val)}
              />

              {/* Editable Skills */}
              <div className="p-3 rounded-lg border">
                <TagInput
                  label="Skills"
                  value={localCandidate.skills || []}
                  onChange={handleSkillsChange}
                  suggestions={PREDEFINED_SKILLS}
                  placeholder="Add skills..."
                  highlightTags={selectedJob?.required_skills || []}
                />
              </div>

              {/* Editable Tags */}
              <div className="p-3 rounded-lg border">
                <TagInput
                  label="Tags"
                  value={localCandidate.tags || []}
                  onChange={handleTagsChange}
                  suggestions={PREDEFINED_TAGS}
                  placeholder="Add tags..."
                />
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 space-y-2">
              <InlineEditField
                label="Notes"
                value={localCandidate.notes || ''}
                type="textarea"
                placeholder="Add notes about this candidate..."
                onSave={(val) => handleFieldSave('notes', val)}
              />
            </TabsContent>

            <TabsContent value="timeline" className="mt-0">
              <ActivityTimeline
                candidateId={localCandidate.id}
                createdAt={localCandidate.created_at}
                updatedAt={localCandidate.updated_at}
                lastSyncedAt={localCandidate.last_synced_at}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 pt-4 border-t mt-4">
          <Button 
            onClick={() => onSubmitToJob?.(localCandidate)}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit to Job
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Change Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  className={cn(
                    localCandidate.status === status.value && "bg-muted"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full mr-2", status.color)} />
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
}
