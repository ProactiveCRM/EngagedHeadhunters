import { ArrowRight, Search } from 'lucide-react';
import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import { CareerPageSEO } from '@/components/seo/CareerPageSEO';

const Technology = () => {
  const techCategories = [
    {
      title: "Software Engineering",
      roles: ["Full Stack Developer", "Backend Engineer", "Frontend Developer", "DevOps Engineer"],
      emoji: "💻"
    },
    {
      title: "Data & Analytics",
      roles: ["Data Scientist", "Data Engineer", "Business Analyst", "ML Engineer"],
      emoji: "📊"
    },
    {
      title: "Product & Design",
      roles: ["Product Manager", "UX Designer", "UI Designer", "Product Owner"],
      emoji: "🎨"
    }
  ];

  const techStacks = [
    { name: "React/Node.js", demand: "Very High" },
    { name: "Python/Django", demand: "High" },
    { name: "AWS/Cloud", demand: "Very High" },
    { name: "AI/ML", demand: "Very High" },
    { name: "Kubernetes", demand: "High" },
    { name: "Data Engineering", demand: "High" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SkipNavigation />
      <CareerPageSEO careerKey="technology-careers" />
      
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background" aria-label="Page introduction">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Technology Careers
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                  Build Your Future in <span className="text-primary">Technology</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  From startups to Fortune 500 companies, we connect talented technologists 
                  with roles that match their skills and ambitions. Access exclusive opportunities 
                  with companies leading digital transformation.
                </p>
                
                {/* Job Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex-1 relative">
                    <label htmlFor="tech-job-search" className="sr-only">
                      Search technology job roles
                    </label>
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} aria-hidden="true" />
                    <input 
                      id="tech-job-search"
                      type="text" 
                      placeholder="Search technology roles..."
                      aria-describedby="tech-search-hint"
                      className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span id="tech-search-hint" className="sr-only">
                      Type to search for technology positions
                    </span>
                  </div>
                  <a 
                    href="https://jobs.engagedheadhunters.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Browse all technology jobs (opens in new tab)"
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    Browse All Tech Jobs
                    <ArrowRight className="ml-2" size={20} aria-hidden="true" />
                  </a>
                </div>

                <Link href="/salary-guide" className="text-primary hover:underline font-medium">
                  View Tech Salary Guide →
                </Link>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400" 
                  alt="Technology professionals collaborating on software development" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">Tech</div>
                  <div className="text-primary-foreground/80">Career Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Job Categories */}
        <section className="py-20 bg-background" aria-labelledby="tech-categories-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="tech-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Technology Job Categories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore opportunities across all technology disciplines
              </p>
            </div>

            <ul className="grid md:grid-cols-3 gap-8 list-none" aria-label="Technology job categories">
              {techCategories.map((category, index) => (
                <li key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl" role="img" aria-hidden="true">{category.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-6 list-none" aria-label={`Popular roles in ${category.title}`}>
                    <li className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Popular Roles</li>
                    {category.roles.map((role, roleIndex) => (
                      <li key={roleIndex} className="text-foreground">{role}</li>
                    ))}
                  </ul>
                  <a 
                    href="https://jobs.engagedheadhunters.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View ${category.title} jobs (opens in new tab)`}
                    className="text-primary hover:underline font-medium inline-flex items-center"
                  >
                    View Jobs <ArrowRight className="ml-1" size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* In-Demand Skills */}
        <section className="py-20 bg-muted" aria-labelledby="tech-skills-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="tech-skills-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                In-Demand Technology Skills
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Skills that employers are actively seeking
              </p>
            </div>

            <ul className="grid md:grid-cols-3 gap-6 list-none" aria-label="In-demand technology skills with market demand levels">
              {techStacks.map((stack, index) => (
                <li key={index} className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">{stack.name}</span>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stack.demand === 'Very High' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                      aria-label={`Demand level: ${stack.demand}`}
                    >
                      {stack.demand}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center mt-12">
              <Link 
                href="/salary-guide"
                className="text-primary hover:underline font-medium"
              >
                View compensation data for these skills →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background" aria-labelledby="tech-cta-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="tech-cta-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Advance Your Tech Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Submit your resume for personalized job matching or browse our current openings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/submit-resume"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Submit Your Resume
              </Link>
              <a 
                href="https://jobs.engagedheadhunters.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Browse technology jobs (opens in new tab)"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Browse Tech Jobs
              </a>
            </div>
          </div>
        </section>

        <CTASection 
          variant="candidate"
          title="Let's Discuss Your Career Goals"
          description="Schedule a confidential conversation with our technology recruiting specialists."
          bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
          showJobsLink={true}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Technology;
