"use client";

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const ExecutiveCareersClient = () => {
    const executiveRoles = [
        {
            title: 'C-Suite Positions',
            roles: ['CEO', 'COO', 'CFO', 'CTO', 'CHRO', 'CMO']
        },
        {
            title: 'Board Positions',
            roles: ['Board Director', 'Independent Director', 'Board Chair', 'Committee Chair', 'Advisory Board']
        },
        {
            title: 'Division Leadership',
            roles: ['Division President', 'General Manager', 'Regional Director', 'Business Unit Head']
        },
        {
            title: 'Functional Leadership',
            roles: ['VP Sales', 'VP Marketing', 'VP Operations', 'VP Finance', 'VP Technology']
        }
    ];

    const executiveSkills = [
        {
            category: 'Strategic Leadership',
            skills: ['Vision Setting', 'Strategic Planning', 'Change Management', 'M&A Experience']
        },
        {
            category: 'Financial Acumen',
            skills: ['P&L Management', 'Capital Allocation', 'Investor Relations', 'Risk Management']
        },
        {
            category: 'People Leadership',
            skills: ['Team Building', 'Talent Development', 'Culture Transformation', 'Board Relations']
        },
        {
            category: 'Industry Expertise',
            skills: ['Market Knowledge', 'Competitive Intelligence', 'Regulatory Compliance', 'Technology Innovation']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <CareerPageSEO careerKey="executive-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">👑</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Executive Opportunities
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                                    Lead at the Highest Level
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                                    Access exclusive C-suite, board, and senior leadership opportunities.
                                    Shape the future of organizations and drive transformational growth.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Schedule a confidential discussion (opens in new tab)"
                                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                    >
                                        Confidential Discussion
                                    </a>
                                    <Link
                                        href="/james-pemberton"
                                        className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                                    >
                                        Meet Our CEO
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&h=400"
                                    alt="Executive boardroom meeting with senior leaders"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Executive Role Categories */}
                <section className="py-20 bg-background" aria-labelledby="executive-roles-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="executive-roles-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Executive Leadership Opportunities
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                From C-suite positions to board roles, discover opportunities to lead
                                at the highest levels of business.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Executive role categories">
                            {executiveRoles.map((category, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg border border-border p-8 hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-foreground mb-6">{category.title}</h3>

                                    <div className="space-y-2">
                                        <div className="text-sm text-muted-foreground text-left">Role Types:</div>
                                        <ul className="flex flex-wrap gap-2 list-none" aria-label={`Role types in ${category.title}`}>
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

                {/* Executive Skills */}
                <section className="py-20 bg-muted" aria-labelledby="executive-skills-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="executive-skills-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Executive Leadership Competencies
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                Key skills and capabilities sought by boards and shareholders
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Executive competency categories">
                            {executiveSkills.map((skillSet, index) => (
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

                {/* CTA Section */}
                <section className="py-20 bg-primary" aria-labelledby="executive-cta-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 id="executive-cta-heading" className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                            Ready for Your Next Executive Role?
                        </h2>
                        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                            Connect with our executive search specialists who work exclusively with C-suite
                            and board-level opportunities. Confidential and professional.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                            <a
                                href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Schedule a confidential discussion (opens in new tab)"
                                className="bg-background text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-background/90 transition-colors flex-1 text-center"
                            >
                                Confidential Discussion
                            </a>
                            <Link
                                href="/careers"
                                className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors flex-1 text-center"
                            >
                                Browse All Careers
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ExecutiveCareersClient;
