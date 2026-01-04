import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Users, Building2, TrendingUp, Award, ArrowRight, Phone, Calendar, Briefcase, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePathname } from '@/hooks/useLocation';
import { SEOHead } from '@/components/seo/SEOHead';
import { Skeleton } from '@/components/ui/skeleton';

const LocationPage = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const router = useRouter();
  const { data: location, isLoading, error } = usePathname(locationSlug || '');

  useEffect(() => {
    if (!isLoading && (error || !location)) {
      router.replace('/locations');
    }
  }, [isLoading, error, location, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-28 md:pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return null;
  }

  const cityName = location.display_name.split(',')[0];
  const stateAbbr = location.display_name.split(',')[1]?.trim() || '';

  // Generate market insights based on industries
  const insights = [
    {
      title: `${cityName} Talent Market`,
      description: `With a metro population of ${location.population || 'growing'}, ${cityName} offers a diverse talent pool across ${location.industries?.slice(0, 2).join(' and ') || 'multiple industries'}.`,
      icon: Users,
    },
    {
      title: 'Industry Focus',
      description: `Our ${cityName} specialists focus on ${location.industries?.join(', ') || 'key industries'} recruiting, understanding local market dynamics.`,
      icon: Briefcase,
    },
    {
      title: 'Local Expertise',
      description: `Deep relationships with ${cityName} employers and understanding of regional salary benchmarks and hiring trends.`,
      icon: Target,
    },
  ];

  // Generate schema data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: `Engaged Headhunters - ${cityName}`,
    description: location.description || `Professional recruiting services in ${location.display_name}`,
    url: `https://www.engagedheadhunters.com/${location.id}`,
    telephone: '+1-757-720-7173',
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: stateAbbr,
      addressCountry: 'US',
    },
    ...(location.geo_lat && location.geo_lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.geo_lat,
        longitude: location.geo_lng,
      },
    }),
    areaServed: {
      '@type': 'City',
      name: cityName,
    },
    priceRange: '$$',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.engagedheadhunters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.engagedheadhunters.com/locations' },
      { '@type': 'ListItem', position: 3, name: cityName, item: `https://www.engagedheadhunters.com/${location.id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${cityName} Recruiters & Headhunters | Engaged Headhunters`}
        description={location.description || `Professional recruiting and headhunting services in ${location.display_name}. Local expertise in ${location.industries?.join(', ') || 'key industries'}.`}
        canonical={`/${location.id}`}
        type="website"
        keywords={`${cityName} recruiters, ${cityName} headhunters, ${location.industries?.join(' jobs, ') || ''}, ${stateAbbr} staffing agency`}
      >
        {location.geo_lat && location.geo_lng && (
          <>
            <meta name="geo.position" content={`${location.geo_lat};${location.geo_lng}`} />
            <meta name="geo.placename" content={cityName} />
            <meta name="geo.region" content={`US-${stateAbbr}`} />
          </>
        )}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </SEOHead>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <MapPin size={16} />
                {location.region}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              {cityName} Recruiters &<br />
              <span className="text-primary">Headhunters</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              {location.description || `Connect with top employers and opportunities in ${location.display_name}. Our local recruiting experts understand the ${cityName} market.`}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {location.population && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{location.population}</div>
                  <div className="text-sm text-muted-foreground">Metro Population</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{location.industries?.length || 0}+</div>
                <div className="text-sm text-muted-foreground">Key Industries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary capitalize">{location.market_type || 'Growing'}</div>
                <div className="text-sm text-muted-foreground">Market Status</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Request {cityName} Talent
                <ArrowRight className="ml-2" size={20} />
              </a>
              <Link
                href="/book/career"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Find {cityName} Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      {location.industries && location.industries.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {cityName} Industry Expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our {cityName} recruiting specialists focus on the industries driving the local economy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {location.industries.map((industry, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-muted to-background rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{industry}</h3>
                  <p className="text-muted-foreground">
                    Expert recruiting for {industry.toLowerCase()} positions in the {cityName} metro area.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Market Insights */}
      <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {cityName} Market Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leverage our deep understanding of the {cityName} employment landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <insight.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{insight.title}</h3>
                <p className="text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your {cityName} Recruiting Partner
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine national recruiting standards with deep local market knowledge to deliver exceptional results in {cityName}.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Award className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-foreground">Local salary benchmarking and market intelligence</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-foreground">Established relationships with {cityName} employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-foreground">Understanding of local hiring trends and culture</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-foreground">Targeted candidate sourcing in {cityName} talent pools</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Ready to Connect?</h3>
              <div className="space-y-4">
                <a
                  href="tel:+17577207173"
                  className="flex items-center gap-3 bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Phone className="text-primary" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">Call Us</div>
                    <div className="text-muted-foreground">(757) 720-7173</div>
                  </div>
                </a>
                <a
                  href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">Schedule Consultation</div>
                    <div className="text-muted-foreground">Book a time that works for you</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your {cityName} Search Today
          </h2>
          <p className="text-primary-foreground/80 text-xl mb-8 max-w-4xl mx-auto">
            Whether you're hiring in {cityName} or looking for your next opportunity, our local experts are ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              I'm Hiring in {cityName}
            </a>
            <Link
              href="/book/career"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              I'm Looking for Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
