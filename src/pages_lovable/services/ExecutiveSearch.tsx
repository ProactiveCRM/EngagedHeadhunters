import { CheckCircle, ArrowRight } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import CTASection from '../../components/CTASection';
import GHLCalendarEmbed from '../../components/GHLCalendarEmbed';
import SEOHead from '../../components/seo/SEOHead';
import ServiceSchema from '../../components/seo/ServiceSchema';

const ExecutiveSearch = () => {
  const executiveRoles = [
    {
      title: "Chief Executive Officer (CEO)",
      description: "Visionary leaders who set strategic direction and drive organizational transformation.",
      searchTime: "90-120 days"
    },
    {
      title: "Chief Operating Officer (COO)",
      description: "Operations excellence leaders who translate strategy into executable results.",
      searchTime: "75-90 days"
    },
    {
      title: "Chief Financial Officer (CFO)",
      description: "Financial stewards who drive growth, manage risk, and ensure fiscal responsibility.",
      searchTime: "60-90 days"
    },
    {
      title: "Chief Technology Officer (CTO)",
      description: "Technology visionaries who lead digital transformation and innovation initiatives.",
      searchTime: "60-90 days"
    },
    {
      title: "Board of Directors",
      description: "Independent directors who provide governance, oversight, and strategic guidance.",
      searchTime: "45-75 days"
    },
    {
      title: "Division Presidents",
      description: "P&L leaders who drive business unit performance and market expansion.",
      searchTime: "60-90 days"
    }
  ];

  const industries = [
    "Technology & Software",
    "Financial Services",
    "Healthcare & Life Sciences",
    "Manufacturing & Industrial",
    "Energy & Utilities",
    "Consumer & Retail",
    "Private Equity & Venture Capital",
    "Professional Services"
  ];

  const process = [
    {
      phase: "Discovery & Strategy",
      duration: "Week 1",
      description: "Deep organizational assessment, role definition, and search strategy development.",
      activities: ["Leadership team interviews", "Organizational assessment", "Compensation benchmarking", "Search strategy planning"]
    },
    {
      phase: "Market Research",
      duration: "Week 2-3",
      description: "Comprehensive market mapping and competitive intelligence gathering.",
      activities: ["Market landscape analysis", "Target company identification", "Competitive benchmarking", "Talent pool assessment"]
    },
    {
      phase: "Candidate Sourcing",
      duration: "Week 4-8",
      description: "Proactive identification and engagement of top-tier executive talent.",
      activities: ["Direct candidate outreach", "Network leveraging", "Referral development", "Initial screening"]
    },
    {
      phase: "Assessment & Evaluation",
      duration: "Week 9-12",
      description: "Rigorous evaluation process ensuring both competency and cultural alignment.",
      activities: ["Executive assessments", "Reference verification", "Cultural fit analysis", "Final candidate selection"]
    }
  ];


  return (
    <PageLayout>
      <SEOHead
        title="Executive Search & C-Suite Recruiting"
        description="Board-level and C-suite executive recruitment for transformational leadership roles. Our executive search practice delivers visionary leaders who drive extraordinary results."
        canonical="/executive-search"
        type="service"
        keywords="executive search, C-suite recruiting, CEO search, CFO recruiting, executive headhunters, board recruitment"
      />
      <ServiceSchema
        name="Executive Search & C-Suite Recruiting"
        description="Board-level and C-suite executive recruitment for transformational leadership roles including CEO, CFO, CTO, and board directors."
        url="https://www.engagedheadhunters.com/executive-search"
        serviceType="Executive Search"
      />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <Link href="/services" className="text-primary hover:text-primary/80 font-medium">
                  ← Back to Services
                </Link>
              </div>
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Executive Search Excellence
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                C-Suite & Leadership<br />
                <span className="text-primary">Executive Search</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Board-level and C-suite recruitment for transformational leadership roles that define organizational success. 
                Our executive search practice delivers the visionary leaders who drive extraordinary results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                  Start Executive Search
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link href="/case-studies" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                  View Case Studies
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&h=400" 
                alt="Executive boardroom meeting" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">15+ Years</div>
                <div className="text-primary-foreground/80">Executive Search Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid md:grid-cols-4 gap-8 text-center list-none">
            <li>
              <div className="text-3xl font-bold text-primary mb-2">Proven</div>
              <div className="text-muted-foreground">Executive Search Success</div>
            </li>
            <li>
              <div className="text-3xl font-bold text-primary mb-2">Confidential</div>
              <div className="text-muted-foreground">Search Process</div>
            </li>
            <li>
              <div className="text-3xl font-bold text-primary mb-2">Deep</div>
              <div className="text-muted-foreground">Industry Networks</div>
            </li>
            <li>
              <div className="text-3xl font-bold text-primary mb-2">Guaranteed</div>
              <div className="text-muted-foreground">Placement Success</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Executive Roles */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Executive Leadership Roles We Fill
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              From Fortune 500 boardrooms to high-growth startups, we place transformational leaders 
              across every C-suite position and board role.
            </p>
          </div>

          <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 list-none">
            {executiveRoles.map((role, index) => (
              <li key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border">
                <h3 className="text-xl font-bold text-foreground mb-4">{role.title}</h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Typical Timeline:</span>
                  <span className="text-sm font-semibold text-primary">{role.searchTime}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              For compensation benchmarking and market insights, <Link href="/salary-guide" className="text-primary hover:underline">request our salary guide</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Industry Expertise Across All Sectors
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our executive search consultants bring deep industry knowledge and extensive networks 
                across every major business sector, ensuring we understand your unique challenges and requirements.
              </p>
              
              <ul className="grid grid-cols-2 gap-4 list-none">
                {industries.map((industry, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-muted to-background p-8 rounded-2xl border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Executive Search</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">⭐</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Proven Track Record</h4>
                    <p className="text-muted-foreground text-sm">15+ years placing C-suite executives at leading companies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🌍</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Executive Network</h4>
                    <p className="text-muted-foreground text-sm">Extensive relationships with top executives across industries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🛡️</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Confidential Process</h4>
                    <p className="text-muted-foreground text-sm">Discreet, professional handling of sensitive searches</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🎯</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Cultural Alignment</h4>
                    <p className="text-muted-foreground text-sm">Deep focus on organizational fit and leadership style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Process */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Executive Search Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology refined over two decades, delivering exceptional executive leaders 
              who drive transformational results.
            </p>
          </div>
          
          <ol className="space-y-8 list-none">
            {process.map((phase, index) => (
              <li key={index} className="bg-card rounded-xl p-8 shadow-lg border">
                <div className="grid lg:grid-cols-4 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{phase.phase}</h3>
                        <p className="text-primary font-semibold">{phase.duration}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <h4 className="font-semibold text-foreground mb-3">Key Activities:</h4>
                    <ul className="grid md:grid-cols-2 gap-3 list-none">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Schedule Consultation Section */}
      <section id="booking-calendar" className="py-20 bg-background scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Schedule Your Consultation</h2>
            <p className="text-muted-foreground">Book directly with our executive search team - no phone tag required.</p>
          </div>
          <GHLCalendarEmbed 
            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            source="executive-search-page"
          />
        </div>
      </section>

      <CTASection 
        variant="employer"
        title="Ready to Find Your Next Executive Leader?"
        description="Connect with our executive search specialists to discuss your leadership needs and discover how we can deliver the transformational leader your organization requires."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
      />
    </PageLayout>
  );
};

export default ExecutiveSearch;