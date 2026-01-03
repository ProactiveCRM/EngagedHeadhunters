"use client";

import React from 'react';
import { Upload, CheckCircle, Users, Shield, Clock, ArrowRight, FileText, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const SubmitResumeClient = () => {
    const processSteps = [
        {
            step: 1,
            title: 'Submit Your Resume',
            description: 'Upload your resume and complete your professional profile'
        },
        {
            step: 2,
            title: 'Confidential Review',
            description: 'Our recruiters review your background and career goals'
        },
        {
            step: 3,
            title: 'Career Consultation',
            description: 'Connect with a specialist in your industry for personalized guidance'
        },
        {
            step: 4,
            title: 'Opportunity Matching',
            description: 'We match you with exclusive opportunities aligned with your goals'
        }
    ];

    const valueProps = [
        {
            icon: Shield,
            title: 'Confidential Handling',
            description: 'Your information is handled with the utmost discretion and professionalism'
        },
        {
            icon: Users,
            title: 'Industry Specialists',
            description: 'Work with recruiters who understand your industry and career path'
        },
        {
            icon: Award,
            title: 'Exclusive Opportunities',
            description: 'Access positions not posted on public job boards'
        },
        {
            icon: Clock,
            title: 'Quick Response',
            description: 'Expect to hear from us within a few business days'
        }
    ];

    const industries = [
        'Healthcare & Life Sciences',
        'Technology & Engineering',
        'Finance & Banking',
        'Manufacturing & Operations',
        'Sales & Business Development',
        'Executive Leadership'
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SkipNavigation />
            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-28 md:pt-32 bg-gradient-to-br from-muted to-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-left">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="mb-6">
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Career Opportunities
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                    Submit Your Resume for
                                    <span className="text-primary"> Exclusive Opportunities</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Take the first step toward your next career move. Our recruiters specialize in
                                    matching talented professionals with opportunities that align with their goals.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <a
                                        href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                                    >
                                        Schedule Career Consultation
                                        <ArrowRight className="ml-2" size={20} />
                                    </a>
                                    <a
                                        href="https://jobs.engagedheadhunters.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                                    >
                                        Browse Open Positions
                                    </a>
                                </div>

                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Shield className="mr-2" size={16} />
                                    Your information is confidential and never shared without your permission
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
                                    <div className="text-center mb-6">
                                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload className="text-primary" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Get Started?</h3>
                                        <p className="text-muted-foreground">
                                            Schedule a confidential career consultation to discuss your goals
                                        </p>
                                    </div>

                                    <div className="space-y-4 mb-6 text-left">
                                        <div className="text-sm font-semibold text-foreground">Industries we specialize in:</div>
                                        <div className="flex flex-wrap gap-2 text-left">
                                            {industries.map((industry, idx) => (
                                                <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
                                                    {industry}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                                    >
                                        Schedule Consultation
                                        <ArrowRight className="ml-2" size={20} />
                                    </a>

                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        By scheduling, you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and
                                        consent to be contacted about career opportunities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Steps */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                How It Works
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Our process is designed to understand your goals and match you with the right opportunities.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center relative">
                                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-primary-foreground font-bold text-xl">{step.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>

                                    {index < processSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Value Props */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Why Work With Us
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                We're not just another job board. We're career partners invested in your success.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {valueProps.map((prop, index) => (
                                <div key={index} className="bg-card rounded-xl p-8 text-center shadow-lg border border-border">
                                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <prop.icon className="text-primary-foreground" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{prop.title}</h3>
                                    <p className="text-muted-foreground">{prop.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Look For */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    Who We Work With
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    We partner with professionals at all career stages who are looking for their next opportunity.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-foreground">Experienced Professionals</h4>
                                            <p className="text-sm text-muted-foreground">Mid-career professionals looking to advance</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-foreground">Senior Leaders</h4>
                                            <p className="text-sm text-muted-foreground">Directors, VPs, and executives seeking new challenges</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-foreground">C-Suite Executives</h4>
                                            <p className="text-sm text-muted-foreground">CEOs, CFOs, CTOs, and other C-level leaders</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-foreground">Career Changers</h4>
                                            <p className="text-sm text-muted-foreground">Professionals transitioning to new industries or roles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-2xl p-8 text-left border border-border">
                                <h3 className="text-2xl font-bold text-foreground mb-6">What to Expect</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-2 rounded-lg mr-4 border border-primary/20">
                                            <FileText className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Resume Review</h4>
                                            <p className="text-sm text-muted-foreground">We'll review your background and provide feedback</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-2 rounded-lg mr-4 border border-primary/20">
                                            <Users className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Career Discussion</h4>
                                            <p className="text-sm text-muted-foreground">A conversation about your goals and preferences</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-2 rounded-lg mr-4 border border-primary/20">
                                            <Briefcase className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Opportunity Presentation</h4>
                                            <p className="text-sm text-muted-foreground">We'll present opportunities that match your criteria</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-2 rounded-lg mr-4 border border-primary/20">
                                            <Award className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Ongoing Support</h4>
                                            <p className="text-sm text-muted-foreground">Guidance throughout the interview and negotiation process</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection
                    variant="candidate"
                    title="Ready to Explore New Opportunities?"
                    description="Schedule a confidential career consultation with one of our recruiting specialists."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                    showJobsLink={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default SubmitResumeClient;
