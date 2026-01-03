import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CTASectionProps {
  variant?: 'employer' | 'candidate' | 'hybrid';
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  bookingUrl?: string;
  showJobsLink?: boolean;
}

const CTASection = ({
  variant = 'hybrid',
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  bookingUrl,
  showJobsLink = false,
}: CTASectionProps) => {
  const defaultContent = {
    employer: {
      title: "Your Next Great Hire Isn't Scrolling Job Boards",
      description: "They're producing results somewhere else, waiting for the right opportunity. Let's go find them before your competitors do.",
      primaryButton: "Schedule a Discovery Call",
      secondaryButton: "See How We Work",
      url: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
    },
    candidate: {
      title: "The Best Roles Aren't Posted. They're Offered.",
      description: "Opportunities go to people who know the right people. Let us open doors for you.",
      primaryButton: "Start a Confidential Search",
      secondaryButton: "Browse Open Positions",
      url: "https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
    },
    hybrid: {
      title: "Ready to Make Your Move?",
      description: "Whether you're hiring leaders or exploring your next opportunity, the best outcomes come through relationships. Not job boards.",
      primaryButton: "Talk to a Search Consultant",
      secondaryButton: "Learn More",
      url: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
    }
  };

  const content = defaultContent[variant];
  const finalBookingUrl = bookingUrl || content.url;
  const headingId = `cta-heading-${variant}`;

  return (
    <section 
      className="py-20 bg-primary relative overflow-hidden"
      aria-labelledby={headingId}
    >
      {/* Background Pattern */}
      <div aria-hidden="true" className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 id={headingId} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          {title || content.title}
        </h2>
        <p className="text-xl text-[hsl(var(--text-on-primary-muted))] mb-8 max-w-2xl mx-auto">
          {description || content.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            <a 
              href={finalBookingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${primaryButtonText || content.primaryButton} (opens in new tab)`}
            >
              {primaryButtonText || content.primaryButton}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          
          {variant === 'candidate' && showJobsLink ? (
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a 
                href="https://jobs.engagedheadhunters.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`${secondaryButtonText || content.secondaryButton} (opens in new tab)`}
              >
                <Briefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                {secondaryButtonText || content.secondaryButton}
              </a>
            </Button>
          ) : (
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/services">
                {secondaryButtonText || content.secondaryButton}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
