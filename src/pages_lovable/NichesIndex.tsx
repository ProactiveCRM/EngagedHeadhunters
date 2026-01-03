import { Heart, Code, DollarSign, Users, Building2, Factory, Zap } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StickyCTA from '../components/StickyCTA';
import CTASection from '../components/CTASection';

const NichesIndex = () => {
  const niches = [
    {
      icon: Heart,
      title: "Healthcare",
      slug: "healthcare",
      description: "Hospital administration, pharmaceutical leadership, and medical device executives who advance patient care and organizational excellence.",
      placements: "5,000+",
      avgSalary: "$350K",
      specialties: ["Hospital Administration", "Pharmaceutical", "Medical Devices", "Healthcare IT", "Clinical Research"],
      topAgents: 12
    },
    {
      icon: Code,
      title: "Technology",
      slug: "technology",
      description: "Software engineering leaders, product visionaries, and cybersecurity experts driving digital transformation across industries.",
      placements: "7,500+",
      avgSalary: "$425K",
      specialties: ["Software Engineering", "Product Leadership", "AI/ML", "Cybersecurity", "Cloud Architecture"],
      topAgents: 15
    },
    {
      icon: DollarSign,
      title: "Finance",
      slug: "finance",
      description: "Investment banking, private equity, and fintech executives who optimize financial performance and drive growth.",
      placements: "4,200+",
      avgSalary: "$500K",
      specialties: ["Investment Banking", "Private Equity", "FinTech", "Risk Management", "Wealth Management"],
      topAgents: 9
    },
    {
      icon: Users,
      title: "Senior Care",
      slug: "senior-care",
      description: "Senior living, assisted care, and elder services leaders who improve quality of life for aging populations.",
      placements: "2,800+",
      avgSalary: "$295K",
      specialties: ["Senior Living", "Assisted Care", "Memory Care", "Home Healthcare", "Elder Services"],
      topAgents: 8
    },
    {
      icon: Building2,
      title: "Professional Services",
      slug: "professional-services",
      description: "Consulting, legal, and advisory firm partners who drive growth and deliver exceptional client value.",
      placements: "3,100+",
      avgSalary: "$375K",
      specialties: ["Management Consulting", "Legal", "Accounting", "Advisory Services", "Business Development"],
      topAgents: 10
    },
    {
      icon: Factory,
      title: "Manufacturing",
      slug: "manufacturing",
      description: "Industrial leaders who optimize operations, drive innovation, and build world-class manufacturing organizations.",
      placements: "2,600+",
      avgSalary: "$325K",
      specialties: ["Operations Management", "Supply Chain", "Quality Assurance", "Lean Manufacturing", "Engineering"],
      topAgents: 7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Industry Expertise That Delivers Results
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto">
              Deep specialization in the industries that matter most. Our recruiters don't just understand your business—they live it. 
              Each niche combines decades of experience with cutting-edge AI technology to deliver exceptional placement results.
            </p>
          </div>
        </div>
      </section>

      {/* Niches Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {niches.map((niche, index) => (
              <Link 
                key={index}
                href={`/niches/${niche.slug}`}
                className="group bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border"
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <niche.icon className="text-primary" size={40} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {niche.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{niche.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-lg font-bold text-primary">{niche.placements}</div>
                        <div className="text-sm text-muted-foreground">Placements</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">{niche.avgSalary}</div>
                        <div className="text-sm text-muted-foreground">Avg. Salary</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {niche.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="bg-muted px-2 py-1 rounded text-xs">
                            {specialty}
                          </span>
                        ))}
                        {niche.specialties.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{niche.specialties.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {niche.topAgents} specialized agents
                      </div>
                      <div className="text-primary font-semibold group-hover:underline">
                        Explore {niche.title} →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        variant="hybrid"
        title="Don't See Your Industry?"
        description="Our network spans every major industry. From emerging sectors to traditional businesses, we have the expertise and connections to find your next executive leader or help you advance your career."
        showJobsLink={true}
      />

      <Footer />
    </div>
  );
};

export default NichesIndex;