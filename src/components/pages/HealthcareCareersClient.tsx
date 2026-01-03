"use client";

import { Search } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';
import CareerPageSEO from '@/components/seo/CareerPageSEO';

const HealthcareCareersClient = () => {
    const jobCategories = [
        {
            title: 'Physicians & Specialists',
            roles: ['Emergency Medicine', 'Cardiology', 'Oncology', 'Surgery', 'Internal Medicine']
        },
        {
            title: 'Nursing Leadership',
            roles: ['Nurse Manager', 'Clinical Director', 'CNO', 'Quality Manager', 'Charge Nurse']
        },
        {
            title: 'Healthcare Administration',
            roles: ['Hospital Administrator', 'Practice Manager', 'Revenue Cycle', 'Compliance Officer']
        },
        {
            title: 'Allied Health Professionals',
            roles: ['Physical Therapist', 'Pharmacist', 'Medical Technologist', 'Respiratory Therapist']
        }
    ];

    const careerPaths = [
        {
            level: 'Entry Level',
            roles: ['Medical Assistant', 'Health Information Technician', 'Patient Coordinator'],
            experience: '0-2 years'
        },
        {
            level: 'Mid-Level',
            roles: ['Registered Nurse', 'Medical Technologist', 'Clinical Coordinator'],
            experience: '2-5 years'
        },
        {
            level: 'Senior Level',
            roles: ['Nurse Manager', 'Department Director', 'Senior Physician'],
            experience: '5-10 years'
        },
        {
            level: 'Executive',
            roles: ['Chief Medical Officer', 'Hospital CEO', 'VP Clinical Operations'],
            experience: '10+ years'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <CareerPageSEO careerKey="healthcare-careers" />

            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-muted to-background pt-28 md:pt-32 pb-16" aria-label="Page introduction">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl mr-3" role="img" aria-hidden="true">🏥</span>
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Healthcare Careers
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                                    Advance Your Healthcare Career
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                                    Connect with leading healthcare organizations seeking medical professionals,
                                    administrators, and allied health specialists. Your next opportunity awaits.
                                </p>

                                {/* Search Bar */}
                                <div className="bg-card rounded-xl shadow-lg p-6 mb-8 border border-border">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <div className="relative">
                                                <label htmlFor="healthcare-job-search" className="sr-only">
                                                    Search healthcare job roles
                                                </label>
                                                <Search className="absolute left-3 top-3 text-muted-foreground" size={20} aria-hidden="true" />
                                                <input
                                                    id="healthcare-job-search"
                                                    type="text"
                                                    placeholder="Healthcare position or specialty"
                                                    aria-describedby="healthcare-search-hint"
                                                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                                                />
                                                <span id="healthcare-search-hint" className="sr-only">
                                                    Type to search for healthcare positions
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            href="https://jobs.engagedheadhunters.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Search healthcare jobs (opens in new tab)"
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
                                        aria-label="Browse all healthcare jobs (opens in new tab)"
                                        className="text-primary hover:text-primary/80 font-medium"
                                    >
                                        Browse All Healthcare Jobs →
                                    </a>
                                    <Link href="/salary-guide" className="text-primary hover:text-primary/80 font-medium">
                                        View Salary Guide →
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=400"
                                    alt="Healthcare professionals collaborating on patient care"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Categories */}
                <section className="py-20 bg-background" aria-labelledby="healthcare-categories-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="healthcare-categories-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Healthcare Job Categories
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Explore opportunities across all healthcare specialties and administrative roles.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-2 gap-8 list-none" aria-label="Healthcare job categories">
                            {jobCategories.map((category, index) => (
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

                {/* Career Paths */}
                <section className="py-20 bg-muted" aria-labelledby="healthcare-career-paths-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 id="healthcare-career-paths-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Healthcare Career Progression
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Chart your path from entry-level positions to healthcare leadership roles.
                            </p>
                        </div>

                        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none" aria-label="Healthcare career progression from entry-level to executive">
                            {careerPaths.map((path, index) => (
                                <li key={index} className="bg-card rounded-xl p-8 text-center border border-border text-foreground">
                                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">{index + 1}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-4">{path.level}</h3>

                                    <div className="mb-6">
                                        <div className="text-sm text-muted-foreground mb-2">Experience Required</div>
                                        <div className="font-semibold text-primary">{path.experience}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2 text-center">Typical Roles</div>
                                        <ul className="space-y-1 list-none" aria-label={`Typical roles at ${path.level} level`}>
                                            {path.roles.map((role, idx) => (
                                                <li key={idx} className="text-sm text-foreground">{role}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="text-center mt-8">
                            <Link href="/salary-guide" className="text-primary hover:text-primary/80 font-medium">
                                View compensation data by career level →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Browse Jobs CTA */}
                <section className="py-20 bg-background" aria-labelledby="healthcare-cta-heading">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 id="healthcare-cta-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Ready to Find Your Next Healthcare Role?
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Browse our current healthcare openings or connect with a recruiter for personalized career guidance.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://jobs.engagedheadhunters.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Browse all healthcare jobs (opens in new tab)"
                                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                            >
                                Browse All Healthcare Jobs
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
                    title="Ready to Take Your Healthcare Career to the Next Level?"
                    description="Connect with our healthcare recruiting specialists who understand your industry and can match you with the perfect opportunity."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                    showJobsLink={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default HealthcareCareersClient;
