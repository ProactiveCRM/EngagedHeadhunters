import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AgentAllianceComparison from '@/components/AgentAllianceComparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Handshake
} from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';

const ForRecruiters = () => {
  const metrics = [
    { value: '2-4', label: 'Extra Placements', detail: 'per month' },
    { value: '40%', label: 'Better Response', detail: 'rates' },
    { value: '50%', label: 'Faster Fill', detail: 'time' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Sourcing',
      description: 'Intelligent algorithms identify and engage passive candidates who match your exact requirements.',
    },
    {
      icon: MessageSquare,
      title: 'Automated Outreach',
      description: 'Personalized messaging sequences that get responses, not ignored like generic templates.',
    },
    {
      icon: Target,
      title: 'Precision Matching',
      description: 'Our technology finds candidates with the exact skills, experience, and culture fit you need.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights into your pipeline, response rates, and placement metrics.',
    },
    {
      icon: Users,
      title: 'Talent Pool Access',
      description: 'Tap into our network of pre-vetted professionals across healthcare, tech, finance, and more.',
    },
    {
      icon: Clock,
      title: 'Time Savings',
      description: 'Spend less time sourcing and more time closing. Our tools handle the heavy lifting.',
    },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Build Your Brand',
      description: 'Position yourself as a trusted advisor, not just another recruiter sending InMails.',
    },
    {
      step: '02',
      title: 'Attract Talent',
      description: 'Let candidates come to you through compelling content and strategic positioning.',
    },
    {
      step: '03',
      title: 'Nurture Relationships',
      description: 'Build long-term connections that convert into placements when timing is right.',
    },
    {
      step: '04',
      title: 'Close with Confidence',
      description: 'Convert warm relationships into placements without the hard sell.',
    },
  ];

  const beforeAfter = [
    { before: 'Cold outreach with 2% response', after: '40% response rates with warm leads' },
    { before: 'Hours spent manual sourcing', after: 'AI identifies candidates in minutes' },
    { before: 'Inconsistent monthly placements', after: '2-4 extra placements per month' },
    { before: 'Competing on the same job boards', after: 'Access to exclusive passive talent' },
  ];

  return (
    <>
      <Helmet>
        <title>Partner With Us: EH Agent or Alliance Member | Engaged Headhunters</title>
        <meta name="description" content="Join as an EH Agent or Alliance Member. We book qualified appointments on your calendar. AI-powered sourcing, 2-4 extra placements per month, 40% better response rates." />
        <meta name="keywords" content="recruiting partnership, recruiter franchise, staffing alliance, AI recruiting tools, recruiter methodology, increase placements, recruiting automation, headhunter tools" />
        <link rel="canonical" href="https://www.engagedheadhunters.com/for-recruiters" />
        <meta property="og:title" content="Partner With Us: EH Agent or Alliance Member | Engaged Headhunters" />
        <meta property="og:description" content="Two paths to grow your recruiting business. Whether you build under our brand or keep your own, we book qualified appointments on your calendar." />
        <meta property="og:url" content="https://www.engagedheadhunters.com/for-recruiters" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-dark-navy via-dark-navy to-primary/20 text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_40%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary-foreground/90">For Recruiting Professionals</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Two Paths to{' '}
                <span className="text-primary">Grow Your Business</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto">
                Join as an EH Agent or Alliance Member. Either way, we book qualified appointments directly on your calendar.
              </p>
              
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Build under our established brand or keep your own—same powerful support, same results.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-10">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">{metric.value}</div>
                    <div className="text-sm md:text-base font-semibold text-white">{metric.label}</div>
                    <div className="text-xs md:text-sm text-white/60">{metric.detail}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#compare">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand w-full sm:w-auto">
                    Compare Your Options
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="#methodology">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    Learn Our Methodology
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Two Paths Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Path
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Two ways to partner with us—both deliver the same powerful support and results.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* EH Agent Path */}
              <Card className="relative bg-background border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Become an EH Agent</h3>
                  <p className="text-muted-foreground mb-6">
                    Build your recruiting business under the Engaged Headhunters brand. Leverage our reputation, marketing, and existing client relationships.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Established brand recognition</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Full marketing & lead generation</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Access to existing clients</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>We book appointments for you</span>
                    </li>
                  </ul>
                  <a 
                    href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Learn About EH Agent
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Alliance Member Path */}
              <Card className="relative bg-background border-2 border-accent/30 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/60" />
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Handshake className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Join the Alliance</h3>
                  <p className="text-muted-foreground mb-6">
                    Keep your own brand and business identity. Get the same powerful support and resources as EH Agents while maintaining your independence.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>100% your brand & identity</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Full business ownership</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Your clients + our job orders</span>
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>We book appointments for you</span>
                    </li>
                  </ul>
                  <a 
                    href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Learn About Alliance
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="compare" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compare Your Options
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See exactly what you get with each path—and what's included in both.
              </p>
            </div>

            <AgentAllianceComparison showCTAs={true} />
          </div>
        </section>

        {/* Build Don't Beg Methodology */}
        <section id="methodology" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Build Don't Beg Methodology
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform from a transactional recruiter into a trusted talent advisor. 
                Build relationships that generate placements on autopilot.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologySteps.map((step, index) => (
                <Card key={index} className="relative bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                AI-Powered Tools for All Partners
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Whether you're an EH Agent or Alliance Member, you get access to our full technology stack.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transform Your Results
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what's possible when you partner with us—regardless of which path you choose.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {beforeAfter.map((item, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive font-bold">✗</span>
                    </div>
                    <span className="text-foreground">{item.before}</span>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-dark-navy to-primary/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Recruiting Business?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a discovery call to learn which path is right for you. We'll show you exactly how we book qualified appointments on your calendar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand w-full sm:w-auto">
                  Schedule Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ForRecruiters;
