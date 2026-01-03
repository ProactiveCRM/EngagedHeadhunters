import BookingPageLayout from '@/components/booking/BookingPageLayout';
import WhatToExpect from '@/components/booking/WhatToExpect';
import BookingChatAssistant from '@/components/booking/BookingChatAssistant';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import { Briefcase, Lock, Star, TrendingUp } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
const CANDIDATE_BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb';

const benefits = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: '100% Confidential',
    description: 'Your job search stays private',
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: 'Exclusive Opportunities',
    description: 'Access roles not posted publicly',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: 'Career Guidance',
    description: 'Market insights and advice',
  },
];

const BookCareer = () => {
  return (
    <BookingPageLayout
      title="Career Consultation"
      metaTitle="Career Consultation - Confidential Job Search Help | Engaged Headhunters"
      metaDescription="Book a confidential career consultation. Get personalized advice, access exclusive job opportunities, and take the next step in your career."
      canonicalPath="/book/career"
      heroTitle="Confidential Career Consultation"
      heroSubtitle="Explore opportunities and get expert career guidance — completely free and confidential"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Confidentiality Banner */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Lock className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              <strong>Your privacy matters.</strong> This consultation is completely confidential. 
              We never share your information with your current employer.
            </p>
          </div>

          <WhatToExpect variant="candidate" defaultOpen={true} />
          
          <GHLCalendarEmbed
            bookingUrl={CANDIDATE_BOOKING_URL}
            source="book-career-page"
            title="Schedule Career Consultation"
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Benefits */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">
                What You'll Get
              </h2>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-3">
                  <div className="flex-shrink-0 p-1.5 rounded-md bg-muted text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Assistant */}
          <BookingChatAssistant 
            context="candidate"
            defaultExpanded={false}
          />

          {/* Career Areas */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-3">
              Career Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Executive', 'Technology', 'Healthcare', 'Finance', 'Sales', 'Remote'].map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Tip */}
          <div className="rounded-xl bg-muted/50 p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Pro Tip: Have Your Resume Ready
            </h3>
            <p className="text-sm text-muted-foreground">
              While not required, having an updated resume helps us better understand 
              your experience and find matching opportunities.
            </p>
          </div>

          {/* Hiring instead? */}
          <div className="text-center text-sm text-muted-foreground">
            Looking to hire instead?{' '}
            <Link href="/book/talent" className="text-primary hover:underline">
              Request talent
            </Link>
          </div>
        </aside>
      </div>
    </BookingPageLayout>
  );
};

export default BookCareer;
