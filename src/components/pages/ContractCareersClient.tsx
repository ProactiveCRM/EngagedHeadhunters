"use client";

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const ContractCareersClient = () => {
    const contractTypes = [
        {
            title: 'Consulting Projects',
            duration: '3-12 months',
            roles: ['Strategy Consultant', 'IT Consultant', 'Management Consultant', 'Process Improvement', 'Change Management']
        },
        {
            title: 'Interim Leadership',
            duration: '6-18 months',
            roles: ['Interim CEO', 'Interim CFO', 'Interim CTO', 'Project Director', 'Turnaround Manager']
        },
        {
            title: 'Project-Based Work',
            duration: '1-6 months',
            roles: ['Project Manager', 'Business Analyst', 'Technical Specialist', 'Marketing Consultant', 'HR Consultant']
        },
        {
            title: 'Fractional Roles',
            duration: '6-24 months',
            roles: ['Fractional CMO', 'Fractional CTO', 'Fractional CFO', 'Part-time Executive', 'Board Advisor']
        }
    ];

    const industries = [
        { name: 'Technology', specialties: ['Software Development', 'Cybersecurity', 'Data Analytics'] },
        { name: 'Healthcare', specialties: ['Healthcare IT', 'Compliance', 'Operations'] },
        { name: 'Finance', specialties: ['Financial Analysis', 'Risk Management', 'M&A'] },
        { name: 'Manufacturing', specialties: ['Process Improvement', 'Quality Systems', 'Operations'] },
        { name: 'Professional Services', specialties: ['Strategy', 'Operations', 'HR Consulting'] },
        { name: 'Non-Profit', specialties: ['Grant Writing', 'Fundraising', 'Program Management'] }
    ];

    const benefits = [
        {
            emoji: '💰',
            title: 'Premium Rates',
            description: 'Earn competitive rates for specialized expertise',
            detail: 'Premium compensation for your skills'
        },
        {
            emoji: '⏰',
            title: 'Flexible Schedule',
            description: 'Control your time and work-life balance',
            detail: 'Choose projects that fit your lifestyle'
        },
        {
            emoji: '📈',
            title: 'Diverse Experience',
            description: 'Work with multiple industries and companies',
            detail: 'Build a varied and impressive portfolio'
        },
        {
            emoji: '👥',
            title: 'Elite Network',
            description: 'Connect with top-tier professionals',
            detail: 'Access to exclusive opportunities'
        }
    ];

    const contractTips = [
        {
            category: 'Rate Negotiation',
            tips: ['Research market rates for your specialty', 'Factor in benefits and overhead costs', 'Consider project complexity and timeline', 'Build in rate increases for long-term contracts']
        },
        {
            category: 'Project Success',
            tips: ['Define clear deliverables and timelines', 'Establish regular communication schedules', 'Document all work and decisions', 'Build strong client relationships']
        },
        {
            category: 'Business Management',
            tips: ['Set up proper business structure', 'Maintain professional insurance', 'Track expenses and invoicing', 'Plan for gaps between projects']
        },
        {
            category: 'Career Growth',
            tips: ['Specialize in high-demand skills', 'Build a strong personal brand', 'Collect client testimonials', 'Network within your industry']
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SkipNavigation />
            <CareerPageSEO careerKey="contract-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">💼</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Contract Opportunities
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-left">
                                    Freedom & Premium Rates
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-left">
                                    Discover high-paying contract, consulting, and fractional opportunities.
                                    Enjoy flexibility while earning premium rates for your expertise.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://jobs.engagedheadhunters.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Browse contract jobs (opens in new tab)"
                                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                    >
                                        Browse Contract Jobs
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
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&h=400"
                                    alt="Consultant working on a project in a modern workspace"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contract Types */}
                <section className="py-20 bg-background" aria-labelledby="contract-types-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-16">
                            <h2 id="contract-types-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Contract Opportunity Types
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                From short-term projects to long-term fractional roles - find the perfect fit for your expertise.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Contract opportunity types">
                            {contractTypes.map((type, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg border border-border p-8 hover:shadow-xl transition-shadow">
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-2 sm:mb-0">{type.title}</h3>
                                        <div className="text-left sm:text-right">
                                            <div className="text-sm text-muted-foreground">Typical Duration</div>
                                            <div className="text-lg font-semibold text-primary">{type.duration}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <div className="text-sm text-muted-foreground">Common Roles:</div>
                                        <ul className="flex flex-wrap gap-2 list-none" aria-label={`Roles in ${type.title}`}>
                                            {type.roles.map((role, idx) => (
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

                {/* Industry Demand */}
                <section className="py-20 bg-muted" aria-labelledby="contract-industries-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-16">
                            <h2 id="contract-industries-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                High-Demand Contract Industries
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                Industries with strong demand for contract professionals
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none" aria-label="Industries hiring contract professionals">
                            {industries.map((industry, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                                    <div className="mb-6">
                                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">🏢</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{industry.name}</h3>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2 text-center">Top Specialties</div>
                                        <ul className="space-y-1 list-none" aria-label={`Specialties in ${industry.name}`}>
                                            {industry.specialties.map((specialty, idx) => (
                                                <li key={idx} className="text-sm text-foreground">{specialty}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20 bg-background" aria-labelledby="contract-benefits-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-16">
                            <h2 id="contract-benefits-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Why Choose Contract Work?
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                The advantages of contract and consulting careers
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Benefits of contract work">
                            {benefits.map((benefit, index) => (
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

                {/* Contract Tips */}
                <section className="py-20 bg-muted" aria-labelledby="contract-tips-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
                        <div className="text-center mb-16">
                            <h2 id="contract-tips-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Contract Work Success Tips
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Expert advice for thriving in the contract and consulting world.
                            </p>
                        </div>

                        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Success tips for contract professionals">
                            {contractTips.map((tipSet, index) => (
                                <li key={index} className="bg-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-border">
                                    <h3 className="text-xl font-bold text-foreground mb-6">{tipSet.category}</h3>

                                    <ul className="space-y-3 list-none text-left" aria-label={`Tips for ${tipSet.category}`}>
                                        {tipSet.tips.map((tip, idx) => (
                                            <li key={idx} className="text-sm text-foreground">
                                                • {tip}
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

export default ContractCareersClient;
