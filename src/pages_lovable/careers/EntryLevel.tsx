
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTASection from '../../components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import { CareerPageSEO } from '@/components/seo/CareerPageSEO';

const EntryLevel = () => {
  const entryLevelCategories = [
    {
      title: 'Business & Administration',
      roles: ['Business Analyst', 'Administrative Coordinator', 'Operations Associate', 'Project Coordinator', 'Executive Assistant']
    },
    {
      title: 'Technology & Engineering',
      roles: ['Junior Developer', 'IT Support Specialist', 'Quality Assurance Tester', 'Technical Support', 'Data Analyst']
    },
    {
      title: 'Sales & Marketing',
      roles: ['Sales Development Rep', 'Marketing Coordinator', 'Social Media Specialist', 'Account Coordinator', 'Digital Marketing Assistant']
    },
    {
      title: 'Healthcare & Life Sciences',
      roles: ['Medical Assistant', 'Research Coordinator', 'Healthcare Administrator', 'Clinical Support', 'Lab Technician']
    }
  ];

  const careerGrowth = [
    {
      timeframe: 'Year 1',
      focus: 'Learn & Adapt',
      activities: ['Master core skills', 'Build professional network', 'Understand company culture', 'Seek mentorship']
    },
    {
      timeframe: 'Years 2-3',
      focus: 'Develop Expertise',
      activities: ['Take on challenging projects', 'Develop specializations', 'Lead small initiatives', 'Pursue certifications']
    },
    {
      timeframe: 'Years 4-5',
      focus: 'Leadership Roles',
      activities: ['Manage teams or projects', 'Drive strategic initiatives', 'Mentor new hires', 'Consider advanced education']
    },
    {
      timeframe: 'Years 5+',
      focus: 'Senior Positions',
      activities: ['Senior/manager roles', 'Cross-functional leadership', 'Industry recognition', 'Executive development']
    }
  ];

  const skillDevelopment = [
    {
      category: 'Professional Skills',
      skills: ['Communication', 'Problem Solving', 'Time Management', 'Teamwork', 'Critical Thinking']
    },
    {
      category: 'Technical Skills',
      skills: ['Microsoft Office', 'Data Analysis', 'Basic Programming', 'Database Management', 'Digital Tools']
    },
    {
      category: 'Industry Knowledge',
      skills: ['Business Fundamentals', 'Industry Trends', 'Best Practices', 'Regulatory Compliance', 'Process Improvement']
    },
    {
      category: 'Leadership Potential',
      skills: ['Initiative Taking', 'Mentoring Others', 'Project Management', 'Presentation Skills', 'Strategic Thinking']
    }
  ];

  const entryLevelBenefits = [
    {
      emoji: '📚',
      title: 'Learning Opportunities',
      description: 'Structured training programs and skill development',
      detail: 'Invest in your future with comprehensive training'
    },
    {
      emoji: '👥',
      title: 'Mentorship Programs',
      description: 'Guidance from experienced professionals',
      detail: 'Learn from industry veterans and accelerate growth'
    },
    {
      emoji: '📈',
      title: 'Clear Career Paths',
      description: 'Defined progression and advancement opportunities',
      detail: 'See exactly how you can advance in your career'
    },
    {
      emoji: '🏆',
      title: 'Competitive Benefits',
      description: 'Health insurance, retirement plans, and perks',
      detail: 'Full benefits packages from day one'
    }
  ];

  const industries = [
    { name: 'Technology' },
    { name: 'Healthcare' },
    { name: 'Finance' },
    { name: 'Manufacturing' },
    { name: 'Education' },
    { name: 'Non-Profit' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SkipNavigation />
      <CareerPageSEO careerKey="entry-level-careers" />
      
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3" role="img" aria-hidden="true">🎓</span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Entry-Level Careers
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Launch Your Career Journey
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Start your professional journey with entry-level opportunities at top companies. 
                  Build skills, gain experience, and accelerate your career growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://jobs.engagedheadhunters.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Browse entry-level jobs (opens in new tab)"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  >
                    Browse Entry-Level Jobs
                  </a>
                  <Link 
                    href="/submit-resume"
                    className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                  >
                    Submit Your Resume
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400" 
                  alt="Young professionals collaborating in a training session" 
                  loading="lazy"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Entry-Level Categories */}
        <section className="py-20 bg-background" aria-labelledby="entry-level-categories-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="entry-level-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Entry-Level Job Categories
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore opportunities across all industries designed for new graduates and career starters.
              </p>
            </div>

            <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Entry-level job categories">
              {entryLevelCategories.map((category, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg border border-border p-8 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{category.title}</h3>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Popular Entry-Level Roles:</div>
                    <ul className="flex flex-wrap gap-2 list-none" aria-label={`Entry-level roles in ${category.title}`}>
                      {category.roles.map((role, idx) => (
                        <li key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Career Growth Path */}
        <section className="py-20 bg-muted" aria-labelledby="career-growth-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="career-growth-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Career Growth Journey
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                See how entry-level positions can lead to leadership roles
              </p>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Career growth stages from entry-level to senior positions">
              {careerGrowth.map((stage, index) => (
                <li key={index} className="bg-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">{stage.timeframe}</h3>
                  <h4 className="text-lg font-semibold text-primary mb-4">{stage.focus}</h4>
                  
                  <ul className="space-y-3 list-none" aria-label={`Activities during ${stage.timeframe}`}>
                    {stage.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-foreground">
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Skill Development */}
        <section className="py-20 bg-background" aria-labelledby="skill-development-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="skill-development-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Skills for Career Success
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Key competencies that employers value in entry-level candidates.
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Skill development categories">
              {skillDevelopment.map((skillSet, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                  <div className="mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl" role="img" aria-hidden="true">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{skillSet.category}</h3>
                  </div>
                  
                  <ul className="space-y-2 list-none" aria-label={`Skills in ${skillSet.category}`}>
                    {skillSet.skills.map((skill, idx) => (
                      <li key={idx} className="text-sm text-foreground py-1">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industry Opportunities */}
        <section className="py-20 bg-muted" aria-labelledby="industries-hiring-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="industries-hiring-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Industries Hiring Entry-Level Talent
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Growing sectors with strong demand for new professionals
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none" aria-label="Industries actively hiring entry-level talent">
              {industries.map((industry, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                  <div className="mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl" role="img" aria-hidden="true">🎓</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-background" aria-labelledby="entry-level-benefits-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="entry-level-benefits-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Companies Offer Entry-Level Talent
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Benefits and growth opportunities for early-career professionals
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Benefits for entry-level professionals">
              {entryLevelBenefits.map((benefit, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl" role="img" aria-hidden="true">{benefit.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-3">{benefit.description}</p>
                  <p className="text-sm text-primary font-semibold">{benefit.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTASection variant="candidate" bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call" showJobsLink={true} />
      </main>

      <Footer />
    </div>
  );
};

export default EntryLevel;
