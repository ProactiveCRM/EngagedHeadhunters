import { Button } from '@/components/ui/button';
import {   } from 'next/navigation';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      emoji: "🔍",
      title: "Executive Search",
      description: "C-suite and senior leadership placement for roles that define your company's direction. We reach leaders who aren't on the market—the ones who would move for the right opportunity but aren't advertising it.",
      features: ["C-Suite & VP-level positions", "Confidential talent mapping", "Competitor intelligence", "Leadership assessment"],
      link: "/executive-search"
    },
    {
      emoji: "👥",
      title: "Direct Placement",
      description: "Fill critical roles fast with candidates pre-screened for skills AND culture fit. No more wasted interviews with candidates who look qualified on paper but can't perform.",
      features: ["Skills verification", "Culture alignment", "Reference validation", "Compensation benchmarking"],
      link: "/services"
    },
    {
      emoji: "⏱️",
      title: "Contract & Interim Staffing",
      description: "Skilled professionals on your team this week. Perfect for projects, coverage, or evaluating fit before a permanent offer.",
      features: ["Rapid deployment", "Flexible engagement terms", "Contract-to-hire options", "Compliance managed"],
      link: "/contract-staffing"
    }
  ];

  const painPoints = [
    {
      emoji: "🎯",
      problem: "Competitors are recruiting your future hires",
      solution: "We reach passive candidates before they hit the open market"
    },
    {
      emoji: "💼",
      problem: "Every empty seat costs you $500/day",
      solution: "Our process delivers qualified candidates in days, not months"
    },
    {
      emoji: "🏢",
      problem: "One wrong hire sets your team back a year",
      solution: "Our screening filters talkers from producers"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Three Ways to Solve Your Talent Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every candidate we present has been vetted, verified, and confirmed interested. No resume dumps. No wasted interviews.
          </p>
        </div>

        {/* Pain Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border-2 border-destructive/40">
              <div className="flex items-start gap-4">
                <div className="bg-destructive/15 p-2 rounded-lg shrink-0">
                  <span className="text-xl" role="img" aria-hidden="true">{point.emoji}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">{point.problem}</p>
                  <p className="text-sm text-primary font-medium">{point.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border group">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl" role="img" aria-hidden="true">{service.emoji}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button asChild variant="outline" className="w-full">
                <Link href={service.link}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/contact">Talk to a Search Consultant</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;