import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Calendar, User, Award, CheckCircle, TrendingUp, Target, Handshake, ArrowRight } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StickyCTA from '../components/StickyCTA';
import AgentsSEO from '../components/AgentsSEO';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface Agent {
  id: string;
  username?: string | null;
  full_name: string | null;
  title: string | null;
  niche: string | null;
  location: string | null;
  avatar_url: string | null;
  rating: number | null;
  specialties: string[] | null;
  availability_status: string | null;
  calendly_url: string | null;
  bio: string | null;
  is_active: boolean | null;
}

// Generate profile URL based on username
const getAgentProfileUrl = (agent: Agent): string => {
  // Check if this is James Pemberton (has dedicated page)
  if (agent.id === 'james-pemberton' || agent.username === 'james-pemberton') {
    return '/james-pemberton';
  }
  // For other agents with username, use their username as the URL slug
  if (agent.username) {
    return `/${agent.username}`;
  }
  // Fallback to agents page if no username
  return '/agents';
};

const AgentsIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback agent data for when database is empty
  const fallbackAgent: Agent = {
    id: 'james-pemberton',
    full_name: 'James Pemberton',
    title: 'Founder & CEO - Executive Headhunter',
    niche: 'Executive Search',
    location: 'Nationwide',
    avatar_url: '/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png',
    rating: 5.0,
    specialties: ['C-Suite Executive Search', 'Healthcare Leadership', 'Technology Executives', 'AI-Powered Sourcing', 'Build Don\'t Beg Methodology'],
    availability_status: 'available',
    calendly_url: 'https://crm.engagedheadhunters.com/widget/bookings/request-talent',
    bio: 'U.S. Navy-trained F-14 avionics tech turned recruiting innovator with 15+ years placing executives while pioneering AI-powered headhunting methodologies.',
    is_active: true
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'agent')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching agents:', error);
        setAgents([fallbackAgent]);
      } else if (data && data.length > 0) {
        setAgents(data);
      } else {
        // No agents in database, use fallback
        setAgents([fallbackAgent]);
      }
    } catch (error) {
      console.error('Error:', error);
      setAgents([fallbackAgent]);
    } finally {
      setLoading(false);
    }
  };

  const niches = ['all', 'Executive Search', 'Healthcare', 'Technology', 'Finance'];
  const locations = ['all', 'Nationwide', 'Texas', 'California', 'New York'];
  const availabilities = ['all', 'available', 'busy', 'booked'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = (agent.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (agent.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (agent.specialties || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesNiche = selectedNiche === 'all' || agent.niche === selectedNiche;
    const matchesLocation = selectedLocation === 'all' || agent.location === selectedLocation;
    const matchesAvailability = selectedAvailability === 'all' || agent.availability_status === selectedAvailability;

    return matchesSearch && matchesNiche && matchesLocation && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <AgentsSEO />
      <Navigation />
      <StickyCTA />
      
      {/* Hero Section */}
      <section className="pt-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expert Headhunters & Executive Recruiters | Staffing Solutions
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Industry-leading recruiting agents specializing in executive search, talent acquisition, 
              and strategic staffing services. Our headhunters deliver proven results across healthcare, 
              technology, finance, and professional services sectors.
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-4xl mx-auto">
              At Engaged Headhunters, our recruiting agency combines military-grade precision with AI-powered 
              sourcing to deliver exceptional staffing solutions. We're not just a recruitment firm—we're 
              talent acquisition specialists who revolutionize how executive search consultants connect 
              top-tier candidates with transformational opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search Recruiters & Headhunters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
              />
            </div>
            
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              {niches.map(niche => (
                <option key={niche} value={niche}>
                  {niche === 'all' ? 'All Recruiting Specialties' : niche}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'Staffing Coverage Areas' : location}
                </option>
              ))}
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              {availabilities.map(availability => (
                <option key={availability} value={availability}>
                  {availability === 'all' ? 'All Availability' : availability}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-muted-foreground">
            Showing {filteredAgents.length} of {agents.length} agents
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading agents...</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredAgents.map((agent) => (
                <div key={agent.id} className="bg-card rounded-xl shadow-lg border p-8">
                  <div className="flex items-start space-x-6">
                    <OptimizedImage 
                      src={agent.avatar_url || '/placeholder.svg'}
                      alt={agent.full_name || 'Agent'}
                      containerClassName="w-24 h-24 flex-shrink-0"
                      rounded="full"
                      aspectRatio="square"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-1">{agent.full_name}</h3>
                      <p className="text-lg text-primary mb-2">{agent.title}</p>
                      
                      <div className="flex items-center mb-3">
                        {agent.rating && (
                          <>
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <span className="ml-1 font-semibold">{agent.rating}</span>
                          </>
                        )}
                        <MapPin className="ml-4 text-muted-foreground" size={16} />
                        <span className="ml-1 text-muted-foreground">{agent.location}</span>
                      </div>

                      <p className="text-muted-foreground mb-4">{agent.bio}</p>

                      {agent.specialties && agent.specialties.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.specialties.map((specialty, idx) => (
                              <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <div className={`text-lg font-semibold ${
                          agent.availability_status === 'available' ? 'text-green-600' :
                          agent.availability_status === 'busy' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {agent.availability_status === 'available' ? 'Available' :
                           agent.availability_status === 'busy' ? 'Limited Availability' : 'Fully Booked'}
                        </div>
                        <div className="text-sm text-muted-foreground">Availability Status</div>
                      </div>

                      <div className="flex space-x-4">
                        <Link 
                          href={getAgentProfileUrl(agent)}
                          className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                        >
                          View Profile
                        </Link>
                        {agent.calendly_url && (
                          <a 
                            href={agent.calendly_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-center transition-colors inline-flex items-center justify-center"
                          >
                            <Calendar className="mr-2" size={16} />
                            Book Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-xl font-semibold text-foreground mb-2">No recruiters found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Our Executive Recruiting Services */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              About Our Executive Recruiting Services
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-4">
                Engaged Headhunters is a premier <strong>executive search firm</strong> and <strong>staffing agency</strong> that 
                revolutionizes traditional recruiting through our proprietary "Build Don't Beg" methodology. Our <strong>headhunters</strong> and 
                <strong> talent acquisition specialists</strong> combine military precision with AI-powered sourcing to deliver 
                exceptional <strong>recruiting services</strong> across multiple industries.
              </p>
              <p className="mb-4">
                Unlike conventional <strong>recruitment agencies</strong>, our <strong>executive search consultants</strong> focus on 
                building authority-first relationships that attract top talent naturally. This strategic approach to <strong>talent acquisition</strong> and 
                <strong> workforce solutions</strong> has transformed how organizations approach 
                <strong> staffing solutions</strong> for critical leadership roles.
              </p>
              <p>
                Whether you need <strong>C-suite recruiting</strong>, healthcare staffing, technology headhunters, or specialized 
                <strong> recruitment consultants</strong>, our team delivers results that exceed expectations. We're not just 
                <strong> hiring specialists</strong>—we're strategic partners in your organizational growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Industries We Serve Through Specialized Headhunting
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Healthcare Staffing', link: '/services/healthcare-staffing', desc: 'Medical executives and clinical leadership' },
              { name: 'Technology Recruiting', link: '/services/technology-recruiting', desc: 'Software engineers and IT executives' },
              { name: 'Finance Headhunting', link: '/services/finance-recruiting', desc: 'Banking and financial services leaders' },
              { name: 'Manufacturing Talent Acquisition', link: '/services/manufacturing-recruiting', desc: 'Operations and supply chain executives' },
              { name: 'Professional Services Placement', link: '/services/executive-search', desc: 'Consulting and advisory leadership' },
              { name: 'Executive Search Consulting', link: '/services/executive-search', desc: 'C-suite and board-level positions' }
            ].map((industry, idx) => (
              <Link 
                key={idx}
                href={industry.link}
                className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-foreground mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Headhunters */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Why Choose Our Executive Recruiters?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Build Don't Beg Methodology</h3>
              <p className="text-muted-foreground text-sm">Revolutionary recruiting approach that transforms candidate engagement</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-2">AI-Powered Sourcing</h3>
              <p className="text-muted-foreground text-sm">Advanced technology identifies passive candidates others miss</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Proven Track Record</h3>
              <p className="text-muted-foreground text-sm">Extensive successful placements across industries and executive levels</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Military-Grade Execution</h3>
              <p className="text-muted-foreground text-sm">Systematic process with placement guarantee (terms per engagement)</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions About Our Recruiting Services
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                What is the difference between a recruiter and a headhunter?
              </h3>
              <p className="text-muted-foreground">
                While both terms describe <strong>talent acquisition</strong> professionals, headhunters typically specialize in 
                proactive sourcing for senior-level and executive positions. Our <strong>executive recruiters</strong> combine 
                traditional headhunting with modern AI-powered techniques to identify and engage passive candidates who aren't 
                actively job searching. This strategic approach to <strong>executive search</strong> delivers higher-quality 
                candidates for critical leadership roles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                How do executive search firms work?
              </h3>
              <p className="text-muted-foreground">
                <strong>Executive search firms</strong> partner with organizations to identify, attract, and secure top-tier 
                leadership talent. At Engaged Headhunters, our <strong>recruitment consultants</strong> begin with strategic 
                discovery to understand your culture and needs, then leverage our proprietary AI systems and extensive networks 
                for <strong>talent sourcing</strong>. We conduct comprehensive assessments using our "Build Don't Beg" methodology 
                and provide ongoing support through offer negotiation and onboarding with a 180-day guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                What makes a great staffing agency?
              </h3>
              <p className="text-muted-foreground">
                A premier <strong>staffing agency</strong> combines industry expertise, proven methodologies, and technology-driven 
                processes. Our <strong>recruiting agency</strong> stands out through specialized <strong>hiring specialists</strong> in 
                each sector, our innovative "Build Don't Beg" approach to <strong>candidate engagement</strong>, and AI-powered 
                <strong> workforce solutions</strong> that deliver results. With 500+ successful placements and 20+ years of experience, 
                we provide <strong>staffing solutions</strong> that transform organizations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                How long does executive recruiting take?
              </h3>
              <p className="text-muted-foreground">
                <strong>Executive recruiting</strong> timelines vary based on role complexity and market conditions, typically ranging 
                from 60-120 days. Our <strong>executive search consultants</strong> accelerate this process through AI-powered sourcing 
                and authority-first engagement strategies. Unlike traditional <strong>recruitment agencies</strong> that rely on job 
                postings, our proactive <strong>headhunting</strong> approach builds relationships with top talent before positions 
                become available, often reducing time-to-hire by 30-40%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alliance Membership CTA */}
      <section className="py-20 bg-gradient-to-br from-dark-navy via-dark-navy to-primary/20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <Handshake className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">For Independent Recruiters</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are You an Independent Recruiter?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Join our Alliance network and access the same tools, support, and appointment-booking services our EH Agents get—while keeping your own brand.
          </p>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            We fill your calendar with qualified appointments. You focus on closing deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/alliance">
              <Button size="lg" variant="hero" className="w-full sm:w-auto">
                Learn About the Alliance
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a 
              href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="heroOutline" className="w-full sm:w-auto">
                Schedule Discovery Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentsIndex;