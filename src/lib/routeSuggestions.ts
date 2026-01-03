/**
 * Route Suggestions Utility
 * Provides smart route suggestions for 404 pages based on mistyped URLs
 */

export interface RouteSuggestion {
  path: string;
  label: string;
  matchType: 'exact' | 'category' | 'similar' | 'keyword';
  score: number;
}

interface RouteDefinition {
  path: string;
  label: string;
  keywords: string[];
  category: string;
}

// Registry of all valid routes with metadata
const VALID_ROUTES: RouteDefinition[] = [
  // Main Pages
  { path: '/', label: 'Home', keywords: ['home', 'main', 'index'], category: 'main' },
  { path: '/about', label: 'About Us', keywords: ['about', 'company', 'who'], category: 'main' },
  { path: '/contact', label: 'Contact', keywords: ['contact', 'reach', 'email', 'phone'], category: 'main' },
  { path: '/sitemap', label: 'Sitemap', keywords: ['sitemap', 'pages', 'navigation'], category: 'main' },
  
  // Services
  { path: '/services', label: 'Services Hub', keywords: ['services', 'service', 'offerings'], category: 'services' },
  { path: '/executive-search', label: 'Executive Search', keywords: ['executive', 'search', 'leadership', 'ceo', 'cfo'], category: 'services' },
  { path: '/contract-staffing', label: 'Contract Staffing', keywords: ['contract', 'staffing', 'temporary', 'temp'], category: 'services' },
  { path: '/temporary-staffing', label: 'Temporary Staffing', keywords: ['temporary', 'temp', 'staffing', 'short-term'], category: 'services' },
  { path: '/healthcare-staffing', label: 'Healthcare Staffing', keywords: ['healthcare', 'medical', 'nurse', 'doctor', 'hospital'], category: 'services' },
  { path: '/technology-recruiting', label: 'Technology Recruiting', keywords: ['technology', 'tech', 'it', 'software', 'developer'], category: 'services' },
  { path: '/finance-recruiting', label: 'Finance Recruiting', keywords: ['finance', 'accounting', 'cpa', 'financial'], category: 'services' },
  { path: '/sales-recruiting', label: 'Sales Recruiting', keywords: ['sales', 'selling', 'revenue', 'account'], category: 'services' },
  { path: '/manufacturing-recruiting', label: 'Manufacturing Recruiting', keywords: ['manufacturing', 'production', 'factory', 'industrial'], category: 'services' },
  
  // Careers
  { path: '/careers', label: 'Careers Hub', keywords: ['careers', 'jobs', 'employment', 'work'], category: 'careers' },
  { path: '/executive-careers', label: 'Executive Careers', keywords: ['executive', 'leadership', 'ceo', 'director'], category: 'careers' },
  { path: '/contract-careers', label: 'Contract Careers', keywords: ['contract', 'contractor', 'freelance'], category: 'careers' },
  { path: '/remote-careers', label: 'Remote Careers', keywords: ['remote', 'work-from-home', 'wfh', 'virtual'], category: 'careers' },
  { path: '/entry-level-careers', label: 'Entry Level Careers', keywords: ['entry', 'junior', 'graduate', 'intern'], category: 'careers' },
  { path: '/healthcare-careers', label: 'Healthcare Careers', keywords: ['healthcare', 'medical', 'nursing'], category: 'careers' },
  { path: '/technology-careers', label: 'Technology Careers', keywords: ['technology', 'tech', 'it', 'software'], category: 'careers' },
  { path: '/finance-careers', label: 'Finance Careers', keywords: ['finance', 'accounting', 'banking'], category: 'careers' },
  { path: '/sales-careers', label: 'Sales Careers', keywords: ['sales', 'business-development'], category: 'careers' },
  { path: '/manufacturing-careers', label: 'Manufacturing Careers', keywords: ['manufacturing', 'production'], category: 'careers' },
  
  // Booking
  { path: '/book', label: 'Booking Hub', keywords: ['book', 'booking', 'schedule', 'appointment'], category: 'booking' },
  { path: '/book/talent', label: 'Request Talent', keywords: ['talent', 'hire', 'hiring', 'employer'], category: 'booking' },
  { path: '/book/career', label: 'Career Consultation', keywords: ['career', 'consultation', 'job-seeker'], category: 'booking' },
  
  // Agents
  { path: '/agents', label: 'Our Agents', keywords: ['agents', 'recruiters', 'team', 'headhunters'], category: 'agents' },
  { path: '/james-pemberton', label: 'James Pemberton', keywords: ['james', 'pemberton', 'founder'], category: 'agents' },
  { path: '/alliance', label: 'Agent Alliance', keywords: ['alliance', 'partner', 'join', 'recruiter'], category: 'agents' },
  { path: '/for-recruiters', label: 'For Recruiters', keywords: ['recruiters', 'join', 'partner'], category: 'agents' },
  
  // Resources
  { path: '/blog', label: 'Blog', keywords: ['blog', 'articles', 'news', 'insights'], category: 'resources' },
  { path: '/case-studies', label: 'Case Studies', keywords: ['case', 'studies', 'success', 'stories'], category: 'resources' },
  { path: '/resources', label: 'Resources Hub', keywords: ['resources', 'guides', 'tools'], category: 'resources' },
  { path: '/salary-guide', label: 'Salary Guide', keywords: ['salary', 'compensation', 'pay', 'wages'], category: 'resources' },
  
  // Locations
  { path: '/locations', label: 'All Locations', keywords: ['locations', 'cities', 'areas', 'markets'], category: 'locations' },
  { path: '/houston', label: 'Houston', keywords: ['houston', 'texas', 'tx'], category: 'locations' },
  
  // Niches
  { path: '/niches', label: 'Industry Niches', keywords: ['niches', 'industries', 'specialties'], category: 'niches' },
  
  // User Pages
  { path: '/employers', label: 'For Employers', keywords: ['employers', 'hiring', 'companies'], category: 'user' },
  { path: '/candidates', label: 'For Candidates', keywords: ['candidates', 'job-seekers', 'applicants'], category: 'user' },
  { path: '/submit-resume', label: 'Submit Resume', keywords: ['resume', 'cv', 'apply', 'submit'], category: 'user' },
  { path: '/partners', label: 'Partners', keywords: ['partners', 'partnerships'], category: 'user' },
  
  // Legal
  { path: '/privacy-policy', label: 'Privacy Policy', keywords: ['privacy', 'policy', 'data'], category: 'legal' },
  { path: '/terms-of-service', label: 'Terms of Service', keywords: ['terms', 'service', 'tos', 'legal'], category: 'legal' },
  { path: '/confidentiality-agreement', label: 'Confidentiality Agreement', keywords: ['confidentiality', 'nda', 'agreement'], category: 'legal' },
  
  // Auth
  { path: '/auth', label: 'Sign In', keywords: ['auth', 'login', 'signin', 'signup', 'register'], category: 'auth' },
  
  // Admin
  { path: '/admin', label: 'Admin Dashboard', keywords: ['admin', 'dashboard', 'manage'], category: 'admin' },
  { path: '/admin/users', label: 'Manage Users', keywords: ['users', 'accounts', 'members'], category: 'admin' },
  { path: '/admin/agents', label: 'Manage Agents', keywords: ['agents', 'recruiters'], category: 'admin' },
  { path: '/admin/blog', label: 'Manage Blog', keywords: ['blog', 'posts', 'articles'], category: 'admin' },
  { path: '/admin/subscribers', label: 'Subscribers', keywords: ['subscribers', 'newsletter', 'email'], category: 'admin' },
  { path: '/admin/submissions', label: 'Submissions', keywords: ['submissions', 'forms', 'contacts'], category: 'admin' },
  { path: '/admin/seo', label: 'SEO Manager', keywords: ['seo', 'search', 'optimization'], category: 'admin' },
  { path: '/admin/directory', label: 'Directory Manager', keywords: ['directory', 'listings'], category: 'admin' },
  { path: '/admin/settings', label: 'Admin Settings', keywords: ['settings', 'config', 'configuration'], category: 'admin' },
  
  // Agent Dashboard
  { path: '/agent/dashboard', label: 'Agent Dashboard', keywords: ['agent', 'dashboard', 'my'], category: 'agent' },
  { path: '/agent/blog', label: 'My Blog Posts', keywords: ['blog', 'posts', 'write'], category: 'agent' },
  { path: '/agent/prospecting', label: 'Prospecting', keywords: ['prospecting', 'leads', 'prospects'], category: 'agent' },
  { path: '/agent/research', label: 'Company Research', keywords: ['research', 'company', 'intel'], category: 'agent' },
];

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  if (m === 0) return n;
  if (n === 0) return m;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Extract meaningful segments from a pathname
 */
