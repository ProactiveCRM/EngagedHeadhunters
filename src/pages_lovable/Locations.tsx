import { ArrowRight } from 'lucide-react';
import { } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { usePathnames, groupLocationsByRegion } from '@/hooks/useLocation';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceAreas = () => {
  const { data: locations, isLoading } = usePathnames();
  const regions = locations ? groupLocationsByRegion(locations) : [];

  const benefits = [
    {
      title: "Local Market Expertise",
      description: "Deep understanding of regional hiring trends, salary benchmarks, and industry dynamics.",
      emoji: "🎯"
    },
    {
      title: "Established Networks",
      description: "Strong relationships with local employers and professional talent pools in each market.",
      emoji: "👥"
    },
    {
      title: "Cultural Alignment",
      description: "Understanding of local business culture and what makes professionals successful in each region.",
      emoji: "⭐"
    },
    {
      title: "Rapid Response",
      description: "Local presence enables faster candidate identification and placement timelines.",
      emoji: "⏱️"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Nationwide Service Areas
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Local Headhunters<br />
              <span className="text-primary">Nationwide Coverage</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
              Premier recruiting agency serving 50+ major metropolitan areas across the United States.
              Local market expertise with national recruiting standards, delivering exceptional talent
              solutions wherever your business operates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Find Local Recruiter
                <ArrowRight className="ml-2" size={20} />
              </a>
              <Link
                href="/salary-guide"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Salary Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas by Region */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Markets We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              From major metropolitan areas to emerging markets, our local recruiting specialists
              understand the unique dynamics of each region and deliver tailored talent solutions.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gradient-to-br from-muted to-background rounded-2xl p-8">
                  <Skeleton className="h-8 w-32 mx-auto mb-8" />
                  <div className="grid lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-40" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {regions.map((region, regionIndex) => (
                <div key={regionIndex} className="bg-gradient-to-br from-muted to-background rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{region.name}</h3>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {region.cities.map((city, cityIndex) => (
                      <Link
                        key={cityIndex}
                        href={city.id === 'houston' ? '/houston' : `/location/${city.id}`}
                        className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">
                              {city.display_name.split(',')[0]}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Metro Population: {city.population || 'Growing'}
                            </p>
                          </div>
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                            <span className="text-xl" role="img" aria-hidden="true">📍</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-foreground mb-2">Key Industries:</h5>
                          <div className="flex flex-wrap gap-2">
                            {(city.industries || []).map((industry, idx) => (
                              <span key={idx} className="bg-muted text-primary px-3 py-1 rounded-full text-xs font-medium">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end items-center pt-4 border-t border-border">
                          <ArrowRight className="text-primary" size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Local Benefits */}
      <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Local Recruiting Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Local market knowledge combined with national recruiting standards delivers
              superior results for both employers and candidates.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl" role="img" aria-hidden="true">{benefit.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Connect with Local Recruiting Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Ready to find top talent in your market? Our local recruiting specialists are
              standing by to discuss your specific needs and market opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-muted to-background p-8 rounded-xl shadow-lg text-center">
              <span className="text-4xl block mb-4 mx-auto" role="img" aria-hidden="true">📞</span>
              <h3 className="text-xl font-bold text-foreground mb-3">Call Us Today</h3>
              <p className="text-muted-foreground mb-4">Speak directly with a recruiting specialist</p>
              <a href="tel:+17577207173" className="text-primary font-semibold hover:text-primary/80 transition-colors">(757) 720-7173</a>
            </div>

            <div className="bg-gradient-to-br from-muted to-background p-8 rounded-xl shadow-lg text-center">
              <span className="text-4xl block mb-4 mx-auto" role="img" aria-hidden="true">🌐</span>
              <h3 className="text-xl font-bold text-foreground mb-3">Online Request</h3>
              <p className="text-muted-foreground mb-4">Submit your hiring requirements</p>
              <a
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
              >
                Request Talent
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Find Your Local Recruiting Partner
          </h2>
          <p className="text-primary-foreground/80 text-xl mb-8 max-w-4xl mx-auto">
            Whether you need executive search, professional staffing, or specialized recruiting
            in your market, our local experts are ready to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Schedule Consultation
            </a>
            <Link
              href="/salary-guide"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              View Market Reports
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceAreas;
