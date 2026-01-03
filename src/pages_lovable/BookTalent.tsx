import BookingPageLayout from '@/components/booking/BookingPageLayout';
import WhatToExpect from '@/components/booking/WhatToExpect';
import BookingChatAssistant from '@/components/booking/BookingChatAssistant';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import { Building2, CheckCircle, Clock, Users } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
const EMPLOYER_BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb';

const features = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Fast Response',
    description: 'Candidates presented within 48-72 hours',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Pre-Screened Talent',
    description: 'Only qualified, interested candidates',
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: 'Replacement Guarantee',
    description: 'Peace of mind on every placement',
  },
];

const BookTalent = () => {
  return (
    <BookingPageLayout
      title="Request Talent"
      metaTitle="Request Talent - Schedule a Hiring Consultation | Engaged Headhunters"
      metaDescription="Book a consultation to discuss your hiring needs. Our recruiters specialize in executive search, healthcare, technology, and finance staffing."
      canonicalPath="/book/talent"
      heroTitle="Request Top Talent"
      heroSubtitle="Book a strategy call to discuss your hiring needs with an industry specialist"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <WhatToExpect variant="employer" defaultOpen={true} />
          
          <GHLCalendarEmbed
            bookingUrl={EMPLOYER_BOOKING_URL}
            source="book-talent-page"
            title="Schedule Hiring Consultation"
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Why Choose Us */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">
                Why Engaged Headhunters?
              </h2>
            </div>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex-shrink-0 p-1.5 rounded-md bg-muted text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Assistant */}
          <BookingChatAssistant 
            context="employer"
            defaultExpanded={false}
          />

          {/* Industries */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-3">
              Industries We Serve
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Executive', 'Sales'].map((industry) => (
                <span
                  key={industry}
                  className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* Prefer to Talk? */}
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
            <p className="text-sm text-foreground mb-3">
              Prefer to talk now?
            </p>
            <a
              href="tel:+17577207173"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Call (757) 720-7173
            </a>
          </div>

          {/* Looking for work? */}
          <div className="text-center text-sm text-muted-foreground">
            Looking for a job instead?{' '}
            <Link href="/book/career" className="text-primary hover:underline">
              Book as a candidate
            </Link>
          </div>
        </aside>
      </div>
    </BookingPageLayout>
  );
};

export default BookTalent;
