import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Building2, Users, Briefcase, Code2, TrendingUp, 
  ExternalLink, Linkedin, Mail, MapPin, Calendar, DollarSign,
  Loader2, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight,
  Minus, Globe, Target, Newspaper, Star, UserPlus, Save, Check,
  FileSpreadsheet
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import BulkCompanyResearch from '@/components/research/BulkCompanyResearch';

interface ResearchData {
  overview: {
    name: string;
    domain: string;
    industry: string;
    subIndustry: string;
    founded: number;
    headquarters: string;
    description: string;
    website: string;
    linkedinUrl: string;
  };
  size: {
    employeeCount: { range: string; exact: number };
    employeeGrowth: string;
    growthPeriod: string;
    revenue: string;
    fundingTotal: string;
    fundingStage: string;
    lastFundingDate: string;
    investors: string[];
  };
  hiringSignals: {
    overallScore: number;
    signals: Array<{ signal: string; strength: 'high' | 'medium' | 'low'; description: string }>;
    openRoles: Array<{ title: string; department: string; level: string; location: string; postedDays: number }>;
    recentHires: Array<{ name: string; title: string; previousCompany: string; hiredDate: string }>;
    departmentGrowth: Array<{ department: string; growth: string; trend: 'up' | 'down' | 'stable' }>;
    hiringVelocity: { postsPerMonth: number; avgTimeToFill: string; trend: string };
  };
  techStack: {
    categories: Array<{ category: string; technologies: string[] }>;
    recentChanges: Array<{ technology: string; action: 'added' | 'removed'; date: string }>;
    techScore: number;
  };
  decisionMakers: Array<{
    name: string;
    title: string;
    department: string;
    linkedinUrl: string;
    email: string;
    influence: 'high' | 'medium';
    tenure: string;
    background: string;
  }>;
  companySignals: {
    newsAndEvents: Array<{ headline: string; date: string; type: string; source: string }>;
    socialPresence: { linkedin: { followers: number; engagement: string }; twitter: { followers: number }; glassdoor: { rating: number; reviews: number } };
    marketPosition: { competitors: string[]; differentiators: string[]; marketShare: string };
  };
  metadata: {
    researchedAt: string;
    dataSource: string;
    confidence: number;
  };
}

