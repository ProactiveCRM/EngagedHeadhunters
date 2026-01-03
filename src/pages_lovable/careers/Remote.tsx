
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTASection from '../../components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import { CareerPageSEO } from '@/components/seo/CareerPageSEO';

const Remote = () => {
  const remoteCategories = [
    {
      title: 'Technology & Engineering',
      roles: ['Software Engineer', 'DevOps Engineer', 'Data Scientist', 'Product Manager', 'UX Designer']
    },
    {
      title: 'Marketing & Sales',
      roles: ['Digital Marketer', 'Sales Representative', 'Content Creator', 'SEO Specialist', 'Account Manager']
    },
    {
      title: 'Customer Success & Support',
      roles: ['Customer Success Manager', 'Technical Support', 'Community Manager', 'Training Specialist']
    },
    {
      title: 'Operations & Administration',
      roles: ['Operations Manager', 'Executive Assistant', 'HR Specialist', 'Finance Analyst', 'Project Manager']
    }
  ];

  const remoteTypes = [
    {
      type: 'Fully Remote',
      description: 'Work from anywhere, no office required',
      benefits: ['Global opportunities', 'Ultimate flexibility', 'No commute']
    },
    {
      type: 'Remote-First',
      description: 'Company designed around remote work',
      benefits: ['Strong remote culture', 'Great tools & processes', 'Occasional meetups']
    },
    {
      type: 'Hybrid Remote',
      description: 'Mix of remote and office work',
      benefits: ['Flexible scheduling', 'Best of both worlds', 'Team collaboration']
    }
  ];

  const remoteBenefits = [
    {
      emoji: '🌍',
      title: 'Global Opportunities',
      description: 'Access jobs from companies worldwide',
      detail: 'Work for top companies regardless of location'
    },
    {
      emoji: '🏠',
      title: 'Work-Life Balance',
      description: 'Better balance between personal and professional life',
      detail: 'No commute, flexible hours, family time'
    },
    {
      emoji: '📈',
      title: 'Career Growth',
      description: 'Access to more senior roles and opportunities',
      detail: 'Expanded job market increases options'
    },
    {
      emoji: '👥',
      title: 'Diverse Teams',
      description: 'Collaborate with talent from around the world',
      detail: 'Learn from global perspectives and expertise'
    }
  ];

  const remoteSkills = [
    {
      category: 'Communication',
      skills: ['Written Communication', 'Video Conferencing', 'Async Communication', 'Documentation', 'Active Listening']
    },
    {
      category: 'Technology',
      skills: ['Cloud Platforms', 'Collaboration Tools', 'Project Management Software', 'VPN Usage', 'Cybersecurity']
    },
    {
      category: 'Self-Management',
      skills: ['Time Management', 'Self-Motivation', 'Goal Setting', 'Productivity Tools', 'Focus Techniques']
    },
    {
      category: 'Virtual Collaboration',
      skills: ['Team Coordination', 'Cross-timezone Work', 'Digital Workflows', 'Remote Presentations', 'Virtual Leadership']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SkipNavigation />
      <CareerPageSEO careerKey="remote-careers" />
      
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3" role="img" aria-hidden="true">💻</span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Remote Opportunities
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Work From Anywhere
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Discover remote, hybrid, and work-from-home opportunities with leading companies. 
                  Build your career without geographic limitations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://jobs.engagedheadhunters.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Browse remote jobs (opens in new tab)"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  >
                    Browse Remote Jobs
                  </a>
                  <Link 
                    href="/salary-guide"
                    className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                  >
                    View Salary Guide
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&h=400" 
                  alt="Professional working remotely from a home office setup" 
                  loading="lazy"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Remote Job Categories */}
        <section className="py-20 bg-background" aria-labelledby="remote-categories-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="remote-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Remote Job Categories
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore remote opportunities across all industries and skill levels.
              </p>
            </div>

            <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Remote job categories">
              {remoteCategories.map((category, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg border border-border p-8 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{category.title}</h3>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Popular Remote Roles:</div>
                    <ul className="flex flex-wrap gap-2 list-none" aria-label={`Popular remote roles in ${category.title}`}>
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

        {/* Remote Work Types */}
        <section className="py-20 bg-muted" aria-labelledby="remote-types-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="remote-types-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Types of Remote Work
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Understanding different remote work arrangements
              </p>
            </div>

            <ul className="grid md:grid-cols-3 gap-8 list-none" aria-label="Types of remote work arrangements">
              {remoteTypes.map((type, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                  <div className="mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl" role="img" aria-hidden="true">📶</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{type.type}</h3>
                    <p className="text-muted-foreground">{type.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground mb-2">Key Benefits:</div>
                    <ul className="list-none" aria-label={`Benefits of ${type.type}`}>
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-foreground py-1">
                          • {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Remote Work Benefits */}
        <section className="py-20 bg-background" aria-labelledby="remote-benefits-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="remote-benefits-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Remote Work?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                The advantages of remote career opportunities
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Benefits of remote work">
              {remoteBenefits.map((benefit, index) => (
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

        {/* Remote Skills */}
        <section className="py-20 bg-muted" aria-labelledby="remote-skills-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="remote-skills-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Essential Remote Work Skills
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Key competencies for success in remote work environments.
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Remote work skill categories">
              {remoteSkills.map((skillSet, index) => (
                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                  <div className="mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl" role="img" aria-hidden="true">🖥️</span>
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

        <CTASection variant="candidate" bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call" showJobsLink={true} />
      </main>

      <Footer />
    </div>
  );
};

export default Remote;
