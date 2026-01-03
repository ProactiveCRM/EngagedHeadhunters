import {   } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Site Map</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete navigation guide to all pages and resources on EngagedHeadhunters.com
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
            
            {/* Services Silo */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Services</h2>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">All Services (Hub)</Link></li>
                <li><Link href="/executive-search" className="text-muted-foreground hover:text-primary transition-colors">Executive Search</Link></li>
                <li><Link href="/healthcare-staffing" className="text-muted-foreground hover:text-primary transition-colors">Healthcare Staffing</Link></li>
                <li><Link href="/technology-recruiting" className="text-muted-foreground hover:text-primary transition-colors">Technology Recruiting</Link></li>
                <li><Link href="/finance-recruiting" className="text-muted-foreground hover:text-primary transition-colors">Finance Recruiting</Link></li>
                <li><Link href="/manufacturing-recruiting" className="text-muted-foreground hover:text-primary transition-colors">Manufacturing Recruiting</Link></li>
                <li><Link href="/sales-recruiting" className="text-muted-foreground hover:text-primary transition-colors">Sales Recruiting</Link></li>
                <li><Link href="/contract-staffing" className="text-muted-foreground hover:text-primary transition-colors">Contract Staffing</Link></li>
                <li><Link href="/temporary-staffing" className="text-muted-foreground hover:text-primary transition-colors">Temporary Staffing</Link></li>
              </ul>
            </div>

            {/* Careers Silo */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Careers</h2>
              <ul className="space-y-3">
                <li><Link href="/careers" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">All Careers (Hub)</Link></li>
                <li><Link href="/healthcare-careers" className="text-muted-foreground hover:text-primary transition-colors">Healthcare Careers</Link></li>
                <li><Link href="/technology-careers" className="text-muted-foreground hover:text-primary transition-colors">Technology Careers</Link></li>
                <li><Link href="/finance-careers" className="text-muted-foreground hover:text-primary transition-colors">Finance Careers</Link></li>
                <li><Link href="/executive-careers" className="text-muted-foreground hover:text-primary transition-colors">Executive Careers</Link></li>
                <li><Link href="/manufacturing-careers" className="text-muted-foreground hover:text-primary transition-colors">Manufacturing Careers</Link></li>
                <li><Link href="/sales-careers" className="text-muted-foreground hover:text-primary transition-colors">Sales Careers</Link></li>
                <li><Link href="/contract-careers" className="text-muted-foreground hover:text-primary transition-colors">Contract Careers</Link></li>
                <li><Link href="/remote-careers" className="text-muted-foreground hover:text-primary transition-colors">Remote Careers</Link></li>
                <li><Link href="/entry-level-careers" className="text-muted-foreground hover:text-primary transition-colors">Entry-Level Careers</Link></li>
              </ul>
            </div>

            {/* Locations Silo */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Locations</h2>
              <ul className="space-y-3">
                <li><Link href="/locations" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">All Locations (Hub)</Link></li>
                <li><Link href="/houston" className="text-muted-foreground hover:text-primary transition-colors">Houston Market</Link></li>
                <li><Link href="/job-locations" className="text-muted-foreground hover:text-primary transition-colors">Job Locations</Link></li>
              </ul>
            </div>

            {/* Alliance & Agents Silo */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Alliance & Agents</h2>
              <ul className="space-y-3">
                <li><Link href="/alliance" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">Join the Alliance (Hub)</Link></li>
                <li><Link href="/houston-opportunity" className="text-muted-foreground hover:text-primary transition-colors">Houston Opportunity</Link></li>
                <li><Link href="/agents" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">Our Agents (Hub)</Link></li>
                <li><Link href="/james-pemberton" className="text-muted-foreground hover:text-primary transition-colors">James Pemberton</Link></li>
                <li><Link href="/for-recruiters" className="text-muted-foreground hover:text-primary transition-colors">For Recruiters</Link></li>
              </ul>
            </div>

            {/* Industries (Niches) Silo */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Industries</h2>
              <ul className="space-y-3">
                <li><Link href="/niches" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">All Industries (Hub)</Link></li>
                <li><Link href="/niches/healthcare" className="text-muted-foreground hover:text-primary transition-colors">Healthcare</Link></li>
                <li><Link href="/niches/technology" className="text-muted-foreground hover:text-primary transition-colors">Technology</Link></li>
                <li><Link href="/niches/finance" className="text-muted-foreground hover:text-primary transition-colors">Finance</Link></li>
                <li><Link href="/niches/manufacturing" className="text-muted-foreground hover:text-primary transition-colors">Manufacturing</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-card rounded-lg shadow-lg p-6 border">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">Resources</h2>
              <ul className="space-y-3">
                <li><Link href="/candidates" className="text-muted-foreground hover:text-primary transition-colors">For Candidates</Link></li>
                <li><Link href="/employers" className="text-muted-foreground hover:text-primary transition-colors">For Employers</Link></li>
                <li><Link href="/salary-guide" className="text-muted-foreground hover:text-primary transition-colors">Salary Guide</Link></li>
                <li><Link href="/submit-resume" className="text-muted-foreground hover:text-primary transition-colors">Submit Resume</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              </ul>
            </div>

          </div>

          {/* Company Pages - Full Width Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Company Information</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 text-center">
              <Link href="/" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Home</div>
              </Link>
              <Link href="/about" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">About Us</div>
              </Link>
              <Link href="/contact" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Contact Us</div>
              </Link>
              <Link href="/privacy-policy" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Privacy Policy</div>
              </Link>
              <Link href="/terms-of-service" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Terms of Service</div>
              </Link>
              <Link href="/confidentiality" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Confidentiality Agreement</div>
              </Link>
              <Link href="/auth" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Agent Login</div>
              </Link>
              <Link href="/sitemap" className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-foreground hover:text-primary transition-colors font-medium">Sitemap</div>
              </Link>
            </div>
          </div>

          {/* SEO Information */}
          <div className="mt-12 text-center bg-muted rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">About This Sitemap</h3>
            <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This HTML sitemap provides a comprehensive overview of all pages and resources available on EngagedHeadhunters.com. 
              Our site is organized into clear silos: Services, Careers, Locations, Alliance & Agents, and Industries. 
              Each silo has a hub page linking to related content pages. This structure improves navigation for users 
              and helps search engines understand and index our content effectively.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()} | Total pages: 40+</p>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;