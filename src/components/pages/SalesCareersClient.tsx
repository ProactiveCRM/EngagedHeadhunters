"use client";

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const SalesCareersClient = () => {
    const salesCategories = [
        {
            title: 'Enterprise Sales',
            roles: ['Enterprise AE', 'Strategic Account Manager', 'Key Account Director', 'Major Account Executive']
        },
        {
            title: 'Sales Leadership',
            roles: ['Sales Manager', 'Regional Director', 'VP Sales', 'Chief Revenue Officer', 'Sales Operations']
        },
        {
            title: 'Business Development',
            roles: ['BDR', 'SDR', 'Business Development Manager', 'Partnership Manager', 'Channel Manager']
        },
        {
            title: 'Technical Sales',
            roles: ['Sales Engineer', 'Technical Account Manager', 'Solutions Consultant', 'Pre-Sales Engineer']
        }
    ];

    const industries = [
        { name: 'Technology', cycle: '6-12 months' },
        { name: 'Healthcare', cycle: '9-18 months' },
        { name: 'Financial Services', cycle: '12-24 months' },
        { name: 'Manufacturing', cycle: '6-15 months' },
        { name: 'Professional Services', cycle: '3-9 months' },
        { name: 'Real Estate', cycle: '1-6 months' }
    ];

    const salesSkills = [
        {
            category: 'Core Sales Skills',
            skills: ['Consultative Selling', 'Relationship Building', 'Negotiation', 'Closing Techniques', 'Territory Management']
        },
        {
            category: 'Technology Skills',
            skills: ['CRM Proficiency', 'Sales Analytics', 'Social Selling', 'Video Conferencing', 'Lead Generation Tools']
        },
        {
            category: 'Communication',
            skills: ['Presentation Skills', 'Active Listening', 'Objection Handling', 'Storytelling', 'Executive Presence']
        },
        {
            category: 'Business Acumen',
            skills: ['Industry Knowledge', 'Financial Analysis', 'Competitive Intelligence', 'Solution Selling', 'ROI Justification']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <CareerPageSEO careerKey="sales-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center text-foreground">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">🤝</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Sales Careers
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-left">
                                    Accelerate Your Sales Career
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-left">
                                    Connect with high-growth companies seeking sales professionals, account executives,
                                    and revenue leaders. Unlimited earning potential awaits.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://jobs.engagedheadhunters.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Browse sales jobs (opens in new tab)"
                                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                    >
                                        Browse Sales Jobs
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
                                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&h=400"
                                    alt="Sales team celebrating successful deal closure"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sales Categories */}
                <section className="py-20 bg-background" aria-labelledby="sales-categories-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 text-foreground">
                            <h2 id="sales-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Sales Job Categories
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                From business development to executive sales leadership - find your perfect sales opportunity.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Sales job categories">
                            {salesCategories.map((category, index) => (
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Industry Sectors */}
                <section className="py-20 bg-muted" aria-labelledby="sales-industries-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-16">
                            <h2 id="sales-industries-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                High-Earning Sales Industries
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                Industries with strong commission structures and career growth
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none" aria-label="Sales industries with typical sales cycles">
                            {industries.map((industry, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                                    <div className="mb-6">
                                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">💵</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Typical Sales Cycle</div>
                                        <div className="font-semibold text-primary">{industry.cycle}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Sales Skills */}
                <section className="py-20 bg-background" aria-labelledby="sales-skills-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="sales-skills-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                In-Demand Sales Skills
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Key competencies that drive success in modern sales environments.
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Sales skill categories">
                            {salesSkills.map((skillSet, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border text-foreground">
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

                <CTASection variant="candidate" bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call" showJobsLink={true} />
            </main>

            <Footer />
        </div>
    );
};

export default SalesCareersClient;
