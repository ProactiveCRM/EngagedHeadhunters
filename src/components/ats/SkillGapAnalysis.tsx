import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { analyzeSkillGaps, type SkillGapReport } from '@/lib/ats/scoring';
import { cn } from '@/lib/utils';

interface SkillGapAnalysisProps {
  candidates: { id: string; skills?: string[] | null }[];
  requiredSkills: string[];
  jobTitle?: string;
  clientCompany?: string;
}

export function SkillGapAnalysis({ 
  candidates, 
  requiredSkills, 
  jobTitle,
  clientCompany 
}: SkillGapAnalysisProps) {
  const report = useMemo((): SkillGapReport => {
    return analyzeSkillGaps(candidates, requiredSkills);
  }, [candidates, requiredSkills]);

  if (requiredSkills.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="py-8 text-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            No required skills defined for this job order.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Add required skills to see skill gap analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { skillGaps, poolHealth, totalCandidates, recommendations } = report;

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
          Skill Gap Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {jobTitle && clientCompany 
            ? `${jobTitle} at ${clientCompany}` 
            : 'Selected Job Order'} 
          {' '}• {requiredSkills.length} required skill{requiredSkills.length !== 1 ? 's' : ''} 
          {' '}• Analyzing {totalCandidates} candidate{totalCandidates !== 1 ? 's' : ''}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pool Health Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Candidate Pool Health
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <PoolHealthCard 
              label="Excellent" 
              description="80%+ match"
              count={poolHealth.excellent.length} 
              total={totalCandidates}
              colorClass="bg-green-500"
            />
            <PoolHealthCard 
              label="Good" 
              description="60-79%"
              count={poolHealth.good.length} 
              total={totalCandidates}
              colorClass="bg-primary"
            />
            <PoolHealthCard 
              label="Fair" 
              description="40-59%"
              count={poolHealth.fair.length} 
              total={totalCandidates}
              colorClass="bg-yellow-500"
            />
            <PoolHealthCard 
              label="Low" 
              description="Below 40%"
              count={poolHealth.low.length} 
              total={totalCandidates}
              colorClass="bg-destructive"
            />
          </div>
        </div>

        {/* Missing Skills Chart */}
        {skillGaps.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Most Commonly Missing Skills
            </h4>
            <div className="space-y-2">
              {skillGaps.slice(0, 5).map((gap) => (
                <div key={gap.skill} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{gap.skill}</span>
                    <span className="text-muted-foreground">
                      {gap.missingCount}/{gap.totalCandidates} ({gap.percentage}%)
                    </span>
                  </div>
                  <Progress 
                    value={gap.percentage} 
                    className={cn(
                      "h-2",
                      gap.percentage >= 70 && "[&>div]:bg-destructive",
                      gap.percentage >= 40 && gap.percentage < 70 && "[&>div]:bg-yellow-500",
                      gap.percentage < 40 && "[&>div]:bg-primary"
                    )}
                  />
                </div>
              ))}
            </div>
            {skillGaps.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                All required skills are well represented in your candidate pool
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Recommendations
            </h4>
            <ul className="space-y-1.5">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface PoolHealthCardProps {
  label: string;
  description: string;
  count: number;
  total: number;
  colorClass: string;
}

function PoolHealthCard({ label, description, count, total, colorClass }: PoolHealthCardProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className="p-3 rounded-lg border bg-card space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {label}
        </Badge>
        <span className="text-lg font-bold">{count}</span>
      </div>
      <div className="space-y-1">
        <Progress value={percentage} className={cn("h-1.5", `[&>div]:${colorClass}`)} />
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
