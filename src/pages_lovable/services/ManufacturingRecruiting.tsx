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

const ManufacturingRecruiting = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Manufacturing Recruiting & Industrial Operations Hiring"
        description="Expert manufacturing recruiting services for operations leaders, plant managers, and industrial professionals. We deliver talent that optimizes processes and drives innovation."
        canonical="/manufacturing-recruiting"
        type="service"
        keywords="manufacturing recruiting, industrial staffing, operations management jobs, plant manager recruitment"
      />
      <ServiceSchema
        name="Manufacturing Recruiting & Industrial Operations Hiring"
        description="Expert manufacturing recruiting services for operations leaders, plant managers, and industrial professionals who optimize processes and drive innovation."
        url="https://www.engagedheadhunters.com/manufacturing-recruiting"
        serviceType="Manufacturing Recruiting"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
        { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
        { name: 'Manufacturing Recruiting', url: 'https://www.engagedheadhunters.com/manufacturing-recruiting' }
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
              Manufacturing Recruiting &<br />
              <span className="text-primary">Industrial Operations Hiring</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Operations leaders who optimize processes and drive innovation. Our manufacturing recruiting specialists understand industrial operations and deliver the professionals who build world-class organizations.
            </p>
            <ul className="grid md:grid-cols-4 gap-8 mb-12 list-none">
              <li className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Proven</div>
                <div className="text-muted-foreground">Manufacturing Expertise</div>
              </li>
              <li className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Fast</div>
                <div className="text-muted-foreground">Time to Fill</div>
              </li>
              <li className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Deep</div>
                <div className="text-muted-foreground">Industry Networks</div>
              </li>
              <li className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Placement</div>
                <div className="text-muted-foreground">Guarantee</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Schedule Consultation Section */}
      <section id="booking-calendar" className="py-20 bg-background scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Schedule Your Consultation</h2>
            <p className="text-muted-foreground">Book directly with our manufacturing recruiting team - no phone tag required.</p>
          </div>
          <GHLCalendarEmbed 
            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            source="manufacturing-recruiting-page"
          />
        </div>
      </section>

      <CTASection 
        variant="employer"
        title="Ready to Optimize Your Manufacturing Operations?"
        description="Connect with our manufacturing recruiting specialists to discuss your operations needs and discover how we can deliver the manufacturing professionals your organization requires."
        bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
      />
      <Footer />
    </div>
  );
};

export default ManufacturingRecruiting;