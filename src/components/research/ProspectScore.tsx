import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProspectScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProspectScore({ score, size = 'md', showLabel = false, className }: ProspectScoreProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 70) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 40) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Hot';
    if (score >= 60) return 'Warm';
    if (score >= 40) return 'Cool';
    return 'Cold';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 60) return <TrendingUp className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />;
    if (score >= 40) return <Minus className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />;
    return <TrendingDown className={cn(size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />;
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'inline-flex items-center rounded-full font-medium',
              sizeClasses[size],
              getScoreBgColor(score),
              getScoreColor(score),
              className
            )}
          >
            {getScoreIcon(score)}
            <span>{score}</span>
            {showLabel && <span className="opacity-75">• {getScoreLabel(score)}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1.5 text-xs">
            <p className="font-semibold">Prospect Score: {score}/100</p>
            <p className="text-muted-foreground">Based on:</p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Data completeness (company, contact info)</li>
              <li>Company size & contact seniority</li>
              <li>Enrichment data quality</li>
              <li>Engagement (notes, tags, reminders)</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ScoreBreakdownProps {
  prospect: {
    company_name?: string | null;
    company_domain?: string | null;
    company_industry?: string | null;
    company_location?: string | null;
    company_size?: string | null;
    contact_name?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    contact_linkedin?: string | null;
    contact_title?: string | null;
    enriched_at?: string | null;
    enrichment_data?: Record<string, any> | null;
    notes?: string | null;
    tags?: string[] | null;
    score: number;
  };
}

export function ScoreBreakdown({ prospect }: ScoreBreakdownProps) {
  // Calculate component scores for display
  const dataFields = [
    { label: 'Company Name', filled: !!prospect.company_name, points: 5 },
    { label: 'Domain', filled: !!prospect.company_domain, points: 5 },
    { label: 'Industry', filled: !!prospect.company_industry, points: 3 },
    { label: 'Location', filled: !!prospect.company_location, points: 2 },
    { label: 'Contact Name', filled: !!prospect.contact_name, points: 5 },
    { label: 'Contact Email', filled: !!prospect.contact_email, points: 5 },
    { label: 'Contact Phone', filled: !!prospect.contact_phone, points: 3 },
    { label: 'LinkedIn', filled: !!prospect.contact_linkedin, points: 2 },
  ];

  const dataScore = dataFields.reduce((acc, f) => acc + (f.filled ? f.points : 0), 0);
  const enriched = !!prospect.enriched_at;
  const hasNotes = !!prospect.notes && prospect.notes.length > 0;
  const hasTags = !!prospect.tags && prospect.tags.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">Score Breakdown</h4>
        <ProspectScore score={prospect.score} size="md" showLabel />
      </div>
      
      <div className="space-y-3">
        {/* Data Completeness */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Data Completeness</span>
            <span className="font-medium">{dataScore}/30</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${(dataScore / 30) * 100}%` }} 
            />
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {dataFields.map(f => (
              <span 
                key={f.label}
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded',
                  f.filled ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-muted text-muted-foreground'
                )}
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Company Quality */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Company Quality</span>
            <span className="font-medium">
              {prospect.company_size ? '✓' : '—'} Size | {prospect.contact_title ? '✓' : '—'} Title
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {prospect.company_size && <span className="mr-2">Size: {prospect.company_size}</span>}
            {prospect.contact_title && <span>Title: {prospect.contact_title}</span>}
          </div>
        </div>

        {/* Enrichment */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Enrichment</span>
            <span className={cn('font-medium', enriched ? 'text-green-600' : 'text-muted-foreground')}>
              {enriched ? 'Enriched' : 'Not enriched'}
            </span>
          </div>
        </div>

        {/* Engagement */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Engagement</span>
            <span className="font-medium">
              {hasNotes && '📝 Notes'} {hasTags && `🏷️ ${prospect.tags?.length} tags`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
