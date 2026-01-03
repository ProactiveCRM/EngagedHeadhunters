import { useState } from 'react';
import BookingPageLayout from '@/components/booking/BookingPageLayout';
import BookingTypeSelector, { BookingType } from '@/components/booking/BookingTypeSelector';
import WhatToExpect from '@/components/booking/WhatToExpect';
import BookingChatAssistant from '@/components/booking/BookingChatAssistant';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import {   } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
const BOOKING_URLS: Record<BookingType, string> = {
  employer: 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb',
  candidate: 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb',
  general: 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb',
};

const BookingHub = () => {
  const [selectedType, setSelectedType] = useState<BookingType | null>(null);

  return (
    <BookingPageLayout
      title="Book a Consultation"
      metaTitle="Book a Consultation | Engaged Headhunters"
      metaDescription="Schedule a consultation with Engaged Headhunters. Whether you're hiring top talent or exploring career opportunities, book your call today."
      canonicalPath="/book"
      heroTitle="Schedule Your Consultation"
      heroSubtitle="Choose how you'd like to connect with our team"
    >
      <div className="space-y-8">
        {/* Type Selector */}
        <BookingTypeSelector
          selectedType={selectedType}
          onSelect={setSelectedType}
        />

        {/* Quick Links */}
        {!selectedType && (
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/book/talent"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Go directly to Employer Booking <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/book/career"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Go directly to Candidate Booking <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* What to Expect (shows based on selection) */}
        {selectedType && (
          <WhatToExpect
            variant={selectedType}
            defaultOpen={true}
            className="max-w-2xl mx-auto"
          />
        )}

        {/* Calendar Embed */}
        {selectedType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GHLCalendarEmbed
              bookingUrl={BOOKING_URLS[selectedType]}
              source={`booking-hub-${selectedType}`}
              title={`Schedule ${selectedType === 'employer' ? 'Talent Request' : selectedType === 'candidate' ? 'Career Consultation' : 'Inquiry'}`}
            />
          </div>
        )}

        {/* Placeholder when no selection */}
        {!selectedType && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl bg-muted/20">
              <p className="text-lg text-muted-foreground mb-2">
                Select an option above to see available times
              </p>
              <p className="text-sm text-muted-foreground">
                Our team typically responds within 24 hours
              </p>
            </div>
            
            {/* Chat Assistant in sidebar */}
            <aside>
              <BookingChatAssistant 
                context="general"
                defaultExpanded={true}
              />
            </aside>
          </div>
        )}
      </div>
    </BookingPageLayout>
  );
};

export default BookingHub;
