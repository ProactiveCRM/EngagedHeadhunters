"use client";

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const ManufacturingCareersClient = () => {
    const manufacturingCategories = [
        {
            title: 'Operations Management',
            roles: ['Plant Manager', 'Operations Director', 'Production Manager', 'Shift Supervisor', 'Facility Manager']
        },
        {
            title: 'Quality & Compliance',
            roles: ['Quality Manager', 'QA Director', 'Compliance Officer', 'Quality Engineer', 'Process Improvement']
        },
        {
            title: 'Engineering & Maintenance',
            roles: ['Manufacturing Engineer', 'Maintenance Manager', 'Process Engineer', 'Reliability Engineer']
        },
        {
            title: 'Supply Chain & Logistics',
            roles: ['Supply Chain Manager', 'Logistics Director', 'Procurement Manager', 'Distribution Manager']
        }
    ];

    const industries = [
        { name: 'Automotive', locations: ['Detroit', 'Nashville', 'Louisville'] },
        { name: 'Aerospace', locations: ['Seattle', 'Wichita', 'Phoenix'] },
        { name: 'Food & Beverage', locations: ['Chicago', 'Atlanta', 'Dallas'] },
        { name: 'Pharmaceuticals', locations: ['Boston', 'New Jersey', 'San Diego'] },
        { name: 'Electronics', locations: ['Silicon Valley', 'Austin', 'Raleigh'] },
        { name: 'Energy', locations: ['Houston', 'Denver', 'Pittsburgh'] }
    ];

    const skills = [
        {
            category: 'Technical Skills',
            skills: ['Lean Manufacturing', 'Six Sigma', 'ISO Standards', 'OSHA Compliance', 'Statistical Process Control']
        },
        {
            category: 'Leadership Skills',
            skills: ['Team Management', 'Change Leadership', 'Cross-functional Collaboration', 'Performance Management']
        },
        {
            category: 'Technology Skills',
            skills: ['ERP Systems', 'MES Software', 'Automation', 'Industry 4.0', 'Data Analytics']
        },
        {
            category: 'Safety & Quality',
            skills: ['Safety Management', 'Risk Assessment', 'Quality Systems', 'Continuous Improvement', 'Regulatory Compliance']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <CareerPageSEO careerKey="manufacturing-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center text-foreground">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">🏭</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Manufacturing Careers
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-left">
                                    Build America's Future
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-left">
                                    Connect with leading manufacturers seeking operations managers, quality leaders,
                                    and engineering professionals. Drive innovation and efficiency in American manufacturing.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://jobs.engagedheadhunters.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Browse manufacturing jobs (opens in new tab)"
                                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                    >
                                        Browse Manufacturing Jobs
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
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400"
                                    alt="Modern manufacturing facility with advanced automation"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Manufacturing Categories */}
                <section className="py-20 bg-background" aria-labelledby="manufacturing-categories-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="manufacturing-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Manufacturing Job Categories
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Explore opportunities across all manufacturing disciplines and leadership levels.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Manufacturing job categories">
                            {manufacturingCategories.map((category, index) => (
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
                <section className="py-20 bg-muted" aria-labelledby="manufacturing-industries-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 text-foreground">
                            <h2 id="manufacturing-industries-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Manufacturing Industry Sectors
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                High-growth sectors with strong job demand and career advancement
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none" aria-label="Manufacturing industry sectors with top locations">
                            {industries.map((industry, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border text-foreground">
                                    <div className="mb-6">
                                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">⚙️</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">Top Locations</div>
                                        <ul className="space-y-1 list-none" aria-label={`Top locations for ${industry.name}`}>
                                            {industry.locations.map((location, idx) => (
                                                <li key={idx} className="text-sm text-foreground">{location}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Required Skills */}
                <section className="py-20 bg-background" aria-labelledby="manufacturing-skills-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="manufacturing-skills-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                In-Demand Manufacturing Skills
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Key competencies that drive success in modern manufacturing environments.
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Manufacturing skill categories">
                            {skills.map((skillSet, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border text-foreground">
                                    <div className="mb-6">
                                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">🛡️</span>
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

export default ManufacturingCareersClient;
