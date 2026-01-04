import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BookingTrustBadges from './BookingTrustBadges';

interface BookingPageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  heroTitle: string;
  heroSubtitle: string;
  children: ReactNode;
  showTrustBadges?: boolean;
}

const BookingPageLayout = ({
  title,
  metaTitle,
  metaDescription,
  canonicalPath,
  heroTitle,
  heroSubtitle,
  children,
  showTrustBadges = true,
}: BookingPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <StickyCTA />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted to-background py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>

        {/* Trust Badges */}
        {showTrustBadges && (
          <section className="py-8 md:py-12 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <BookingTrustBadges />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingPageLayout;
