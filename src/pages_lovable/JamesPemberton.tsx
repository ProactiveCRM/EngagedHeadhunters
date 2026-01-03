import { Star, MapPin, Calendar, Phone, Award, CheckCircle, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ImageGallery, GalleryImage } from '@/components/ui/image-gallery';

const JamesPemberton = () => {
  const agent = {
    name: "James Pemberton",
    title: "Founder & CEO",
    niche: "Executive Search & AI-Powered Recruiting",
    location: "Nationwide",
    image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
    yearsExperience: 15,
    specialties: ["C-Suite Executive Search", "Healthcare Leadership", "Technology Executives", "Professional Services", "AI-Powered Sourcing", "Build Don't Beg Methodology"],
    locationsServed: ["Nationwide", "Texas", "California", "New York", "Florida", "Remote Positions"],
    availability: "Available",
    calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/consult-with-james",
    phone: "(757) 720-7173",
    linkedin: "https://linkedin.com/in/jamespemberton",
    shortBio: "U.S. Navy-trained F-14 avionics tech turned recruiting innovator with 15+ years placing executives while pioneering AI-powered headhunting methodologies.",
    longBio: `James Pemberton is a U.S. Navy-trained F-14 avionics tech turned recruiting revolutionary who has spent 15+ years placing healthcare, tech, and professional-services executives while mastering SEO to make every outreach a magnet.

After building and selling a six-figure recruiting platform, scaling agencies to $80K/month, and commanding $15K/day speaking fees, James founded Engaged Headhunters in 2022 to teach recruiters how to "Build Don't Beg."

Our methodology combines authority-first content, AI-driven pipelines, and military-grade efficiency to deliver additional placements per month for our clients. James brings the precision and discipline of military training to the art and science of executive search, creating a systematic approach that eliminates the traditional "spray and pray" methods most recruiters rely on.

His revolutionary "Build Don't Beg" methodology has transformed how recruiting agencies approach candidate engagement, moving from transactional interactions to value-driven relationships that attract top talent naturally.`,
    achievements: [
      "15+ years of executive search experience",
      "Built and sold six-figure recruiting platform",
      "Scaled recruiting agencies to $80K/month",
      "$15K/day keynote speaking fees",
      "Founded Engaged Headhunters in 2022",
      "Pioneer of 'Build Don't Beg' methodology",
      "Expert in AI-powered recruiting systems",
      "U.S. Navy F-14 avionics specialist background"
    ],
    process: [
      {
        step: "Strategic Discovery",
        description: "Deep organizational analysis to understand culture, challenges, and strategic objectives for targeted headhunting approach."
      },
      {
        step: "AI-Powered Sourcing",
        description: "Leverage proprietary AI systems and SEO-infused outreach to identify and engage passive candidates who aren't actively searching."
      },
      {
        step: "Build Don't Beg Assessment", 
        description: "Comprehensive leadership evaluation using our proven methodology that goes beyond traditional interviewing."
      },
      {
        step: "Authority-First Engagement",
        description: "Value-driven candidate interactions that position your opportunity as the logical next step in their career progression."
      },
      {
        step: "Military-Grade Execution",
        description: "Systematic offer negotiation and onboarding process with placement guarantee (terms negotiated per engagement) for long-term success."
      }
    ],
    portfolioImages: [
      {
        id: '1',
        src: '/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png',
        alt: 'James Pemberton - Executive Recruiter',
        caption: 'Founder & CEO of Engaged Headhunters'
      },
      {
        id: '2',
        src: '/placeholder.svg',
        alt: 'Executive placement success story',
        caption: 'Healthcare CEO Placement - 2024'
      },
      {
        id: '3',
        src: '/placeholder.svg',
        alt: 'Industry speaking engagement',
        caption: 'National Recruiting Summit Keynote'
      },
      {
        id: '4',
        src: '/placeholder.svg',
        alt: 'AI-powered recruiting workshop',
        caption: 'AI Recruiting Methodology Workshop'
      },
      {
        id: '5',
        src: '/placeholder.svg',
        alt: 'Build Dont Beg training session',
        caption: 'Build Don\'t Beg Recruiter Training'
      },
      {
        id: '6',
        src: '/placeholder.svg',
        alt: 'Executive search team collaboration',
        caption: 'Strategic Client Consultation'
      }
    ] as GalleryImage[]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <OptimizedImage 
                  src={agent.image}
                  alt={agent.name}
                  containerClassName="w-32 h-32 mb-4 md:mb-0 md:mr-8 border-4 border-primary-foreground/20"
                  rounded="full"
                  aspectRatio="square"
                  priority={true}
                />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{agent.name}</h1>
                  <p className="text-xl text-primary-foreground/90 mb-2">{agent.title}</p>
                  <div className="flex items-center text-primary-foreground/80">
                    <MapPin size={18} />
                    <span className="ml-2">{agent.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-lg text-primary-foreground/90 mb-8">{agent.shortBio}</p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="text-3xl font-bold">{agent.yearsExperience}+</div>
                <div className="text-primary-foreground/80">Years Experience</div>
              </div>

              <div className="mb-6">
                <div className="text-lg font-semibold text-center mb-4 text-green-400">
                  Available for Strategic Consulting
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={agent.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-lg font-semibold text-center transition-colors inline-flex items-center justify-center"
                >
                  <Calendar className="mr-2" size={18} />
                  Book with James
                </a>
                <a 
                  href="tel:+17577207173"
                  className="w-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-6 py-3 rounded-lg font-semibold text-center transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="mr-2" size={18} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">About James</h2>
              <div className="prose prose-lg text-muted-foreground whitespace-pre-line">
                {agent.longBio}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Key Achievements</h3>
                <div className="space-y-3">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-background rounded-xl p-6 border">
                <h3 className="text-xl font-bold text-foreground mb-4">Specialties</h3>
                <div className="space-y-2">
                  {agent.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="text-primary mr-2 flex-shrink-0" size={16} />
                      <span className="text-muted-foreground">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 border">
                <h3 className="text-xl font-bold text-foreground mb-4">Locations Served</h3>
                <div className="space-y-2">
                  {agent.locationsServed.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <MapPin className="text-primary mr-2 flex-shrink-0" size={16} />
                      <span className="text-muted-foreground">{location}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 border">
                <h3 className="text-xl font-bold text-foreground mb-4">Connect</h3>
                <div className="space-y-3">
                  <a 
                    href={agent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <Linkedin className="mr-2" size={18} />
                    LinkedIn Profile
                  </a>
                  <a 
                    href="tel:+17577207173"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <Phone className="mr-2" size={18} />
                    {agent.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Success Stories Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories & Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into executive placements, industry speaking engagements, 
              and the impact of the Build Don't Beg methodology.
            </p>
          </div>
          
          <ImageGallery 
            images={agent.portfolioImages}
            columns={3}
            gap="lg"
            aspectRatio="4/3"
            rounded="lg"
            showCaptions={true}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The "Build Don't Beg" Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A revolutionary methodology that transforms traditional headhunting through strategic planning, AI-powered systems, and military-grade execution.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {agent.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-foreground mb-3">{step.step}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JamesPemberton;