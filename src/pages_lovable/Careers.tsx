import { Search, MapPin, Clock, DollarSign, TrendingUp, Users, Award, ChevronRight, Briefcase, Building2, Code, HeartHandshake, Calculator, Factory, Handshake, Laptop, GraduationCap } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Careers = () => {
  const careerCategories = [
    {
      slug: 'healthcare',
      icon: HeartHandshake,
      title: 'Healthcare Careers',
      description: 'Medical professionals, healthcare administration, and clinical leadership roles',
      topRoles: ['Physician', 'Nurse Manager', 'Healthcare Director']
    },
    {
      slug: 'technology',
      icon: Code,
      title: 'Technology Careers',
      description: 'Software engineering, IT leadership, and technology innovation roles',
      topRoles: ['Software Engineer', 'Tech Lead', 'CTO']
    },
    {
      slug: 'finance',
      icon: Calculator,
      title: 'Finance Careers',
      description: 'Financial analysis, investment banking, and corporate finance opportunities',
      topRoles: ['Financial Analyst', 'Investment Manager', 'CFO']
    },
    {
      slug: 'executive',
      icon: Building2,
      title: 'Executive Opportunities',
      description: 'C-suite positions, board roles, and senior leadership opportunities',
      topRoles: ['CEO', 'President', 'Board Member']
    },
    {
      slug: 'manufacturing',
      icon: Factory,
      title: 'Manufacturing Careers',
      description: 'Operations management, quality control, and industrial leadership',
      topRoles: ['Operations Manager', 'Plant Director', 'Quality Lead']
    },
    {
      slug: 'sales',
      icon: Handshake,
      title: 'Sales Opportunities',
      description: 'Business development, account management, and sales leadership roles',
      topRoles: ['Account Executive', 'Sales Director', 'VP Sales']
    },
    {
      slug: 'contract',
      icon: Briefcase,
      title: 'Contract Opportunities',
      description: 'Freelance, consulting, and project-based professional roles',
      topRoles: ['Consultant', 'Project Manager', 'Specialist']
    },
    {
      slug: 'remote',
      icon: Laptop,
      title: 'Remote Opportunities',
      description: 'Work-from-anywhere positions across all industries and levels',
      topRoles: ['Remote Developer', 'Digital Marketer', 'Virtual Manager']
    },
    {
      slug: 'entry-level',
      icon: GraduationCap,
      title: 'Entry-Level Opportunities',
      description: 'Early career positions for new graduates and career changers',
      topRoles: ['Analyst', 'Coordinator', 'Associate']
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Significant advancement opportunities with our placements'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Dedicated career coaches and industry specialists'
    },
    {
      icon: Award,
      title: 'Top Companies',
      description: 'Access to exclusive opportunities at Fortune 500 companies'
    },
    {
      icon: Clock,
      title: 'Fast Placement',
      description: 'Efficient process from application to offer'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Dream Career
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover exclusive opportunities, advance your career, and connect with top employers 
            through our AI-powered career matching platform.
          </p>
          
          {/* Job Search Bar */}
          <div className="bg-card rounded-xl shadow-lg p-6 max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
                  <input 
                    type="text" 
                    placeholder="Job title, keywords, or company"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
                  <input 
                    type="text" 
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
              </div>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Search Jobs
              </button>
            </div>
          </div>

        </div>
      </section>
      {/* Career Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Career Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From entry-level positions to executive roles, discover opportunities 
              across all industries and experience levels.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {careerCategories.map((category, index) => (
              <Link 
                key={index}
                href={`/careers/${category.slug}`}
                className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8 border group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <category.icon className="text-primary" size={32} />
                  </div>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Top Roles:</div>
                  <div className="text-sm text-foreground">{category.topRoles.join(', ')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Top Professionals Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just find jobs—we build careers. Our AI-powered platform and expert 
              career coaches ensure you find the perfect opportunity for your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Join professionals who have found their dream jobs through our platform. 
            Let our expert recruiters match you with the perfect opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link 
              href="/submit-resume"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors flex-1 text-center"
            >
              Submit Your Resume
            </Link>
            <a 
              href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors flex-1 text-center"
            >
              Schedule Career Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;