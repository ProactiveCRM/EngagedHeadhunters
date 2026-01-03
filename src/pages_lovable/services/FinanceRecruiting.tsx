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

const FinanceRecruiting = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Finance Recruiting & Financial Services Hiring"
        description="Expert finance recruiting services for investment banking, wealth management, and financial leadership roles. We deliver financial professionals who drive growth and manage risk."
        canonical="/finance-recruiting"
        type="service"
        keywords="finance recruiting, financial services staffing, CFO search, investment banking recruitment"
      />
      <ServiceSchema
        name="Finance Recruiting & Financial Services Hiring"
        description="Expert finance recruiting services for investment banking, wealth management, CFO search, and financial leadership roles."
        url="https://www.engagedheadhunters.com/finance-recruiting"
        serviceType="Finance Recruiting"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
        { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
        { name: 'Finance Recruiting', url: 'https://www.engagedheadhunters.com/finance-recruiting' }
      ]} />
      
      <Navigation />
      <StickyCTA />
      
      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Link href="/services" className="text-primary hover:text-primary/80 font-medium mb-6 inline-block">
              ← Back to Services
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Finance Recruiting &<br />
              <span className="text-primary">Financial Services Hiring</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Investment banking to wealth management across financial services. Our finance recruiting specialists deliver the financial leaders who drive growth, manage risk, and ensure fiscal responsibility.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Link 
                href="/salary-guide"
                className="text-primary hover:text-primary/80 font-medium underline"
              >
                View Finance Salary Guide →
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
            <p className="text-muted-foreground">Book directly with our finance recruiting team - no phone tag required.</p>
          </div>
          <GHLCalendarEmbed 
            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            source="finance-recruiting-page"
          />
        </div>
      </section>

      <CTASection 
        variant="employer"
        title="Ready to Strengthen Your Finance Team?"
        description="Connect with our finance recruiting specialists to discuss your financial leadership needs and discover how we can deliver the finance professionals your organization requires."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
      />
      <Footer />
    </div>
  );
};

export default FinanceRecruiting;