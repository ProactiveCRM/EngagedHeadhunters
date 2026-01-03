import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { AgentSEO } from '@/components/seo';
import { MapPin, Calendar, Phone, CheckCircle, Linkedin, Mail, Loader2, UserX, Globe, Briefcase, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {   } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface AgentProfile {
  id: string;
  username: string;
  full_name: string | null;
  title: string | null;
  headline: string | null;
  niche: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_photo_url: string | null;
  calendly_url: string | null;
  specialties: string[] | null;
  availability_status: string | null;
  rating: number | null;
  reviews_count: number | null;
  placements_count: number | null;
  is_active: boolean | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  years_experience: number | null;
  company: string | null;
}

const DynamicAgentProfile = () => {
  const { username } = useParams<{ username: string }>();

  const { data: agent, isLoading } = useQuery({
    queryKey: ['agent-profile', username],
    queryFn: async () => {
      if (!username) throw new Error('No username provided');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      return data as AgentProfile;
    },
    enabled: !!username,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <UserX className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Agent Not Found</h1>
          <p className="text-muted-foreground mb-6 text-center">
            The recruiter profile you're looking for doesn't exist or is no longer active.
          </p>
          <Link href="/agents">
            <Button>View All Recruiters</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const defaultBookingUrl = "https://crm.engagedheadhunters.com/widget/bookings/request-talent";
  const bookingUrl = agent.calendly_url || defaultBookingUrl;
  const displayName = agent.full_name || 'Recruiter';
  const avatarUrl = agent.avatar_url || '/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png';
  const coverUrl = agent.cover_photo_url;

  return (
    <>
      <AgentSEO username={agent.username} />

      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <StickyCTA />

        {/* LinkedIn-Style Hero Section */}
        <section className="pt-20">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 w-full relative">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary via-primary/80 to-primary/60" />
            )}
          </div>

          {/* Profile Card */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="-mt-20 relative z-10 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="-mt-24 md:-mt-20 flex-shrink-0">
                    <img 
                      src={avatarUrl}
                      alt={displayName}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 pt-2 md:pt-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {displayName}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-2">
                          {agent.headline || agent.title || 'Executive Recruiter'}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          {agent.company && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {agent.company}
                            </span>
                          )}
                          {agent.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {agent.location}
                            </span>
                          )}
                          {agent.years_experience && (
                            <span className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {agent.years_experience}+ years experience
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="w-full sm:w-auto">
                            <Calendar className="mr-2 h-5 w-5" />
                            Book Consultation
                          </Button>
                        </a>
                        <a href="tel:+17577207173">
                          <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            <Phone className="mr-2 h-5 w-5" />
                            Call Now
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* Availability Badge */}
                    {agent.availability_status && (
                      <div className="mt-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          agent.availability_status === 'available' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {agent.availability_status === 'available' ? '🟢 Open to new clients' : '🟡 Limited availability'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
                  {agent.bio ? (
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {agent.bio}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      {displayName} is a professional recruiter at Engaged Headhunters, 
                      specializing in {agent.niche || 'executive search'} and helping organizations 
                      find exceptional talent.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Specialties Card */}
              {agent.specialties && agent.specialties.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Specialties</h2>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Niche/Industry Card */}
              {agent.niche && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Industry Focus</h2>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{agent.niche}</p>
                        <p className="text-sm text-muted-foreground">Primary industry specialization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Contact</h3>
                  <div className="space-y-4">
                    {agent.email && (
                      <a 
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        <span className="text-sm">{agent.email}</span>
                      </a>
                    )}
                    {agent.phone && (
                      <a 
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="text-sm">{agent.phone}</span>
                      </a>
                    )}
                    {agent.linkedin_url && (
                      <a 
                        href={agent.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="text-sm">LinkedIn Profile</span>
                      </a>
                    )}
                    {agent.website_url && (
                      <a 
                        href={agent.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                    <a 
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">Schedule a Call</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              {agent.location && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Location</h3>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{agent.location}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Work with {displayName}?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Schedule a consultation to discuss your recruiting needs and see how we can help you find exceptional talent.
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Book a Consultation
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DynamicAgentProfile;
