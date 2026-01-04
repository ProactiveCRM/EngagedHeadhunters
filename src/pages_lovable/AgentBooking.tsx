import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import WhatToExpect from '@/components/booking/WhatToExpect';
import BookingTrustBadges from '@/components/booking/BookingTrustBadges';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Briefcase, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const DEFAULT_BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/2hwWwU2YZZPgzJ8TkENb';

const AgentBooking = () => {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();

  const { data: agent, isLoading, error } = useQuery({
    queryKey: ['agent-booking', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('role', 'agent')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!username,
  });

  useEffect(() => {
    if (!isLoading && (error || !agent)) {
      router.replace('/book');
    }
  }, [isLoading, error, agent, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !agent) {
    return null;
  }

  const bookingUrl = agent.calendly_url || DEFAULT_BOOKING_URL;
  const initials = agent.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'EH';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <StickyCTA />

      <main className="flex-grow pt-20">
        {/* Agent Header */}
        <section className="bg-gradient-to-b from-muted to-background py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={agent.avatar_url || undefined} alt={agent.full_name || ''} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  Book with {agent.full_name}
                </h1>
                {agent.title && (
                  <p className="text-lg text-primary font-medium mb-2">
                    {agent.title}
                  </p>
                )}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                  {agent.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {agent.location}
                    </span>
                  )}
                  {agent.niche && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {agent.niche}
                    </span>
                  )}
                  {agent.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" /> {agent.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <WhatToExpect variant="employer" defaultOpen={true} />

            <GHLCalendarEmbed
              bookingUrl={bookingUrl}
              source={`agent-${username}`}
              title={`Schedule with ${agent.full_name}`}
            />

            <div className="text-center text-sm text-muted-foreground">
              <Link href={`/${username}`} className="text-primary hover:underline">
                View {agent.full_name}'s full profile
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingTrustBadges />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AgentBooking;