function extractSegments(pathname: string): string[] {
  return pathname
    .toLowerCase()
    .split('/')
    .filter(Boolean)
    .flatMap(segment => segment.split('-'));
}

/**
 * Detect the category of a URL based on its prefix
 */
function detectCategory(pathname: string): string | null {
  const lower = pathname.toLowerCase();
  
  if (lower.startsWith('/admin')) return 'admin';
  if (lower.startsWith('/agent')) return 'agent';
  if (lower.includes('career') || lower.includes('job')) return 'careers';
  if (lower.includes('service') || lower.includes('staffing') || lower.includes('recruiting')) return 'services';
  if (lower.startsWith('/book')) return 'booking';
  if (lower.includes('blog') || lower.includes('article')) return 'resources';
  if (lower.includes('location') || lower.includes('city')) return 'locations';
  
  return null;
}

/**
 * Get smart route suggestions based on a mistyped pathname
 */
export function getRouteSuggestions(pathname: string, maxSuggestions: number = 5): RouteSuggestion[] {
  const suggestions: RouteSuggestion[] = [];
  const segments = extractSegments(pathname);
  const category = detectCategory(pathname);
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, '');
  
  for (const route of VALID_ROUTES) {
    let score = 0;
    let matchType: RouteSuggestion['matchType'] = 'keyword';
    
    // 1. Check for exact prefix match (highest priority)
    if (normalizedPath.startsWith(route.path.slice(0, -1)) || route.path.startsWith(normalizedPath)) {
      score += 100;
      matchType = 'exact';
    }
    
    // 2. Calculate path similarity using Levenshtein distance
    const distance = levenshteinDistance(normalizedPath, route.path);
    const maxLen = Math.max(normalizedPath.length, route.path.length);
    const similarity = 1 - (distance / maxLen);
    
    if (similarity > 0.6) {
      score += similarity * 80;
      if (matchType !== 'exact') matchType = 'similar';
    }
    
    // 3. Category match bonus
    if (category && route.category === category) {
      score += 30;
      if (matchType === 'keyword') matchType = 'category';
    }
    
    // 4. Keyword matching
    const keywordMatches = segments.filter(seg => 
      route.keywords.some(kw => kw.includes(seg) || seg.includes(kw))
    ).length;
    
    if (keywordMatches > 0) {
      score += keywordMatches * 20;
    }
    
    // 5. Segment overlap in path
    const routeSegments = extractSegments(route.path);
    const segmentOverlap = segments.filter(seg => 
      routeSegments.some(rs => rs === seg || rs.includes(seg) || seg.includes(rs))
    ).length;
    
    score += segmentOverlap * 15;
    
    // Only include if there's some relevance
    if (score > 10) {
      suggestions.push({
        path: route.path,
        label: route.label,
        matchType,
        score,
      });
    }
  }
  
  // Sort by score descending and take top N
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions);
}

/**
 * Get popular fallback routes when no good matches are found
 */
export function getPopularRoutes(): RouteSuggestion[] {
  return [
    { path: '/', label: 'Home', matchType: 'keyword', score: 100 },
    { path: '/services', label: 'Services Hub', matchType: 'keyword', score: 90 },
    { path: '/careers', label: 'Careers Hub', matchType: 'keyword', score: 85 },
    { path: '/contact', label: 'Contact Us', matchType: 'keyword', score: 80 },
    { path: '/blog', label: 'Blog', matchType: 'keyword', score: 75 },
  ];
}
