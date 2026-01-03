import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="bg-[hsl(var(--dark-navy))] dark:bg-card text-[hsl(var(--text-on-dark))] dark:text-foreground py-16 dark:border-t dark:border-border"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png"
                alt="Engaged Headhunters Logo"
                className="h-10 w-auto mr-3"
              />
              <h3 className="text-2xl font-bold">
                Engaged<span className="text-primary">Headhunters</span>
              </h3>
            </div>
            <p className="text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground mb-6 leading-relaxed">
              Elite staffing and recruiting agency connecting exceptional talent with top organizations
              through executive search, direct hire, and contract staffing solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/engaged-headhunters"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-primary transition-colors"
                aria-label="Visit Engaged Headhunters on LinkedIn (opens in new tab)"
              >
                <span className="text-xl" role="img" aria-hidden="true">💼</span>
              </a>
            </div>
          </div>

          <nav aria-label="Services navigation">
            <h4 className="text-lg font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-3 text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground">
              <li><Link href="/executive-search" className="hover:text-primary transition-colors">Executive Search</Link></li>
              <li><Link href="/contract-staffing" className="hover:text-primary transition-colors">Contract Staffing</Link></li>
              <li><Link href="/temporary-staffing" className="hover:text-primary transition-colors">Temporary Staffing</Link></li>
              <li><Link href="/healthcare-staffing" className="hover:text-primary transition-colors">Healthcare Staffing</Link></li>
              <li><Link href="/technology-recruiting" className="hover:text-primary transition-colors">Technology Recruiting</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">All Services</Link></li>
            </ul>
          </nav>

          <nav aria-label="Industries navigation">
            <h4 className="text-lg font-semibold mb-4 text-primary">Industries</h4>
            <ul className="space-y-3 text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground">
              <li><Link href="/niches/technology" className="hover:text-primary transition-colors">Technology</Link></li>
              <li><Link href="/niches/healthcare" className="hover:text-primary transition-colors">Healthcare</Link></li>
              <li><Link href="/niches/finance" className="hover:text-primary transition-colors">Finance</Link></li>
              <li><Link href="/niches/manufacturing" className="hover:text-primary transition-colors">Manufacturing</Link></li>
              <li><Link href="/niches" className="hover:text-primary transition-colors">All Industries</Link></li>
            </ul>
          </nav>

          <nav aria-label="Resources navigation">
            <h4 className="text-lg font-semibold mb-4 text-primary">Resources</h4>
            <ul className="space-y-3 text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground">
              <li><Link href="/salary-guide" className="hover:text-primary transition-colors">Salary Guide</Link></li>
              <li><Link href="/submit-resume" className="hover:text-primary transition-colors">Submit Resume</Link></li>
              <li><Link href="/job-locations" className="hover:text-primary transition-colors">Job Locations</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/alliance" className="hover:text-primary transition-colors">Join Alliance</Link></li>
              <li><Link href="/recruiter-signup" className="hover:text-primary transition-colors">Become a Recruiter</Link></li>
            </ul>
          </nav>

          <div aria-label="Contact information">
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact Us</h4>
            <address className="space-y-4 text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground not-italic">
              <div className="flex items-start space-x-2">
                <span className="text-primary mt-1" role="img" aria-hidden="true">📍</span>
                <div>
                  <div className="font-medium text-[hsl(var(--text-on-dark))] dark:text-foreground">Virginia Beach Office</div>
                  <div className="text-sm">249 Central Park Ave Suite 300-90</div>
                  <div className="text-sm">Virginia Beach, VA 23462</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-primary mt-1" role="img" aria-hidden="true">📞</span>
                <div>
                  <a href="tel:+17577207173" className="font-medium text-[hsl(var(--text-on-dark))] dark:text-foreground hover:text-primary transition-colors">(757) 720-7173</a>
                  <div className="text-sm">Mon-Fri 8AM-6PM EST</div>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 dark:border-border pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground text-sm mb-4 lg:mb-0">
              © {new Date().getFullYear()} Engaged Headhunters. All rights reserved. | Founded 2022
            </div>
            <nav aria-label="Legal navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[hsl(var(--text-on-dark-muted))] dark:text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/confidentiality" className="hover:text-primary transition-colors">Confidentiality Agreement</Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
              <Link href="/for-recruiters" className="hover:text-primary transition-colors">Partner Portal</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;