import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';

const FeaturedAgents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const agents = [
    {
      name: "James Pemberton",
      title: "Founder & CEO - Executive Headhunter",
      location: "Nationwide",
      niche: "Executive Search & AI-Powered Recruiting",
      image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
      rating: 5.0,
      specialties: ["C-Suite Executive Search", "Healthcare Leadership", "Technology Executives", "AI-Powered Sourcing"],
      availability: "Available",
      calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/consult-with-james",
      experience: "15+ Years Experience",
      verified: true,
      placementsCount: 500
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % agents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + agents.length) % agents.length);
  };

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Founder - Award-Winning Executive Headhunter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            James Pemberton brings 15+ years of executive recruiting expertise, combining 
            military precision with AI-powered talent acquisition to deliver exceptional staffing solutions 
            and transformational leadership placements.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {agents.map((agent, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="max-w-4xl mx-auto bg-background rounded-xl shadow-lg p-8 border hover:shadow-elegant transition-shadow duration-300">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center relative">
                        <div className="relative inline-block">
                          <OptimizedImage 
                            src={agent.image}
                            alt={agent.name}
                            containerClassName="w-32 h-32 mx-auto mb-4"
                            rounded="full"
                            aspectRatio="square"
                          />
                          {agent.verified && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-md">
                              <span className="text-sm" role="img" aria-hidden="true">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-yellow-500" role="img" aria-hidden="true">⭐</span>
                          <span className="ml-1 font-semibold">{agent.rating}</span>
                        </div>
                        <div className="text-sm text-primary font-semibold mb-2">{agent.experience}</div>
                        <div className="flex items-center justify-center text-muted-foreground mb-2">
                          <span className="mr-1" role="img" aria-hidden="true">📍</span>
                          <span>{agent.location}</span>
                        </div>
                        {agent.placementsCount && (
                          <div className="flex items-center justify-center text-muted-foreground">
                            <span className="mr-1" role="img" aria-hidden="true">👥</span>
                            <span>{agent.placementsCount}+ Placements</span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-foreground">{agent.name}</h3>
                          {agent.verified && (
                            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-lg text-primary mb-1">{agent.title}</p>
                        <p className="text-muted-foreground mb-4">{agent.niche} Specialist</p>

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

                        <div className="grid grid-cols-1 gap-4 mb-6">
                          <div>
                            <div className="text-lg font-semibold text-green-600">{agent.availability}</div>
                            <div className="text-sm text-muted-foreground">Current Status</div>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Link 
                            href={`/agents/${agent.name.toLowerCase().replace(' ', '-')}`}
                            className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                          >
                            View Profile
                          </Link>
                          <a 
                            href={agent.calendlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-center transition-colors inline-flex items-center justify-center"
                          >
                            <Calendar className="mr-2" size={16} />
                            Book with {agent.name.split(' ')[0]}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-background border rounded-full p-3 sm:p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous agent"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={24} className="hidden sm:block" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-background border rounded-full p-3 sm:p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next agent"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={24} className="hidden sm:block" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/agents"
            className="inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Agents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;