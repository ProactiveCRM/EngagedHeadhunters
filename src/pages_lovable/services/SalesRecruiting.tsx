import { ArrowRight } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTASection from '../../components/CTASection';
import GHLCalendarEmbed from '../../components/GHLCalendarEmbed';
import StickyCTA from '../../components/StickyCTA';
import SEOHead from '../../components/seo/SEOHead';
import ServiceSchema from '../../components/seo/ServiceSchema';
import BreadcrumbSchema from '../../components/seo/BreadcrumbSchema';

const SalesRecruiting = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Sales Recruiting & Business Development Hiring"
        description="Revenue-driving sales professionals and business development leaders. Our sales recruiting specialists deliver results-oriented professionals who accelerate growth."
        canonical="/sales-recruiting"
        type="service"
        keywords="sales recruiting, business development hiring, sales headhunters, account executive recruiting, sales director search"
      />
      <ServiceSchema
        name="Sales Recruiting & Business Development Hiring"
        description="Revenue-driving sales professionals and business development leaders who accelerate growth and exceed targets."
        url="https://www.engagedheadhunters.com/sales-recruiting"
        serviceType="Sales Recruiting"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
        { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
        { name: 'Sales Recruiting', url: 'https://www.engagedheadhunters.com/sales-recruiting' }
      ]} />
      <Navigation />
      <StickyCTA />
      <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Link href="/services" className="text-primary hover:text-primary/80 font-medium mb-6 inline-block">
              ← Back to Services
            </Link>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Sales Recruiting &<br />
              <span className="text-primary">Business Development Hiring</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Revenue-driving sales professionals and business development leaders. Our sales recruiting specialists deliver the results-oriented professionals who accelerate growth and exceed targets.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Link 
                href="/sales-careers"
                className="text-primary hover:text-primary/80 font-medium underline"
              >
                View Sales Opportunities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Consultation Section */}
      <section id="booking-calendar" className="py-20 bg-background scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Schedule Your Consultation</h2>
            <p className="text-muted-foreground">Book directly with our sales recruiting team - no phone tag required.</p>
          </div>
          <GHLCalendarEmbed 
            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            source="sales-recruiting-page"
          />
        </div>
      </section>

      <CTASection 
        variant="employer"
        title="Ready to Build Your Sales Team?"
        description="Connect with our sales recruiting specialists to discuss your revenue growth needs and discover how we can deliver the sales professionals your organization requires."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
      />
      <Footer />
    </div>
  );
};

export default SalesRecruiting;