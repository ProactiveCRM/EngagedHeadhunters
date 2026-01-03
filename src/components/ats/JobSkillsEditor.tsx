import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { TagInput } from './TagInput';
import { Loader2, Check } from 'lucide-react';
import { useUpdateJobOrder } from '@/hooks/useATS';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { JobOrder } from '@/lib/ats/types';

// Common skill suggestions for recruiting
const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C#', 'Go',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'SQL', 'PostgreSQL', 'MongoDB',
  'GraphQL', 'REST API', 'Git', 'CI/CD', 'Agile', 'Scrum', 'Leadership',
  'Communication', 'Project Management', 'Data Analysis', 'Machine Learning',
  'DevOps', 'Linux', 'Terraform', 'Microservices', 'Redis', 'Elasticsearch'
];

interface JobSkillsEditorProps {
  job: JobOrder;
  onSave?: (skills: string[]) => void;
  onCancel?: () => void;
  compact?: boolean;
  showButtons?: boolean;
  className?: string;
}

export function JobSkillsEditor({
  job,
  onSave,
  onCancel,
  compact = false,
  showButtons = true,
  className,
}: JobSkillsEditorProps) {
  const [skills, setSkills] = useState<string[]>(job.required_skills || []);
  const [hasChanges, setHasChanges] = useState(false);
  const updateJobOrder = useUpdateJobOrder();

  // Track changes
  useEffect(() => {
    const original = job.required_skills || [];
    const changed = skills.length !== original.length ||
      skills.some((s, i) => s !== original[i]);
    setHasChanges(changed);
  }, [skills, job.required_skills]);

  // Reset when job changes
  useEffect(() => {
    setSkills(job.required_skills || []);
  }, [job.id, job.required_skills]);

  const handleSave = useCallback(async () => {
    try {
      await updateJobOrder.mutateAsync({
        id: job.id,
        required_skills: skills,
      });
      toast.success('Required skills updated');
      onSave?.(skills);
    } catch (error) {
      toast.error('Failed to update skills');
    }
  }, [job.id, skills, updateJobOrder, onSave]);

  const handleCancel = useCallback(() => {
    setSkills(job.required_skills || []);
    onCancel?.();
  }, [job.required_skills, onCancel]);

  return (
    <div className={cn("space-y-3", className)}>
      {!compact && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Required Skills</h4>
          <p className="text-xs text-muted-foreground">
            {job.job_title} at {job.client_company}
          </p>
        </div>
      )}

      <TagInput
        value={skills}
        onChange={setSkills}
        suggestions={SKILL_SUGGESTIONS}
        placeholder="Add required skill..."
        label={compact ? "Required Skills" : undefined}
      />

      {showButtons && (
        <div className="flex items-center justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={updateJobOrder.isPending || !hasChanges}
          >
            {updateJobOrder.isPending ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Save Skills
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
