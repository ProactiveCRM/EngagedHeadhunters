import { useParams,   } from 'next/navigation';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GHLCalendarEmbed from '../components/GHLCalendarEmbed';

type ThankYouType = 'contact' | 'resume' | 'salary-guide' | 'employer';

const thankYouContent: Record<ThankYouType, {
  title: string;
  subtitle: string;
  description: string;
  bookingUrl: string;
  bookingTitle: string;
  resources: Array<{ title: string; description: string; link: string; emoji: string }>;
}> = {
  contact: {
    title: "Thanks for Reaching Out!",
    subtitle: "We've received your message",
    description: "A member of our team will be in touch within 1 business day. In the meantime, schedule a call to speak with us sooner.",
    bookingUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent",
    bookingTitle: "Schedule a Consultation",
    resources: [
      { title: "Browse Open Positions", description: "View current opportunities", link: "https://jobs.engagedheadhunters.com", emoji: "💼" },
      { title: "Salary Guide", description: "Research compensation data", link: "/salary-guide", emoji: "📄" },
      { title: "Our Services", description: "Learn how we can help", link: "/services", emoji: "👥" },
    ]
  },
  resume: {
    title: "Resume Received!",
    subtitle: "Your profile is under review",
    description: "Our team will review your background and reach out if we have opportunities that match your experience. Want to discuss your career goals now?",
    bookingUrl: "https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call",
    bookingTitle: "Schedule a Career Consultation",
    resources: [
      { title: "Browse Open Positions", description: "View current opportunities", link: "https://jobs.engagedheadhunters.com", emoji: "💼" },
      { title: "Salary Guide", description: "Research your market value", link: "/salary-guide", emoji: "📄" },
      { title: "Meet Our Recruiters", description: "See who you'll work with", link: "/agents", emoji: "👥" },
    ]
  },
  'salary-guide': {
    title: "Your Salary Data is Ready!",
    subtitle: "Want a comprehensive analysis?",
    description: "Schedule a consultation to get a detailed salary analysis for your specific role, experience, and market. We'll provide personalized insights.",
    bookingUrl: "https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call",
    bookingTitle: "Get Your Full Salary Report",
    resources: [
      { title: "Browse Open Positions", description: "See jobs matching your salary range", link: "https://jobs.engagedheadhunters.com", emoji: "💼" },
      { title: "Submit Your Resume", description: "Get matched to opportunities", link: "/submit-resume", emoji: "📄" },
      { title: "Career Consultation", description: "Discuss your career goals", link: "/contact", emoji: "👥" },
    ]
  },
  employer: {
    title: "Request Received!",
    subtitle: "We're ready to help you find talent",
    description: "A recruiting specialist will contact you within 1 business day. Schedule a call now to discuss your hiring needs immediately.",
    bookingUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent",
    bookingTitle: "Schedule a Recruitment Consultation",
    resources: [
      { title: "Our Services", description: "See our full service offerings", link: "/services", emoji: "💼" },
      { title: "Case Studies", description: "See our success stories", link: "/case-studies", emoji: "📄" },
      { title: "Industry Expertise", description: "Learn about our specialties", link: "/niches", emoji: "👥" },
    ]
  }
};

const ThankYou = () => {
  const { type } = useParams<{ type: string }>();
  const pageType = (type as ThankYouType) || 'contact';
  const content = thankYouContent[pageType] || thankYouContent.contact;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{content.title} | Engaged Headhunters</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />

      <main className="pt-20">
        {/* Success Banner */}
        <section className="bg-gradient-to-br from-muted to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl" role="img" aria-hidden="true">✅</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">
              {content.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>
        </section>

        {/* Calendar Embed Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="text-primary mr-2" role="img" aria-hidden="true">📅</span>
                <span className="text-primary font-semibold">Skip the Wait</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.bookingTitle}
              </h2>
              <p className="text-muted-foreground">
                Book a time that works for you and let's connect
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg border overflow-hidden">
              <GHLCalendarEmbed 
                bookingUrl={content.bookingUrl}
                source={`thank-you-${pageType}`}
              />
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                While You Wait
              </h2>
              <p className="text-muted-foreground">
                Explore these resources to learn more about how we can help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {content.resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link.startsWith('http') ? resource.link : resource.link}
                  target={resource.link.startsWith('http') ? '_blank' : undefined}
                  rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl" role="img" aria-hidden="true">{resource.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    Learn More <ArrowRight className="ml-1" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back Home */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              ← Back to Homepage
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
