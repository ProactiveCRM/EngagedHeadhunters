import { useState } from 'react';
import { DollarSign, TrendingUp, BarChart3, FileText, CheckCircle, Users, ArrowRight, Loader2 } from 'lucide-react';
import { } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import ServiceSchema from '../components/seo/ServiceSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SalaryResult {
  role: string;
  location: string;
  experienceLevel: string;
  industry: string;
  baseSalary: {
    low: number;
    mid: number;
    high: number;
    currency: string;
  };
  totalCompensation: {
    low: number;
    mid: number;
    high: number;
    currency: string;
    includes: string[];
  };
  marketPosition: string;
  bonusRange: string;
  insights: string[];
  dataSource: string;
  disclaimer: string;
}

const SalaryGuide = () => {
  const [formData, setFormData] = useState({
    role: '',
    location: 'Houston, TX',
    experienceLevel: '6-10',
    industry: 'Technology',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const industries = [
    { name: 'Healthcare', description: 'Medical professionals, administrators, and clinical leadership' },
    { name: 'Technology', description: 'Software engineering, IT leadership, and technology executives' },
    { name: 'Finance', description: 'Banking, investment, and corporate finance' },
    { name: 'Manufacturing', description: 'Operations, quality, and industrial leadership' },
    { name: 'Sales', description: 'Base salary, commission structures, and OTE benchmarks' },
    { name: 'Executive', description: 'C-suite and board-level total compensation packages' }
  ];

  const locations = [
    'Houston, TX',
    'Dallas, TX',
    'Austin, TX',
    'San Antonio, TX',
    'New York, NY',
    'San Francisco, CA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Boston, MA',
    'Seattle, WA',
    'Denver, CO',
    'Atlanta, GA',
    'Miami, FL',
    'Phoenix, AZ',
    'Other'
  ];

  const experienceLevels = [
    { value: '0-2', label: '0-2 Years (Entry Level)' },
    { value: '3-5', label: '3-5 Years (Mid Level)' },
    { value: '6-10', label: '6-10 Years (Senior)' },
    { value: '10+', label: '10+ Years (Executive)' }
  ];

  const reportBenefits = [
    {
      icon: BarChart3,
      title: 'Market-Accurate Data',
      description: 'Real compensation data from actual placements, not surveys or estimates'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Understand how compensation is trending in your industry and role'
    },
    {
      icon: Users,
      title: 'Competitive Benchmarking',
      description: 'See how your compensation compares to market rates'
    },
    {
      icon: FileText,
      title: 'Negotiation Support',
      description: 'Data-backed insights to support salary negotiations'
    }
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.role.trim()) {
      toast.error('Please enter a job title/role');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('salary-lookup', {
        body: {
          role: formData.role,
          location: formData.location,
          experienceLevel: formData.experienceLevel,
          industry: formData.industry,
          userEmail: formData.email || null
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success && data?.data) {
        setResult(data.data);
        setShowResults(true);
        toast.success('Salary data generated successfully!');
      } else {
        throw new Error('Invalid response from salary lookup');
      }
    } catch (err) {
      console.error('Error fetching salary data:', err);
      toast.error('Failed to generate salary data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema
        name="Executive Compensation Analysis"
        description="Market-accurate salary data and compensation benchmarks for executive and professional roles"
        url="https://www.engagedheadhunters.com/salary-guide"
        serviceType="Compensation Consulting"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Compensation Intelligence
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Executive Salary Guide &
                <span className="text-primary"> Compensation Data</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Make informed career and hiring decisions with market-accurate compensation data.
                Get instant salary estimates based on role, location, and experience level.
              </p>

              {!showResults && (
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href="#salary-tool" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                    Get Salary Estimate
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                  <Link
                    href="/contact"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Interactive Salary Tool */}
            <div id="salary-tool" className="bg-card rounded-2xl shadow-xl p-8 border">
              {!showResults ? (
                <>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Get Your Salary Estimate</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="role">Job Title / Role *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g., Software Engineer, VP Sales, CFO"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <select
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        >
                          {industries.map(ind => (
                            <option key={ind.name} value={ind.name}>{ind.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <select
                          id="experience"
                          value={formData.experienceLevel}
                          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        >
                          {experienceLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <select
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional - for personalized report)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          Get Salary Estimate
                          <ArrowRight className="ml-2" size={18} />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : result && (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Your Salary Estimate</h3>
                    <Button variant="ghost" size="sm" onClick={() => { setShowResults(false); setResult(null); }}>
                      New Search
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Role</p>
                      <p className="font-semibold text-foreground">{result.role}</p>
                      <p className="text-sm text-muted-foreground mt-2">{result.industry} • {result.location} • {result.experienceLevel} years</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Base Salary Range</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Low</p>
                          <p className="text-lg font-bold text-foreground">{formatCurrency(result.baseSalary.low)}</p>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Mid</p>
                          <p className="text-xl font-bold text-primary">{formatCurrency(result.baseSalary.mid)}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">High</p>
                          <p className="text-lg font-bold text-foreground">{formatCurrency(result.baseSalary.high)}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Total Compensation</h4>
                      <div className="bg-accent/10 rounded-lg p-4">
                        <p className="text-2xl font-bold text-accent mb-2">
                          {formatCurrency(result.totalCompensation.low)} - {formatCurrency(result.totalCompensation.high)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Includes: {result.totalCompensation.includes.join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground mb-2">Market Insights</h4>
                      {result.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={16} />
                          <p className="text-sm text-muted-foreground">{insight}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
                    </div>

                    <a
                      href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center"
                    >
                      Schedule Confidential Career Call
                      <ArrowRight className="ml-2" size={18} />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Report Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Our Data Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our compensation data is based on real placements and market intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {reportBenefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl p-8 text-center shadow-lg border">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Compensation Insights by Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our salary data covers executive and professional roles across major industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <DollarSign className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                </div>
                <p className="text-muted-foreground">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="candidate"
        title="Need Help Negotiating Your Compensation?"
        description="Our expert recruiters can help you understand your market value and negotiate the compensation package you deserve."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
        showJobsLink={false}
      />

      <Footer />
    </div>
  );
};

export default SalaryGuide;