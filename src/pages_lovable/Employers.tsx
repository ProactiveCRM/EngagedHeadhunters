import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import StickyCTA from '../components/StickyCTA';
import FAQSchema from '../components/seo/FAQSchema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Employers = () => {
  const { trackCTAClick } = useAnalytics();
  const painPoints = [
    {
      emoji: "⚠️",
      problem: "Open roles bleeding money",
      description: "Every day that position sits empty costs you productivity, burns out your team, and lets competitors pull ahead."
    },
    {
      emoji: "⚠️",
      problem: "Unqualified applicants flooding inbox",
      description: "You're drowning in resumes from people who can't do the job. Hours wasted on interviews that go nowhere."
    },
    {
      emoji: "⚠️",
      problem: "Top candidates accepting other offers",
      description: "High-caliber talent has options. By the time you decide, they've already moved on."
    }
  ];

  const solutions = [
    {
      emoji: "🎯",
      title: "We Reach Passive Talent",
      description: "The best executives aren't on job boards. They're producing results elsewhere. We contact them directly and make the case for your opportunity."
    },
    {
      emoji: "⏱️",
      title: "Candidates in Days",
      description: "Our search consultants start immediately. Qualified, interested candidates on your desk within days—not the weeks or months you're used to."
    },
    {
      emoji: "🔒",
      title: "Confidential When Needed",
      description: "Replacing someone sensitive? We handle discreet searches. Your competitors won't know, your team won't panic."
    },
    {
      emoji: "👥",
      title: "Sector-Focused Specialists",
      description: "Our recruiters come from the industries they serve. They know the players, understand the roles, and spot talent—and pretenders—immediately."
    },
    {
      emoji: "🛡️",
      title: "Replacement Guarantee",
      description: "We stand behind every placement. If someone doesn't work out within the guarantee period, we replace them. No additional fee."
    },
    {
      emoji: "📈",
      title: "Built for Outcomes",
      description: "We're not filling a quota. We want you to hire the right person and come back next time you need someone exceptional."
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery Call",
      description: "We learn your business, culture, and what success looks like in this role. No generic intake forms."
    },
    {
      step: "2",
      title: "Targeted Outreach",
      description: "We identify and pursue specific candidates who match—active job seekers AND passive talent."
    },
    {
      step: "3",
      title: "Vetted Shortlist",
      description: "You receive a curated list of pre-screened, interested candidates. No resume dumps."
    },
    {
      step: "4",
      title: "Interview Coordination",
      description: "We manage schedules, prep candidates, and keep momentum so top talent doesn't slip away."
    },
    {
      step: "5",
      title: "Offer & Close",
      description: "We navigate compensation discussions and close the deal. Not done until they've accepted."
    }
  ];

  const faqs = [
    {
      question: "How quickly can you find qualified candidates?",
      answer: "We typically present qualified, interested candidates within 5-7 business days. Our direct outreach approach means we're not waiting for applications—we start contacting potential candidates the same day you engage us."
    },
    {
      question: "What industries do your recruiters specialize in?",
      answer: "Our search consultants focus on healthcare leadership, technology and software, finance and accounting, and manufacturing operations. Each recruiter comes from the industry they serve, giving them insider knowledge of who's available and who performs."
    },
    {
      question: "What's included in your placement guarantee?",
      answer: "If a placed candidate doesn't work out within the guarantee period, we replace them at no additional fee. Guarantee terms are negotiated per engagement based on role seniority and complexity."
    },
    {
      question: "How is your approach different from job boards?",
      answer: "Job boards attract active job seekers. We reach passive talent—high performers who aren't looking but would consider the right opportunity. This gives you access to candidates your competitors never see."
    },
    {
      question: "Do you handle confidential executive searches?",
      answer: "Yes. We regularly conduct discreet searches for sensitive replacements. Candidates are vetted before learning the company identity, and all communications are handled through secure channels."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen bg-background">
        <Navigation />
        <StickyCTA />

        {/* Hero Section - Enhanced */}
        <section className="pt-24 pb-20 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-background to-muted/30" />

          {/* Animated Decorations */}
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-destructive/10 rounded-full blur-[100px] animate-blob opacity-40" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-blob opacity-30" style={{ animationDelay: '-5s' }} />

          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20 mb-6 animate-fade-in">
                <span className="text-sm animate-pulse" role="img" aria-hidden="true">✨</span>
                <span className="text-sm font-semibold text-destructive">For Hiring Decision-Makers</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 animate-fade-in leading-tight" style={{ animationDelay: '100ms' }}>
                Empty Roles Cost $500/Day.{' '}
                <span className="bg-gradient-to-r from-destructive via-destructive/80 to-destructive bg-clip-text text-transparent">
                  Let's Stop the Bleeding.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: '200ms' }}>
                Every week that critical position sits vacant, you're losing productivity, burning out your team, and watching competitors recruit the talent you need. We deliver qualified candidates in days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 shadow-brand hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                  onClick={() => trackCTAClick('Request Talent', 'booking')}
                >
                  <a href="https://crm.engagedheadhunters.com/widget/bookings/request-talent" target="_blank" rel="noopener noreferrer">
                    Request Talent
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 hover:bg-primary/5 backdrop-blur-sm"
                  onClick={() => trackCTAClick('See How We Work', '/services')}
                >
                  <Link href="/services">See How We Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 bg-destructive/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              Sound Familiar?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-destructive/20">
                  <span className="text-3xl mb-4 block" role="img" aria-hidden="true">{point.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground mb-2">{point.problem}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How We Solve It
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're not another staffing agency that throws resumes at you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl" role="img" aria-hidden="true">{solution.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Search Process
              </h2>
              <p className="text-xl text-muted-foreground">
                From kickoff to offer accepted.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-card rounded-xl p-6 border h-full">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">✅</span>
                <p className="font-medium text-foreground">Replacement Guarantee</p>
                <p className="text-sm text-muted-foreground">On every engagement</p>
              </div>
              <div>
                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">👥</span>
                <p className="font-medium text-foreground">Sector Specialists</p>
                <p className="text-sm text-muted-foreground">Not generalists</p>
              </div>
              <div>
                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">⏱️</span>
                <p className="font-medium text-foreground">Fast Delivery</p>
                <p className="text-sm text-muted-foreground">Days, not months</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          variant="employer"
          title="Ready to Fill That Role?"
          description="Your next great hire is out there. Let's go find them before your competitors do."
        />

        <Footer />
      </div>
    </>
  );
};

export default Employers;
