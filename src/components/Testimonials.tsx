import {   } from 'next/navigation';
import Link from 'next/link';

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground text-center">
          <h3 className="text-3xl font-bold mb-6">Partner with Engaged Headhunters</h3>
          <p className="text-[hsl(var(--text-on-primary-muted))] text-lg mb-8 max-w-4xl mx-auto">
            Whether you're a company seeking transformational leadership, a candidate ready for your next career move, 
            or a recruiter building an elite practice, Engaged Headhunters is your partner for extraordinary results.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link 
              href="/contact"
              className="bg-background text-primary px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Get Hiring Consultation
            </Link>
            <a 
              href="https://jobs.engagedheadhunters.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(var(--dark-navy))] text-[hsl(var(--text-on-dark))] px-6 py-3 rounded-lg font-semibold hover:bg-[hsl(var(--dark-navy))]/90 transition-colors"
            >
              Find Your Next Role
            </a>
            <Link 
              href="/for-recruiters"
              className="border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background hover:text-primary transition-colors"
            >
              Explore Agent Opportunity
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;