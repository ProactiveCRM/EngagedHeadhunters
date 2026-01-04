import { MapPin, Building2, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import ServiceAreasMap from '../components/ServiceAreasMap';

const JobLocations = () => {
  const primaryMarkets = [
    {
      name: 'Houston, TX',
      description: 'Energy capital with strong healthcare and technology sectors',
      industries: ['Energy & Oil/Gas', 'Healthcare', 'Technology', 'Manufacturing'],
      link: '/houston'
    },
    {
      name: 'Dallas-Fort Worth, TX',
      description: 'Major corporate headquarters hub with diverse industries',
      industries: ['Finance', 'Technology', 'Healthcare', 'Telecommunications'],
      link: '/service-areas'
    },
    {
      name: 'Austin, TX',
      description: 'Fast-growing technology and innovation center',
      industries: ['Technology', 'Software', 'Healthcare', 'Finance'],
      link: '/service-areas'
    },
    {
      name: 'San Antonio, TX',
      description: 'Growing market with healthcare and military presence',
      industries: ['Healthcare', 'Cybersecurity', 'Manufacturing', 'Government'],
      link: '/service-areas'
    }
  ];

  const nationalMarkets = [
    {
      region: 'Northeast',
      cities: ['New York, NY', 'Boston, MA', 'Philadelphia, PA', 'Washington, DC'],
      strengths: 'Finance, Healthcare, Technology, Professional Services'
    },
    {
      region: 'West Coast',
      cities: ['San Francisco, CA', 'Los Angeles, CA', 'Seattle, WA', 'San Diego, CA'],
      strengths: 'Technology, Entertainment, Healthcare, Manufacturing'
    },
    {
      region: 'Midwest',
      cities: ['Chicago, IL', 'Detroit, MI', 'Minneapolis, MN', 'Cleveland, OH'],
      strengths: 'Manufacturing, Finance, Healthcare, Logistics'
    },
    {
      region: 'Southeast',
      cities: ['Atlanta, GA', 'Miami, FL', 'Charlotte, NC', 'Nashville, TN'],
      strengths: 'Healthcare, Finance, Technology, Logistics'
    }
  ];

  const remoteOpportunities = [
    'Technology & Software Development',
    'Sales & Business Development',
    'Marketing & Creative',
    'Customer Success & Support',
    'Finance & Accounting',
    'Human Resources'
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Nationwide Coverage
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Find Opportunities
              <span className="text-primary"> by Location</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We place professionals across the United States, with deep expertise in Texas markets
              and strong networks in major metropolitan areas nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://jobs.engagedheadhunters.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Browse All Positions
                <ArrowRight className="ml-2" size={20} />
              </a>
              <Link
                href="/contact"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Service Areas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any marker to learn more about opportunities in that region.
            </p>
          </div>
          <ServiceAreasMap />
        </div>
      </section>

      {/* Primary Texas Markets */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Texas Markets - Our Home Base
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Headquartered in Texas, we have deep roots and strong relationships
              across the state's major metropolitan areas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {primaryMarkets.map((market, index) => (
              <Link
                key={index}
                href={market.link}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{market.name}</h3>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                </div>

                <p className="text-muted-foreground mb-6">{market.description}</p>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Industries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {market.industries.map((industry, idx) => (
                      <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* National Markets */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Nationwide Reach
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our network extends across the United States, connecting talent
              with opportunities in every major market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nationalMarkets.map((region, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-lg border">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Building2 className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{region.region}</h3>
                </div>

                <div className="space-y-2 mb-4">
                  {region.cities.map((city, idx) => (
                    <div key={idx} className="flex items-center text-muted-foreground">
                      <MapPin size={14} className="mr-2 text-primary" />
                      <span className="text-sm">{city}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Industry Strengths:</span> {region.strengths}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remote Opportunities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Remote & Hybrid Opportunities
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Location doesn't have to limit your career. We place professionals in fully
                remote and hybrid positions with companies nationwide.
              </p>

              <div className="space-y-3 mb-8">
                {remoteOpportunities.map((opportunity, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="text-primary mr-3 flex-shrink-0" size={20} />
                    <span className="text-foreground">{opportunity}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/remote-careers"
                className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore Remote Jobs
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>

            <div className="bg-card rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Don't See Your Area?</h3>
              <p className="text-muted-foreground mb-6">
                We work with companies across the country and can often help regardless of your location.
                Contact us to discuss your career goals and see how we can help.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-foreground">National Network</h4>
                    <p className="text-sm text-muted-foreground">Relationships with employers in every state</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2 className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-foreground">Relocation Support</h4>
                    <p className="text-sm text-muted-foreground">Many positions include relocation assistance</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  Contact Us About Your Location
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="candidate"
        title="Ready to Find Your Next Opportunity?"
        description="Whether you're looking locally or open to relocation, we can help you find the right fit."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
        showJobsLink={true}
      />

      <Footer />
    </div>
  );
};

export default JobLocations;
