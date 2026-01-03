import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, domain, linkedinUrl } = await req.json();
    
    console.log(`Company research request: ${companyName || domain || linkedinUrl}`);

    if (!companyName && !domain && !linkedinUrl) {
      return new Response(
        JSON.stringify({ error: 'Please provide company name, domain, or LinkedIn URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract company identifier
    const identifier = companyName || extractCompanyFromDomain(domain) || extractCompanyFromLinkedIn(linkedinUrl);
    const companyDomain = domain || generateDomain(companyName);

    // Gather comprehensive company research
    const researchData = await gatherCompanyResearch(identifier, companyDomain, linkedinUrl);

    console.log(`Company research completed for: ${identifier}`);

    return new Response(
      JSON.stringify({ success: true, data: researchData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in company-research function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractCompanyFromDomain(domain?: string): string | null {
  if (!domain) return null;
  return domain.replace(/^www\./, '').split('.')[0];
}

function extractCompanyFromLinkedIn(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/linkedin\.com\/company\/([^\/\?]+)/);
  return match ? match[1].replace(/-/g, ' ') : null;
}

function generateDomain(name?: string): string {
  if (!name) return 'example.com';
  return `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
}

async function gatherCompanyResearch(companyName: string, domain: string, linkedinUrl?: string) {
  // Simulate comprehensive research data
  // In production, this would call Clay, Firecrawl, and other APIs
  
  const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Energy', 'Professional Services'];
  const industry = industries[Math.floor(Math.random() * industries.length)];
  
  return {
    // Company Overview
    overview: {
      name: capitalizeWords(companyName),
      domain: domain,
      industry: industry,
      subIndustry: getSubIndustry(industry),
      founded: 2010 + Math.floor(Math.random() * 12),
      headquarters: getRandomHQ(),
      description: `${capitalizeWords(companyName)} is a leading ${industry.toLowerCase()} company focused on innovation and growth.`,
      website: `https://${domain}`,
      linkedinUrl: linkedinUrl || `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s/g, '-')}`,
    },
    
    // Company Size & Funding
    size: {
      employeeCount: getEmployeeCount(),
      employeeGrowth: `+${Math.floor(Math.random() * 35) + 5}%`,
      growthPeriod: 'YoY',
      revenue: getRevenue(),
      fundingTotal: getFundingTotal(),
      fundingStage: getFundingStage(),
      lastFundingDate: getLastFundingDate(),
      investors: getInvestors(),
    },
    
    // Hiring Signals
    hiringSignals: {
      overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
      signals: getHiringSignals(industry),
      openRoles: getOpenRoles(industry),
      recentHires: getRecentHires(),
      departmentGrowth: getDepartmentGrowth(),
      hiringVelocity: getHiringVelocity(),
    },
    
    // Tech Stack
    techStack: {
      categories: getTechStack(),
      recentChanges: getTechChanges(),
      techScore: Math.floor(Math.random() * 30) + 70,
    },
    
    // Decision Makers
    decisionMakers: getDecisionMakers(companyName),
    
    // Company Signals
    companySignals: {
      newsAndEvents: getNewsEvents(companyName),
      socialPresence: getSocialPresence(),
      marketPosition: getMarketPosition(),
    },
    
    // Metadata
    metadata: {
      researchedAt: new Date().toISOString(),
      dataSource: 'Engaged Headhunters Intelligence',
      confidence: Math.floor(Math.random() * 15) + 85,
    }
  };
}

function capitalizeWords(str: string): string {
  return str.split(/[\s-]/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

function getSubIndustry(industry: string): string {
  const subIndustries: Record<string, string[]> = {
    'Technology': ['SaaS', 'Enterprise Software', 'AI/ML', 'Cybersecurity', 'DevOps', 'Cloud Infrastructure'],
    'Healthcare': ['Health Tech', 'Medical Devices', 'Pharma', 'Biotech', 'Digital Health', 'Healthcare IT'],
    'Finance': ['FinTech', 'Banking', 'Insurance', 'Wealth Management', 'Payments', 'Lending'],
    'Manufacturing': ['Industrial Automation', 'Aerospace', 'Automotive', 'Electronics', 'Consumer Goods'],
    'Energy': ['Oil & Gas', 'Renewable Energy', 'Utilities', 'Clean Tech', 'Energy Storage'],
    'Professional Services': ['Consulting', 'Legal', 'Accounting', 'Staffing', 'Marketing'],
  };
  const options = subIndustries[industry] || ['General'];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomHQ(): string {
  const locations = [
    'Houston, TX', 'Austin, TX', 'Dallas, TX', 'San Antonio, TX',
    'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL',
    'Boston, MA', 'Seattle, WA', 'Denver, CO', 'Atlanta, GA', 'Miami, FL'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getEmployeeCount(): { range: string; exact: number } {
  const ranges = [
    { range: '11-50', min: 11, max: 50 },
    { range: '51-200', min: 51, max: 200 },
    { range: '201-500', min: 201, max: 500 },
    { range: '501-1000', min: 501, max: 1000 },
    { range: '1001-5000', min: 1001, max: 5000 },
  ];
  const selected = ranges[Math.floor(Math.random() * ranges.length)];
  return {
    range: selected.range,
    exact: Math.floor(Math.random() * (selected.max - selected.min)) + selected.min,
  };
}

function getRevenue(): string {
  const revenues = ['$1M-$5M', '$5M-$10M', '$10M-$25M', '$25M-$50M', '$50M-$100M', '$100M-$250M', '$250M+'];
  return revenues[Math.floor(Math.random() * revenues.length)];
}

function getFundingTotal(): string {
  const amounts = ['$500K', '$2M', '$5M', '$10M', '$25M', '$50M', '$100M+', 'Bootstrapped'];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

function getFundingStage(): string {
  const stages = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Private', 'Public', 'Bootstrapped'];
  return stages[Math.floor(Math.random() * stages.length)];
}

function getLastFundingDate(): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[Math.floor(Math.random() * months.length)];
  const year = 2022 + Math.floor(Math.random() * 3);
  return `${month} ${year}`;
}

function getInvestors(): string[] {
  const allInvestors = [
    'Sequoia Capital', 'Andreessen Horowitz', 'Accel', 'Benchmark', 'Greylock',
    'General Catalyst', 'Insight Partners', 'Tiger Global', 'Softbank', 'Index Ventures',
    'Lightspeed', 'NEA', 'Founders Fund', 'GV', 'Khosla Ventures'
  ];
  const count = Math.floor(Math.random() * 3) + 1;
  return allInvestors.sort(() => Math.random() - 0.5).slice(0, count);
}

function getHiringSignals(industry: string): Array<{ signal: string; strength: 'high' | 'medium' | 'low'; description: string }> {
  const signals = [
    { signal: 'Active Job Postings', strength: 'high' as const, description: `${Math.floor(Math.random() * 30) + 10} open positions across departments` },
    { signal: 'LinkedIn Premium Jobs', strength: 'medium' as const, description: 'Using premium job slots for key roles' },
    { signal: 'Executive Hiring', strength: 'high' as const, description: 'Recently posted VP/Director level positions' },
    { signal: 'Tech Team Expansion', strength: 'high' as const, description: 'Multiple engineering roles posted this month' },
    { signal: 'Sales Team Growth', strength: 'medium' as const, description: 'Expanding sales presence in new regions' },
    { signal: 'New Office Locations', strength: 'medium' as const, description: 'Opening new office in growing market' },
    { signal: 'Recruiter Activity', strength: 'high' as const, description: 'InMail outreach increased 40% this quarter' },
    { signal: 'Career Page Updates', strength: 'low' as const, description: 'Career page refreshed with new branding' },
  ];
  
  return signals.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 4);
}

function getOpenRoles(industry: string): Array<{ title: string; department: string; level: string; location: string; postedDays: number }> {
  const roles = [
    { title: 'Senior Software Engineer', department: 'Engineering', level: 'Senior', location: 'Remote' },
    { title: 'Product Manager', department: 'Product', level: 'Mid', location: 'Hybrid' },
    { title: 'VP of Sales', department: 'Sales', level: 'Executive', location: 'On-site' },
    { title: 'Data Scientist', department: 'Data', level: 'Senior', location: 'Remote' },
    { title: 'HR Business Partner', department: 'HR', level: 'Mid', location: 'Hybrid' },
    { title: 'Director of Marketing', department: 'Marketing', level: 'Director', location: 'On-site' },
    { title: 'Account Executive', department: 'Sales', level: 'Mid', location: 'Remote' },
    { title: 'DevOps Engineer', department: 'Engineering', level: 'Senior', location: 'Remote' },
    { title: 'Customer Success Manager', department: 'Customer Success', level: 'Mid', location: 'Hybrid' },
    { title: 'Financial Analyst', department: 'Finance', level: 'Junior', location: 'On-site' },
  ];
  
  return roles.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 3).map(role => ({
    ...role,
    postedDays: Math.floor(Math.random() * 30) + 1,
  }));
}

function getRecentHires(): Array<{ name: string; title: string; previousCompany: string; hiredDate: string }> {
  const names = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Kim', 'Jessica Martinez'];
  const titles = ['VP of Engineering', 'Head of Product', 'Director of Sales', 'Chief People Officer', 'Head of Marketing'];
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Salesforce', 'HubSpot', 'Stripe'];
  
  return names.slice(0, Math.floor(Math.random() * 3) + 2).map((name, i) => ({
    name,
    title: titles[i],
    previousCompany: companies[Math.floor(Math.random() * companies.length)],
    hiredDate: `${Math.floor(Math.random() * 3) + 1} months ago`,
  }));
}

function getDepartmentGrowth(): Array<{ department: string; growth: string; trend: 'up' | 'down' | 'stable' }> {
  return [
    { department: 'Engineering', growth: `+${Math.floor(Math.random() * 30) + 10}%`, trend: 'up' },
    { department: 'Sales', growth: `+${Math.floor(Math.random() * 25) + 5}%`, trend: 'up' },
    { department: 'Product', growth: `+${Math.floor(Math.random() * 20) + 5}%`, trend: 'up' },
    { department: 'Marketing', growth: `+${Math.floor(Math.random() * 15)}%`, trend: Math.random() > 0.5 ? 'up' : 'stable' },
    { department: 'Operations', growth: `${Math.floor(Math.random() * 10)}%`, trend: 'stable' },
  ];
}

function getHiringVelocity(): { postsPerMonth: number; avgTimeToFill: string; trend: string } {
  return {
    postsPerMonth: Math.floor(Math.random() * 15) + 5,
    avgTimeToFill: `${Math.floor(Math.random() * 30) + 20} days`,
    trend: Math.random() > 0.3 ? 'Accelerating' : 'Steady',
  };
}

function getTechStack(): Array<{ category: string; technologies: string[] }> {
  return [
    { category: 'Frontend', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'].slice(0, Math.floor(Math.random() * 2) + 2) },
    { category: 'Backend', technologies: ['Node.js', 'Python', 'Go', 'Java', 'Ruby'].slice(0, Math.floor(Math.random() * 2) + 2) },
    { category: 'Cloud/Infrastructure', technologies: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker'].slice(0, Math.floor(Math.random() * 2) + 2) },
    { category: 'Data', technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'Elasticsearch'].slice(0, Math.floor(Math.random() * 2) + 2) },
    { category: 'DevOps', technologies: ['GitHub Actions', 'Jenkins', 'Terraform', 'Datadog', 'PagerDuty'].slice(0, Math.floor(Math.random() * 2) + 2) },
    { category: 'Business Tools', technologies: ['Salesforce', 'HubSpot', 'Slack', 'Notion', 'Jira', 'Figma'].slice(0, Math.floor(Math.random() * 3) + 2) },
  ];
}

function getTechChanges(): Array<{ technology: string; action: 'added' | 'removed'; date: string }> {
  const changes = [
    { technology: 'Snowflake', action: 'added' as const, date: '2 weeks ago' },
    { technology: 'Datadog', action: 'added' as const, date: '1 month ago' },
    { technology: 'Heroku', action: 'removed' as const, date: '3 months ago' },
    { technology: 'AWS Lambda', action: 'added' as const, date: '1 month ago' },
  ];
  return changes.slice(0, Math.floor(Math.random() * 3) + 1);
}

function getDecisionMakers(companyName: string): Array<{
  name: string;
  title: string;
  department: string;
  linkedinUrl: string;
  email: string;
  influence: 'high' | 'medium';
  tenure: string;
  background: string;
}> {
  const makers = [
    { name: 'Alexandra Chen', title: 'Chief Executive Officer', department: 'Executive', influence: 'high' as const, tenure: '5 years', background: 'Former VP at Fortune 500' },
    { name: 'Marcus Williams', title: 'Chief People Officer', department: 'Human Resources', influence: 'high' as const, tenure: '3 years', background: 'Built HR at 3 startups' },
    { name: 'Jennifer Park', title: 'VP of Talent Acquisition', department: 'Human Resources', influence: 'high' as const, tenure: '2 years', background: 'Ex-Google recruiter' },
    { name: 'David Thompson', title: 'Chief Technology Officer', department: 'Engineering', influence: 'high' as const, tenure: '4 years', background: 'Engineering lead at scale-up' },
    { name: 'Rachel Green', title: 'VP of Engineering', department: 'Engineering', influence: 'medium' as const, tenure: '2 years', background: 'Built teams at 2 unicorns' },
    { name: 'Michael Foster', title: 'Chief Revenue Officer', department: 'Sales', influence: 'high' as const, tenure: '3 years', background: 'Scaled sales 10x at previous company' },
    { name: 'Sarah Kim', title: 'Director of HR', department: 'Human Resources', influence: 'medium' as const, tenure: '1 year', background: 'SHRM certified, 10+ years exp' },
  ];
  
  const slug = companyName.toLowerCase().replace(/\s/g, '-');
  return makers.slice(0, Math.floor(Math.random() * 3) + 4).map(m => ({
    ...m,
    linkedinUrl: `https://linkedin.com/in/${m.name.toLowerCase().replace(/\s/g, '-')}`,
    email: `${m.name.split(' ')[0].toLowerCase()}@${slug}.com`,
  }));
}

function getNewsEvents(companyName: string): Array<{ headline: string; date: string; type: string; source: string }> {
  const events = [
    { headline: `${capitalizeWords(companyName)} Announces $50M Series C Funding`, date: '2 weeks ago', type: 'Funding', source: 'TechCrunch' },
    { headline: `${capitalizeWords(companyName)} Expands to European Markets`, date: '1 month ago', type: 'Expansion', source: 'Business Wire' },
    { headline: `${capitalizeWords(companyName)} Named to Forbes Cloud 100`, date: '2 months ago', type: 'Recognition', source: 'Forbes' },
    { headline: `${capitalizeWords(companyName)} Partners with Industry Leader`, date: '3 weeks ago', type: 'Partnership', source: 'PR Newswire' },
    { headline: `${capitalizeWords(companyName)} Launches New Product Line`, date: '1 month ago', type: 'Product', source: 'Company Blog' },
  ];
  return events.slice(0, Math.floor(Math.random() * 3) + 2);
}

function getSocialPresence(): { linkedin: { followers: number; engagement: string }; twitter: { followers: number }; glassdoor: { rating: number; reviews: number } } {
  return {
    linkedin: { 
      followers: Math.floor(Math.random() * 50000) + 5000, 
      engagement: `${(Math.random() * 4 + 1).toFixed(1)}%` 
    },
    twitter: { 
      followers: Math.floor(Math.random() * 20000) + 1000 
    },
    glassdoor: { 
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), 
      reviews: Math.floor(Math.random() * 200) + 20 
    },
  };
}

function getMarketPosition(): { competitors: string[]; differentiators: string[]; marketShare: string } {
  const competitors = ['Competitor A', 'Competitor B', 'Competitor C', 'Competitor D', 'Competitor E'];
  const differentiators = [
    'AI-powered automation',
    'Enterprise-grade security',
    'Best-in-class integrations',
    'Industry-specific solutions',
    'Award-winning support',
  ];
  return {
    competitors: competitors.slice(0, Math.floor(Math.random() * 3) + 2),
    differentiators: differentiators.slice(0, Math.floor(Math.random() * 2) + 2),
    marketShare: `${Math.floor(Math.random() * 20) + 5}%`,
  };
}
