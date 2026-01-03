"use client";

import { Search } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const FinanceCareersClient = () => {
    const financeCategories = [
        {
            title: 'Investment Banking',
            roles: ['Investment Banker', 'Research Analyst', 'Portfolio Manager', 'Managing Director', 'VP Investment Banking']
        },
        {
            title: 'Corporate Finance',
            roles: ['Financial Analyst', 'FP&A Manager', 'CFO', 'Finance Director', 'Treasury Manager']
        },
        {
            title: 'Risk Management',
            roles: ['Risk Analyst', 'Risk Manager', 'Chief Risk Officer', 'Compliance Officer', 'Credit Risk Manager']
        },
        {
            title: 'Private Equity & VC',
            roles: ['Private Equity Associate', 'Venture Capitalist', 'Fund Manager', 'Deal Analyst', 'Investment Partner']
        }
    ];

    const careerPaths = [
        {
            level: 'Analyst',
            experience: '0-3 years',
            roles: ['Financial Analyst', 'Junior Analyst', 'Research Associate']
        },
        {
            level: 'Associate/Manager',
            experience: '3-6 years',
            roles: ['Senior Analyst', 'Finance Manager', 'Investment Associate']
        },
        {
            level: 'Director/VP',
            experience: '6-12 years',
            roles: ['Finance Director', 'VP Finance', 'Portfolio Manager']
        },
        {
            level: 'Executive/Partner',
            experience: '12+ years',
            roles: ['CFO', 'Managing Director', 'Investment Partner']
        }
    ];

    const specializations = [
        { name: 'Investment Banking', demand: 'High' },
        { name: 'Private Equity', demand: 'Very High' },
        { name: 'Risk Management', demand: 'High' },
        { name: 'Financial Planning', demand: 'High' },
        { name: 'Wealth Management', demand: 'High' },
        { name: 'Corporate Finance', demand: 'High' }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <CareerPageSEO careerKey="finance-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">💰</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Finance Careers
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-left">
                                    Power Your Finance Career
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-left">
                                    Connect with leading financial institutions seeking analysts, managers, and executives.
                                    From Wall Street to corporate finance, find your next opportunity.
                                </p>

                                {/* Search Bar */}
                                <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-border">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <div className="relative">
                                                <label htmlFor="finance-job-search" className="sr-only">
                                                    Search finance job roles
                                                </label>
                                                <Search className="absolute left-3 top-3 text-muted-foreground" size={20} aria-hidden="true" />
                                                <input
                                                    id="finance-job-search"
                                                    type="text"
                                                    placeholder="Finance role or specialization"
                                                    aria-describedby="finance-search-hint"
                                                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                                                />
                                                <span id="finance-search-hint" className="sr-only">
                                                    Type to search for finance positions
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            href="https://jobs.engagedheadhunters.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Search finance jobs (opens in new tab)"
                                            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                        >
                                            Search Jobs
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://jobs.engagedheadhunters.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Browse all finance jobs (opens in new tab)"
                                        className="text-primary hover:text-primary/80 font-medium"
                                    >
                                        Browse All Finance Jobs →
                                    </a>
                                    <Link href="/salary-guide" className="text-primary hover:text-primary/80 font-medium">
                                        View Salary Guide →
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400"
                                    alt="Finance professionals analyzing financial data and market trends"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Finance Categories */}
                <section className="py-20 bg-background" aria-labelledby="finance-categories-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="finance-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Finance Job Categories
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Explore opportunities across all finance specializations and career levels.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Finance job categories">
                            {financeCategories.map((category, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg border border-border p-8 hover:shadow-xl transition-shadow text-foreground">
                                    <h3 className="text-2xl font-bold text-foreground mb-6 text-left">{category.title}</h3>

                                    <div className="space-y-2">
                                        <div className="text-sm text-muted-foreground text-left">Popular Roles:</div>
                                        <ul className="flex flex-wrap gap-2 list-none" aria-label={`Popular roles in ${category.title}`}>
                                            {category.roles.map((role, idx) => (
                                                <li key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                                    {role}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-6 text-left">
                                        <a
                                            href="https://jobs.engagedheadhunters.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${category.title} jobs (opens in new tab)`}
                                            className="text-primary hover:text-primary/80 font-medium text-sm"
                                        >
                                            View {category.title} Jobs →
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Finance Specializations */}
                <section className="py-20 bg-muted" aria-labelledby="finance-specializations-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 text-foreground">
                            <h2 id="finance-specializations-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                High-Growth Finance Specializations
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                The most in-demand finance areas in today's market
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-3 gap-8 list-none" aria-label="Finance specializations with market demand">
                            {specializations.map((spec, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border text-foreground">
                                    <div className="mb-6">
                                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">📈</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{spec.name}</h3>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Market Demand</div>
                                        <div
                                            className={`font-semibold ${spec.demand === 'Very High' ? 'text-green-600' : 'text-primary'}`}
                                            aria-label={`Demand level: ${spec.demand}`}
                                        >
                                            {spec.demand}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="text-center mt-8">
                            <Link href="/salary-guide" className="text-primary hover:text-primary/80 font-medium">
                                View compensation data for these specializations →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Career Progression */}
                <section className="py-20 bg-background" aria-labelledby="finance-career-paths-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="finance-career-paths-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Finance Career Progression
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Chart your path from entry-level analyst to finance executive.
                            </p>
                        </div>

                        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Finance career progression from analyst to executive">
                            {careerPaths.map((path, index) => (
                                <li key={index} className="bg-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-border text-foreground">
                                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">{index + 1}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-4">{path.level}</h3>

                                    <div className="mb-6">
                                        <div className="text-sm text-muted-foreground mb-2">Experience Required</div>
                                        <div className="font-semibold text-primary">{path.experience}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">Typical Roles</div>
                                        <ul className="space-y-1 list-none" aria-label={`Typical roles at ${path.level} level`}>
                                            {path.roles.map((role, idx) => (
                                                <li key={idx} className="text-sm text-foreground">{role}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Browse Jobs CTA */}
                <section className="py-20 bg-muted" aria-labelledby="finance-cta-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-12">
                            <h2 id="finance-cta-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Ready to Find Your Next Finance Role?
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Browse our current finance openings or connect with a recruiter for personalized career guidance.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://jobs.engagedheadhunters.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Browse all finance jobs (opens in new tab)"
                                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                            >
                                Browse All Finance Jobs
                            </a>
                            <Link
                                href="/submit-resume"
                                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                            >
                                Submit Your Resume
                            </Link>
                        </div>
                    </div>
                </section>

                <CTASection
                    variant="candidate"
                    title="Ready to Elevate Your Finance Career?"
                    description="Connect with our finance recruiting specialists who understand the industry's complexities and can match you with prestigious opportunities."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                    showJobsLink={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default FinanceCareersClient;
