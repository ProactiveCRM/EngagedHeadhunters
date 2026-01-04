import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import PartnerServices from '@/components/PartnerServices';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Handshake } from 'lucide-react';
import { } from 'next/navigation';
import Link from 'next/link';

const PartnersPage = () => {
  return (
    <>
      <Navigation />
      <StickyCTA />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-dark-navy via-dark-navy to-primary/20 text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_40%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
                <Handshake className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary-foreground/90">Partner Network</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional Services{' '}
                <span className="text-primary">& Partners</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                Vetted service providers offering exclusive discounts to help you run a more efficient and profitable recruiting business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#partners">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand w-full sm:w-auto">
                    Explore Partners
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link href="/alliance">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    Join The Alliance
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Services */}
        <div id="partners">
          <PartnerServices />
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Become a Partner
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Offer your services to our network of elite recruiters and gain access to pre-qualified leads looking for exactly what you provide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand">
                  Apply to Be a Partner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/for-recruiters">
                <Button size="lg" variant="outline">
                  Learn About The Alliance
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

export default PartnersPage;
