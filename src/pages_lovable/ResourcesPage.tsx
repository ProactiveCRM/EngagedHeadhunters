import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ResourcesHub from '@/components/ResourcesHub';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { } from 'next/navigation';
import Link from 'next/link';

const ResourcesPage = () => {
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
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary-foreground/90">Knowledge Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Resources to{' '}
                <span className="text-primary">Grow Your Business</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                Industry insights, training materials, templates, and community resources designed specifically for recruiting professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/alliance">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand w-full sm:w-auto">
                    Join The Alliance
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#resources">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    Explore Resources
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Hub */}
        <div id="resources">
          <ResourcesHub />
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready for Full Access?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Alliance members get unlimited access to all resources, plus exclusive content, live training, and direct mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/alliance">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand">
                  Join The Alliance
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/for-recruiters">
                <Button size="lg" variant="outline">
                  Compare Options
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

export default ResourcesPage;