const CompanyResearch = () => {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedToProspects, setSavedToProspects] = useState(false);
  const [researchData, setResearchData] = useState<ResearchData | null>(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      toast.error('Please enter a company name, domain, or LinkedIn URL');
      return;
    }

    setIsLoading(true);
    try {
      // Determine input type
      let params: { companyName?: string; domain?: string; linkedinUrl?: string } = {};
      
      if (searchInput.includes('linkedin.com')) {
        params.linkedinUrl = searchInput;
      } else if (searchInput.includes('.')) {
        params.domain = searchInput;
      } else {
        params.companyName = searchInput;
      }

      const { data, error } = await supabase.functions.invoke('company-research', {
        body: params,
      });

      if (error) throw error;

      if (data.success) {
        setResearchData(data.data);
        setSavedToProspects(false); // Reset saved state for new research
        toast.success('Company research completed');
      } else {
        throw new Error(data.error || 'Research failed');
      }
    } catch (error) {
      console.error('Research error:', error);
      toast.error('Failed to research company');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToProspects = async () => {
    if (!researchData || !user) {
      toast.error('Please log in to save prospects');
      return;
    }

    setIsSaving(true);
    try {
      // Get the primary decision maker for contact info
      const primaryContact = researchData.decisionMakers.find(dm => dm.influence === 'high') || researchData.decisionMakers[0];

      const prospectData = {
        prospect_type: 'company' as const,
        status: 'new' as const,
        company_name: researchData.overview.name,
        company_domain: researchData.overview.domain,
        company_industry: researchData.overview.industry,
        company_size: researchData.size.employeeCount.range,
        company_location: researchData.overview.headquarters,
        company_linkedin: researchData.overview.linkedinUrl,
        company_website: researchData.overview.website,
        contact_name: primaryContact?.name || null,
        contact_title: primaryContact?.title || null,
        contact_email: primaryContact?.email || null,
        contact_linkedin: primaryContact?.linkedinUrl || null,
        enrichment_data: JSON.parse(JSON.stringify(researchData)),
        enriched_at: new Date().toISOString(),
        enrichment_source: 'company-research',
        score: researchData.hiringSignals.overallScore,
        tags: ['from-research', researchData.overview.industry.toLowerCase()],
        source: 'company-research-tool',
        notes: `Hiring Score: ${researchData.hiringSignals.overallScore}/100. ${researchData.hiringSignals.openRoles.length} open roles. ${researchData.size.fundingStage} company.`,
        created_by: user.id,
      };

      const { error } = await supabase.from('prospects').insert(prospectData);

      if (error) throw error;

      setSavedToProspects(true);
      toast.success('Company saved to prospects for follow-up');
    } catch (error) {
      console.error('Error saving to prospects:', error);
      toast.error('Failed to save to prospects');
    } finally {
      setIsSaving(false);
    }
  };

  const getStrengthColor = (strength: 'high' | 'medium' | 'low') => {
    switch (strength) {
      case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Research</h1>
          <p className="text-muted-foreground">
            Deep-dive into any company's hiring signals, tech stack, and decision-makers
          </p>
        </div>

        {/* Main Tabs - Single vs Bulk */}
        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="single" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="mr-2 h-4 w-4" /> Single Company
            </TabsTrigger>
            <TabsTrigger value="bulk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Bulk Research
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
        {/* Search */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter company name, domain, or LinkedIn URL..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Research Company
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Examples: "Stripe", "hubspot.com", "linkedin.com/company/salesforce"
            </p>
          </CardContent>
        </Card>

        {/* Results */}
        {researchData && (
          <div className="space-y-6">
            {/* Company Overview Card */}
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{researchData.overview.name}</h2>
                      <p className="text-muted-foreground">{researchData.overview.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary">{researchData.overview.industry}</Badge>
                        <Badge variant="outline">{researchData.overview.subIndustry}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {researchData.overview.headquarters}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Founded {researchData.overview.founded}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSaveToProspects} 
                      disabled={isSaving || savedToProspects}
                      className={savedToProspects ? 'bg-green-600 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : savedToProspects ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved to Prospects
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save to Prospects
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={researchData.overview.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" /> Website
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={researchData.overview.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                    <p className="text-xl font-semibold text-foreground">{researchData.size.employeeCount.range}</p>
                    <p className="text-xs text-green-400">{researchData.size.employeeGrowth} {researchData.size.growthPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-xl font-semibold text-foreground">{researchData.size.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Funding</p>
                    <p className="text-xl font-semibold text-foreground">{researchData.size.fundingTotal}</p>
                    <p className="text-xs text-muted-foreground">{researchData.size.fundingStage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hiring Score</p>
                    <p className="text-xl font-semibold text-primary">{researchData.hiringSignals.overallScore}/100</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Confidence</p>
                    <p className="text-xl font-semibold text-foreground">{researchData.metadata.confidence}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs defaultValue="hiring" className="space-y-4">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="hiring" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <TrendingUp className="mr-2 h-4 w-4" /> Hiring Signals
                </TabsTrigger>
                <TabsTrigger value="tech" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Code2 className="mr-2 h-4 w-4" /> Tech Stack
                </TabsTrigger>
                <TabsTrigger value="people" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users className="mr-2 h-4 w-4" /> Decision Makers
                </TabsTrigger>
                <TabsTrigger value="signals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Target className="mr-2 h-4 w-4" /> Company Signals
                </TabsTrigger>
              </TabsList>

              {/* Hiring Signals Tab */}
              <TabsContent value="hiring" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Hiring Signals */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Active Hiring Signals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {researchData.hiringSignals.signals.map((signal, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                          <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                            {signal.strength}
                          </Badge>
                          <div>
                            <p className="font-medium text-foreground">{signal.signal}</p>
                            <p className="text-sm text-muted-foreground">{signal.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Department Growth */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Department Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {researchData.hiringSignals.departmentGrowth.map((dept, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-foreground">{dept.department}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{dept.growth}</span>
                            {getTrendIcon(dept.trend)}
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Posts/month</span>
                          <span className="text-foreground">{researchData.hiringSignals.hiringVelocity.postsPerMonth}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Avg. time to fill</span>
                          <span className="text-foreground">{researchData.hiringSignals.hiringVelocity.avgTimeToFill}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Trend</span>
                          <Badge variant="secondary">{researchData.hiringSignals.hiringVelocity.trend}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Open Roles */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Open Positions ({researchData.hiringSignals.openRoles.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {researchData.hiringSignals.openRoles.map((role, i) => (
                        <div key={i} className="p-3 rounded-lg bg-background border border-border">
                          <p className="font-medium text-foreground">{role.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{role.department}</Badge>
                            <Badge variant="secondary" className="text-xs">{role.level}</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{role.location}</span>
                            <span>Posted {role.postedDays}d ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Hires */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-primary" />
                      Recent Key Hires
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {researchData.hiringSignals.recentHires.map((hire, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                          <div>
                            <p className="font-medium text-foreground">{hire.name}</p>
                            <p className="text-sm text-muted-foreground">{hire.title}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-foreground">from {hire.previousCompany}</p>
                            <p className="text-xs text-muted-foreground">{hire.hiredDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tech Stack Tab */}
              <TabsContent value="tech" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-border bg-card md:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Code2 className="h-5 w-5 text-primary" />
                          Technology Stack
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Tech Score:</span>
                          <Badge variant="secondary" className="text-lg">{researchData.techStack.techScore}/100</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {researchData.techStack.categories.map((cat, i) => (
                          <div key={i} className="p-4 rounded-lg bg-background border border-border">
                            <h4 className="font-medium text-foreground mb-3">{cat.category}</h4>
                            <div className="flex flex-wrap gap-2">
                              {cat.technologies.map((tech, j) => (
                                <Badge key={j} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Technology Changes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {researchData.techStack.recentChanges.map((change, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
                            {change.action === 'added' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-400" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span className="text-foreground">{change.technology}</span>
                            <span className="text-xs text-muted-foreground">{change.date}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Decision Makers Tab */}
              <TabsContent value="people" className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Key Decision Makers
                    </CardTitle>
                    <CardDescription>
                      People with hiring authority and budget control
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {researchData.decisionMakers.map((person, i) => (
                        <div key={i} className="p-4 rounded-lg bg-background border border-border">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{person.name}</h4>
                              <p className="text-primary">{person.title}</p>
                              <p className="text-sm text-muted-foreground">{person.department}</p>
                            </div>
                            <Badge variant="outline" className={person.influence === 'high' ? 'bg-primary/20 text-primary border-primary/30' : ''}>
                              {person.influence} influence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{person.background}</p>
                          <p className="text-xs text-muted-foreground mt-1">Tenure: {person.tenure}</p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" asChild>
                              <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-1 h-3 w-3" /> Profile
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a href={`mailto:${person.email}`}>
                                <Mail className="mr-1 h-3 w-3" /> Email
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Company Signals Tab */}
              <TabsContent value="signals" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* News & Events */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-primary" />
                        News & Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {researchData.companySignals.newsAndEvents.map((news, i) => (
                        <div key={i} className="p-3 rounded-lg bg-background border border-border">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-foreground text-sm">{news.headline}</p>
                            <Badge variant="outline" className="shrink-0">{news.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{news.source}</span>
                            <span>{news.date}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Social Presence */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Social Presence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Linkedin className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-foreground">LinkedIn</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Followers</p>
                            <p className="font-semibold text-foreground">{researchData.companySignals.socialPresence.linkedin.followers.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Engagement</p>
                            <p className="font-semibold text-foreground">{researchData.companySignals.socialPresence.linkedin.engagement}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium text-foreground">Glassdoor</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-semibold text-foreground">{researchData.companySignals.socialPresence.glassdoor.rating}/5</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Reviews</p>
                            <p className="font-semibold text-foreground">{researchData.companySignals.socialPresence.glassdoor.reviews}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Position */}
                  <Card className="border-border bg-card md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Market Position
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Market Share</h4>
                          <p className="text-2xl font-bold text-primary">{researchData.companySignals.marketPosition.marketShare}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Key Competitors</h4>
                          <div className="flex flex-wrap gap-2">
                            {researchData.companySignals.marketPosition.competitors.map((comp, i) => (
                              <Badge key={i} variant="outline">{comp}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Differentiators</h4>
                          <div className="flex flex-wrap gap-2">
                            {researchData.companySignals.marketPosition.differentiators.map((diff, i) => (
                              <Badge key={i} variant="secondary">{diff}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Investors */}
                {researchData.size.investors.length > 0 && (
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Investors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {researchData.size.investors.map((investor, i) => (
                          <Badge key={i} variant="secondary" className="text-sm">{investor}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Last funding: {researchData.size.lastFundingDate} ({researchData.size.fundingStage})
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Empty State */}
        {!researchData && !isLoading && (
          <Card className="border-border bg-card">
            <CardContent className="py-16 text-center">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Research Any Company</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a company name, domain, or LinkedIn URL to uncover hiring signals, 
                tech stack, and key decision-makers for your outreach.
              </p>
            </CardContent>
          </Card>
        )}
          </TabsContent>

          <TabsContent value="bulk">
            <BulkCompanyResearch />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanyResearch;
