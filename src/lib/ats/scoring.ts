// Skill matching utility functions for candidate-job scoring

export interface MatchResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  extraSkills: string[];
}

/**
 * Normalize a skill string for comparison
 */
function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim().replace(/[.\-_]/g, '');
}

/**
 * Check if two skills match (case-insensitive, handles variations)
 */
function skillsMatch(candidateSkill: string, requiredSkill: string): boolean {
  const normalizedCandidate = normalizeSkill(candidateSkill);
  const normalizedRequired = normalizeSkill(requiredSkill);
  
  // Exact match
  if (normalizedCandidate === normalizedRequired) return true;
  
  // Partial match (one contains the other)
  if (normalizedCandidate.includes(normalizedRequired) || 
      normalizedRequired.includes(normalizedCandidate)) {
    return true;
  }
  
  return false;
}

/**
 * Calculate skill match between candidate and job requirements
 */
export function calculateSkillMatch(
  candidateSkills: string[] = [],
  requiredSkills: string[] = []
): MatchResult {
  if (requiredSkills.length === 0) {
    return {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: [],
      extraSkills: candidateSkills,
    };
  }

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const matchedCandidateSkills = new Set<string>();

  // Check each required skill against candidate skills
  for (const required of requiredSkills) {
    let found = false;
    for (const candidate of candidateSkills) {
      if (skillsMatch(candidate, required)) {
        matchedSkills.push(required);
        matchedCandidateSkills.add(candidate);
        found = true;
        break;
      }
    }
    if (!found) {
      missingSkills.push(required);
    }
  }

  // Find extra skills (not in requirements)
  const extraSkills = candidateSkills.filter(
    skill => !matchedCandidateSkills.has(skill)
  );

  const matchPercentage = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
    extraSkills,
  };
}

/**
 * Get a label for the match percentage
 */
export function getMatchLabel(percentage: number): 'Excellent' | 'Good' | 'Fair' | 'Low' {
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Fair';
  return 'Low';
}

/**
 * Get color class for the match percentage (using design tokens)
 */
export function getMatchColorClass(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500/10 text-green-600 border-green-500/20';
  if (percentage >= 60) return 'bg-primary/10 text-primary border-primary/20';
  if (percentage >= 40) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
  return 'bg-destructive/10 text-destructive border-destructive/20';
}

/**
 * Check if a candidate skill matches any required skill
 */
export function isSkillMatched(
  candidateSkill: string,
  requiredSkills: string[] = []
): boolean {
  return requiredSkills.some(required => skillsMatch(candidateSkill, required));
}

/**
 * Predefined skills list for autocomplete
 */
export const PREDEFINED_SKILLS = [
  // Technical - Frontend
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Vue.js', 'Angular', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'SASS',
  // Technical - Backend
  'Node.js', 'Python', 'Java', 'C#', '.NET', 'Go', 'Rust', 'PHP', 'Ruby', 'Ruby on Rails', 'Django', 'Flask', 'Express.js',
  // Technical - Mobile
  'Swift', 'Kotlin', 'Flutter', 'iOS', 'Android',
  // Technical - Data
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'GraphQL', 'REST API',
  // Technical - Cloud & DevOps
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux',
  // Technical - Other
  'Git', 'Machine Learning', 'AI', 'Data Science', 'Blockchain', 'Cybersecurity',
  // Business/Soft Skills
  'Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Problem Solving', 'Team Management',
  'Stakeholder Management', 'Strategic Planning', 'Budgeting', 'Presentation Skills',
  // Industry-Specific
  'Healthcare', 'HIPAA', 'Finance', 'Accounting', 'Manufacturing', 'Supply Chain', 'Sales', 'Marketing', 'HR', 'Legal',
  'Oil & Gas', 'Energy', 'Construction', 'Real Estate', 'Logistics', 'Retail',
];

/**
 * Predefined tags for candidates
 */
