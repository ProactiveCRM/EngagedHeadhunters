"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import StickyCTA from '@/components/StickyCTA';
import FAQSchema from '@/components/seo/FAQSchema';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ArrowRight } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const CandidatesClient = () => {
    const { trackCTAClick } = useAnalytics();
    const painPoints = [
        {
            emoji: "⚠️",
            problem: "Applying into the void",
            description: "Dozens of applications. No responses. Your resume is sitting in an ATS black hole with 500 others."
        },
        {
            emoji: "⚠️",
            problem: "Stuck at your current ceiling",
            description: "You've maxed out where you are. No clear path up. Less qualified people getting promoted."
        },
        {
            emoji: "⚠️",
            problem: "Underpaid and undervalued",
            description: "You know you're worth more. You just don't know how to prove it or where the better opportunities exist."
        }
    ];

    const benefits = [
        {
            emoji: "👁️",
            title: "Access Hidden Opportunities",
            description: "The best positions never get posted. Companies hire search firms to find talent quietly. When you're in our network, those opportunities find you."
        },
        {
            emoji: "👥",
            title: "An Advocate Behind Closed Doors",
            description: "We advocate for you in conversations you'll never hear. We know what companies really want and position you to win."
        },
        {
            emoji: "💰",
            title: "Know Your Market Value",
            description: "We have real-time compensation data on what people like you are earning. Stop guessing—know exactly what to ask for."
        },
        {
            emoji: "🔒",
            title: "Completely Confidential",
            description: "Your current employer will never know you're exploring. We protect your privacy throughout the entire process."
        },
        {
            emoji: "🎯",
            title: "Matched to Your Goals",
            description: "We don't spam you with irrelevant roles. We only reach out when we have something that actually fits what you're looking for."
        },
        {
            emoji: "📈",
            title: "Career Strategy, Not Just Placement",
            description: "We help you think long-term. Sometimes the right move isn't obvious—we help you see the bigger picture."
        }
    ];

    const services = [
        {
            title: "Executive Opportunities",
            description: "C-suite, VP, and Director-level positions at companies actively looking for your expertise.",
            items: ["Confidential leadership searches", "Board positions", "Senior management roles"]
        },
        {
            title: "Market Intelligence",
            description: "Real data about what's happening in your industry and what you should be earning.",
            items: ["Compensation benchmarking", "Industry trends", "Company insights"]
        },
        {
            title: "Career Guidance",
            description: "Honest advice about your next move—even if that means staying put for now.",
            items: ["Resume positioning", "Interview preparation", "Offer negotiation"]
        }
    ];

    const faqs = [
        {
            question: "Is your service really free for candidates?",
            answer: "Yes. Companies pay our fees—candidates never pay anything. Our success depends on making great matches, so there's no cost to you for accessing our network and opportunities."
        },
        {
            question: "Will my current employer find out I'm looking?",
            answer: "No. We maintain strict confidentiality throughout the process. We never contact your current employer or share your information without explicit permission. Your search stays private."
        },
        {
            question: "What types of roles do you fill?",
            answer: "We focus on senior-level positions: C-suite executives, VPs, Directors, and specialized leadership roles. Industries include healthcare, technology, finance, and manufacturing."
        },
        {
            question: "How is working with a recruiter different from applying directly?",
            answer: "When you apply directly, you're competing with hundreds of applicants. When a recruiter presents you, you're a pre-vetted, recommended candidate with an advocate in your corner. We also have access to positions that are never publicly posted."
        },
        {
            question: "What if I'm not actively looking right now?",
            answer: "That's fine. Many of our best placements come from professionals who weren't actively searching. We can keep you informed about opportunities that match your criteria and reach out when something compelling comes up."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <FAQSchema faqs={faqs} />
            <Navigation />
            <StickyCTA />

            <main id="main-content" className="text-foreground">
                {/* Hero Section - Enhanced */}
                <section className="pt-24 pb-20 relative overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />

                    {/* Animated Decorations */}
                    <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-blob opacity-40" />
                    <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-blob opacity-30" style={{ animationDelay: '-5s' }} />

                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0)`,
                            backgroundSize: '50px 50px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6 animate-fade-in">
                                <span className="text-sm animate-pulse" role="img" aria-hidden="true">✨</span>
                                <span className="text-sm font-semibold text-primary">For Senior Professionals</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 animate-fade-in leading-tight" style={{ animationDelay: '100ms' }}>
                                The Best Jobs Aren't Posted.{' '}
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    They're Offered.
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: '200ms' }}>
                                Top opportunities go to people who know the right people. If you're tired of competing with 500 applicants and getting ghosted by ATS systems, there's a better approach.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                                <Button
                                    asChild
                                    size="lg"
                                    className="text-lg px-8 py-6 shadow-brand hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                                    onClick={() => trackCTAClick('Start Confidential Search', 'booking')}
                                >
                                    <a href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call" target="_blank" rel="noopener noreferrer">
                                        Start a Confidential Search
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-6 hover:bg-primary/5 backdrop-blur-sm"
                                    onClick={() => trackCTAClick('Browse Open Positions', 'jobs')}
                                >
                                    <a href="https://jobs.engagedheadhunters.com" target="_blank" rel="noopener noreferrer">
                                        <span className="mr-2" role="img" aria-hidden="true">💼</span>
                                        Browse Open Positions
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="py-16 bg-destructive/5 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-foreground mb-12">
                            Sound Familiar?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {painPoints.map((point, index) => (
                                <div key={index} className="bg-card rounded-xl p-6 border border-destructive/20 text-left">
                                    <span className="text-3xl mb-4 block" role="img" aria-hidden="true">{point.emoji}</span>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{point.problem}</h3>
                                    <p className="text-muted-foreground">{point.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20 bg-background text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Why Senior Professionals Work With Search Firms
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
                                You don't find the best opportunities—they find you.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow text-left">
                                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-2xl" role="img" aria-hidden="true">{benefit.emoji}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                What You Get
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                Everything we do for candidates is free. Companies pay us—you benefit.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-card rounded-xl p-8 border border-border text-left">
                                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground mb-6">{service.description}</p>
                                    <ul className="space-y-2">
                                        {service.items.map((item, iIndex) => (
                                            <li key={iIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="text-primary shrink-0" role="img" aria-hidden="true">✅</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-background text-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Common Questions
                            </h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                                    <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-left">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* Trust Indicators */}
                <section className="py-16 bg-muted/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-foreground">
                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">🔒</span>
                                <p className="font-medium text-foreground">Completely Confidential</p>
                                <p className="text-sm text-muted-foreground">Your search stays private</p>
                            </div>
                            <div>
                                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">💰</span>
                                <p className="font-medium text-foreground">Always Free</p>
                                <p className="text-sm text-muted-foreground">For candidates</p>
                            </div>
                            <div>
                                <span className="text-3xl block mx-auto mb-2" role="img" aria-hidden="true">🎯</span>
                                <p className="font-medium text-foreground">Matched to You</p>
                                <p className="text-sm text-muted-foreground">No spam, just fit</p>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection
                    variant="candidate"
                    title="The Best Roles Go to People Who Know the Right People"
                    description="Let us open doors for you."
                    showJobsLink={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default CandidatesClient;