export const PREDEFINED_TAGS = [
  'Senior', 'Junior', 'Mid-level', 'Entry-level', 'Executive',
  'Remote', 'Hybrid', 'On-site', 'Relocating',
  'Interviewed', 'Referred', 'Passive', 'Active',
  'Top Candidate', 'Fast Responder', 'Negotiating', 'Offer Extended',
  'Contract', 'Full-time', 'Part-time', 'Freelance',
  'Urgent', 'Hot Lead', 'Follow Up', 'On Hold',
];

/**
 * Skill gap data for a single skill
 */
export interface SkillGapData {
  skill: string;
  missingCount: number;
  totalCandidates: number;
  percentage: number;
}

/**
 * Pool health breakdown by match quality
 */
export interface PoolHealthData {
  excellent: string[]; // candidate IDs with 80%+ match
  good: string[];      // 60-79%
  fair: string[];      // 40-59%
  low: string[];       // below 40%
}

/**
 * Complete skill gap analysis report
 */
export interface SkillGapReport {
  skillGaps: SkillGapData[];
  poolHealth: PoolHealthData;
  totalCandidates: number;
  recommendations: string[];
}

/**
 * Analyze skill gaps across multiple candidates for a job
 */
export function analyzeSkillGaps(
  candidates: { id: string; skills?: string[] | null }[],
  requiredSkills: string[]
): SkillGapReport {
  const skillMissingCounts: Record<string, number> = {};
  const poolHealth: PoolHealthData = { excellent: [], good: [], fair: [], low: [] };

  candidates.forEach(candidate => {
    const result = calculateSkillMatch(candidate.skills || [], requiredSkills);

    // Count missing skills
    result.missingSkills.forEach(skill => {
      skillMissingCounts[skill] = (skillMissingCounts[skill] || 0) + 1;
    });

    // Categorize by match quality
    if (result.matchPercentage >= 80) poolHealth.excellent.push(candidate.id);
    else if (result.matchPercentage >= 60) poolHealth.good.push(candidate.id);
    else if (result.matchPercentage >= 40) poolHealth.fair.push(candidate.id);
    else poolHealth.low.push(candidate.id);
  });

  const skillGaps = Object.entries(skillMissingCounts)
    .map(([skill, count]) => ({
      skill,
      missingCount: count,
      totalCandidates: candidates.length,
      percentage: candidates.length > 0 ? Math.round((count / candidates.length) * 100) : 0
    }))
    .sort((a, b) => b.missingCount - a.missingCount);

  return {
    skillGaps,
    poolHealth,
    totalCandidates: candidates.length,
    recommendations: generateRecommendations(skillGaps, poolHealth)
  };
}

/**
 * Generate actionable recommendations based on skill gap analysis
 */
function generateRecommendations(
  skillGaps: SkillGapData[],
  poolHealth: PoolHealthData
): string[] {
  const recommendations: string[] = [];

  // Recommendation based on pool health
  if (poolHealth.excellent.length > 0) {
    recommendations.push(
      `${poolHealth.excellent.length} candidate${poolHealth.excellent.length > 1 ? 's are' : ' is'} excellent match${poolHealth.excellent.length > 1 ? 'es' : ''} for immediate review`
    );
  }

  // Recommendation based on top missing skills
  const topMissingSkills = skillGaps.slice(0, 3).filter(s => s.percentage > 50);
  if (topMissingSkills.length > 0) {
    const skillsList = topMissingSkills.map(s => s.skill).join(', ');
    recommendations.push(`Consider sourcing candidates with ${skillsList} experience`);
  }

  // Warning if pool is weak
  const totalStrong = poolHealth.excellent.length + poolHealth.good.length;
  const totalCandidates = poolHealth.excellent.length + poolHealth.good.length + 
                          poolHealth.fair.length + poolHealth.low.length;
  
  if (totalCandidates > 0 && totalStrong / totalCandidates < 0.3) {
    recommendations.push('Consider expanding your candidate search - current pool has limited strong matches');
  }

  // If no recommendations, add a default
  if (recommendations.length === 0) {
    recommendations.push('Candidate pool looks healthy for this role');
  }

  return recommendations;
}
