"use client";

import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AgentAllianceComparison from '@/components/AgentAllianceComparison';
import AllianceApplicationForm from '@/components/AllianceApplicationForm';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Handshake,
    Target,
    Shield,
    Users,
    Calendar,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Building2,
    Globe,
    Briefcase,
    TrendingUp,
    AlertTriangle,
    Trophy,
    Lock,
    MessageSquare,
    Zap,
    X,
    Clock,
    DollarSign,
    FileText
} from 'lucide-react';
import Link from 'next/link';

const AllianceClient = () => {
    const applicationFormRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
        applicationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const valueProps = [
        {
            icon: Calendar,
            title: 'We Fill Your Calendar',
            description: 'Qualified appointments booked directly on YOUR calendar. Focus on closing, not cold calling.',
        },
        {
            icon: Building2,
            title: 'Your Brand, Your Business',
            description: 'Stay 100% independent. Your name, your clients, your reputation—we just provide the support.',
        },
        {
            icon: Target,
            title: 'Access Our Network',
            description: 'Tap into exclusive job orders from our client relationships that you wouldn\'t find on your own.',
        },
        {
            icon: Shield,
            title: 'Elite Resources',
            description: 'CRM, ATS, AI tools, social media automation, training—everything EH Agents get, you get.',
        },
    ];

    const howItWorks = [
        {
            step: '01',
            title: 'Apply to Join',
            description: 'Schedule a discovery call. We\'ll discuss your experience, goals, and how the Alliance can accelerate your success.',
        },
        {
            step: '02',
            title: 'Get Approved',
            description: 'We vet all Alliance Members to ensure a network of elite recruiting professionals.',
        },
        {
            step: '03',
            title: 'Onboard & Train',
            description: 'Access our full technology platform and training on the Build Don\'t Beg methodology.',
        },
        {
            step: '04',
            title: 'Start Receiving Appointments',
            description: 'We begin booking qualified opportunities directly on your calendar. You close the deals.',
        },
    ];

    const faqs = [
        {
            question: 'What\'s the difference between an EH Agent and Alliance Member?',
            answer: 'EH Agents build their business under the Engaged Headhunters brand at a lower cost entry point—ideal for recruiters getting started. Alliance Members keep their own brand and full business ownership—a premium tier with higher investment for established recruiters who want complete independence while accessing the same support, technology, and appointment-booking services.',
        },
        {
            question: 'Do I keep my existing clients?',
            answer: 'Absolutely. Your clients remain your clients. The Alliance gives you access to additional job orders from our network, plus the marketing support to attract new clients.',
        },
        {
            question: 'What technology do I get access to?',
            answer: 'Full access to our CRM, ATS, AI-powered sourcing tools, social media automation, performance analytics, and more. The same stack our internal team uses.',
        },
        {
            question: 'How do the booked appointments work?',
            answer: 'Our marketing team generates qualified leads and books discovery calls directly on your calendar. You show up, run the meeting, and close the deal.',
        },
        {
            question: 'What are the partnership terms?',
            answer: 'Terms are flexible and negotiated individually based on your experience level, niche, and goals. Schedule a discovery call to discuss specifics.',
        },
        {
            question: 'Can I transition from EH Agent to Alliance Member?',
            answer: 'Yes! EH Agents can transition to the Alliance when they\'re ready for full ownership and brand independence. Alliance membership is a premium tier with higher investment, designed for recruiters who want to build under their own name while still accessing our powerful support system.',
        },
    ];


    return (
        <div className="min-h-screen">
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com' },
                { name: 'Alliance', url: 'https://www.engagedheadhunters.com/alliance' }
            ]} />

            <Navigation />

            <main id="main-content" className="pt-20">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[hsl(var(--dark-navy))] via-[hsl(var(--dark-navy))] to-accent/20 dark:from-background dark:via-background dark:to-primary/10 text-white dark:text-foreground py-24 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_40%)]" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-accent/20 dark:bg-primary/20 border border-accent/30 dark:border-primary/30 rounded-full px-4 py-2 mb-6">
                                <Handshake className="w-4 h-4 text-accent dark:text-primary" />
                                <span className="text-sm font-medium text-white/90 dark:text-foreground/90">For Independent Recruiters</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white dark:text-foreground">
                                Keep Your Brand.{' '}
                                <span className="text-accent dark:text-primary">Gain Our Support.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/80 dark:text-muted-foreground mb-4 max-w-3xl mx-auto">
                                Join the Engaged Headhunters Alliance and stay 100% independent while we book qualified appointments directly on YOUR calendar.
                            </p>

                            <p className="text-lg text-white/70 dark:text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
                                Your name. Your clients. Your business. We just provide the same powerful support our EH Agents get.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="cta" onClick={scrollToForm} className="w-full sm:w-auto">
                                    Apply to Join
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <a href="#how-it-works">
                                    <Button size="lg" variant="heroOutline" className="w-full sm:w-auto">
                                        See How It Works
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Value Props */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                What Alliance Members Get
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                All the support of a major recruiting firm, without giving up your independence.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {valueProps.map((prop, index) => (
                                <Card key={index} className="bg-background border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant group">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                                            <prop.icon className="w-8 h-8 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-3">{prop.title}</h3>
                                        <p className="text-muted-foreground">{prop.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Simple process to get started. We handle the hard part—you focus on placing candidates.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {howItWorks.map((step, index) => (
                                <Card key={index} className="relative bg-background border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant">
                                    <CardContent className="pt-8 pb-6 px-6">
                                        <div className="text-5xl font-bold text-accent/20 mb-4">{step.step}</div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Join Now Section */}
                <section
                    aria-labelledby="why-join-now-heading"
                    className="py-20 bg-background"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 mb-6">
                                <AlertTriangle className="w-4 h-4 text-destructive" aria-hidden="true" />
                                <span className="text-sm font-medium text-destructive">Don't Miss Out</span>
                            </div>
                            <h2 id="why-join-now-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Why Join Now?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Every month you wait is another month of missed opportunities.
                            </p>
                        </div>

                        {/* Opportunity Cost Stats Bar */}
                        <div
                            className="bg-gradient-to-r from-destructive/5 via-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl p-6 md:p-8 mb-12"
                            role="region"
                            aria-label="Opportunity cost statistics"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <DollarSign className="w-6 h-6 text-destructive" aria-hidden="true" />
                                        <span className="text-3xl md:text-4xl font-bold text-destructive">$50K+</span>
                                    </div>
                                    <p className="text-foreground font-medium">Lost Revenue</p>
                                    <p className="text-sm text-muted-foreground">annually on average</p>
                                </div>
                                <div className="text-center border-y md:border-y-0 md:border-x border-destructive/20 py-6 md:py-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Clock className="w-6 h-6 text-destructive" aria-hidden="true" />
                                        <span className="text-3xl md:text-4xl font-bold text-destructive">100+</span>
                                    </div>
                                    <p className="text-foreground font-medium">Hours Wasted</p>
                                    <p className="text-sm text-muted-foreground">cold outreach monthly</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <TrendingUp className="w-6 h-6 text-destructive" aria-hidden="true" />
                                        <span className="text-3xl md:text-4xl font-bold text-destructive">40%</span>
                                    </div>
                                    <p className="text-foreground font-medium">Lower Response</p>
                                    <p className="text-sm text-muted-foreground">without AI-powered tools</p>
                                </div>
                            </div>
                        </div>

                        {/* What You're Missing Pain Points Grid */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                                What You're Missing
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-6" aria-label="Comparison of recruiting with and without Alliance">
                                {[
                                    {
                                        without: 'Cold calling for hours each week',
                                        with: 'Qualified appointments booked on your calendar',
                                    },
                                    {
                                        without: 'Low response rates on outreach',
                                        with: 'AI-powered messaging with 40%+ response rates',
                                    },
                                    {
                                        without: 'Missing premium job orders',
                                        with: 'Access to exclusive client relationships',
                                    },
                                    {
                                        without: 'No marketing support or brand visibility',
                                        with: 'Full social media automation & content',
                                    },
                                ].map((item, index) => (
                                    <li key={index} className="bg-muted/30 rounded-xl p-6 border border-border">
                                        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-border">
                                            <div className="flex-shrink-0 w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                                                <X className="w-4 h-4 text-destructive" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium text-destructive uppercase tracking-wide">Without Alliance</span>
                                                <p className="text-foreground line-through opacity-70">{item.without}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium text-primary uppercase tracking-wide">With Alliance</span>
                                                <p className="text-foreground font-medium">{item.with}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Founding Member Benefits */}
                        <div
                            className="bg-gradient-to-br from-accent/5 via-background to-primary/5 border border-accent/30 rounded-2xl p-8 md:p-10 mb-12"
                            role="region"
                            aria-labelledby="founding-member-heading"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-4">
                                    <Trophy className="w-4 h-4 text-accent" aria-hidden="true" />
                                    <span className="text-sm font-bold text-accent uppercase tracking-wide">Limited Opportunity</span>
                                </div>
                                <h3 id="founding-member-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                    Be a Founding Alliance Member
                                </h3>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Join now and lock in exclusive benefits only available to our first Alliance partners.
                                </p>
                            </div>

                            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Founding member benefits">
                                {[
                                    {
                                        icon: Trophy,
                                        title: 'Founding Member Status',
                                        description: 'Recognized as an original Alliance partner',
                                    },
                                    {
                                        icon: Lock,
                                        title: 'Launch Pricing Locked In',
                                        description: 'Best rates guaranteed for life',
                                    },
                                    {
                                        icon: Target,
                                        title: 'Priority Territory',
                                        description: 'Choose your niche before others',
                                    },
                                    {
                                        icon: MessageSquare,
                                        title: 'Direct Input on Features',
                                        description: 'Help shape the tools we build',
                                    },
                                ].map((benefit, index) => (
                                    <li key={index} className="bg-background/80 rounded-xl p-6 border border-accent/20 text-center hover:border-accent/40 transition-colors">
                                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <benefit.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                                        </div>
                                        <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Urgency CTA Banner */}
                        <div
                            className="relative bg-[hsl(var(--dark-navy))] dark:bg-card rounded-2xl p-8 md:p-10 text-center overflow-hidden"
                            role="region"
                            aria-labelledby="urgency-cta-heading"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_70%)]" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                    </span>
                                    <span className="text-sm font-bold text-accent uppercase tracking-wide">Limited Founding Member Spots</span>
                                </div>
                                <h3 id="urgency-cta-heading" className="text-2xl md:text-3xl font-bold text-white dark:text-foreground mb-4">
                                    We're Carefully Selecting Our First Alliance Members
                                </h3>
                                <p className="text-white/80 dark:text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    Early partners get the best territories and locked-in pricing. Don't miss your window to transform your recruiting business.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" variant="cta" onClick={scrollToForm} className="w-full sm:w-auto">
                                        <Zap className="w-5 h-5 mr-2" aria-hidden="true" />
                                        Apply Now
                                    </Button>
                                    <a href="#how-it-works">
                                        <Button size="lg" variant="heroOutline" className="w-full sm:w-auto">
                                            Learn More First
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Alliance vs. EH Agent
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                See exactly what you get with each path—and what's included in both.
                            </p>
                        </div>

                        <AgentAllianceComparison showCTAs={true} />
                    </div>
                </section>

                {/* Meet Our Alliance Members */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Meet Our Alliance Members
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                            Connect with elite recruiters who are part of our Alliance network.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/agents">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                                    View All Recruiters
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/recruiter-signup">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Become an Agent
                                    <Users className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} className="bg-background border-border">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Application Form Section */}
                <section
                    id="apply"
                    ref={applicationFormRef}
                    className="py-20 bg-background scroll-mt-24"
                    aria-labelledby="application-form-heading"
                >
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                                <span className="text-sm font-medium text-primary">Alliance Application</span>
                            </div>
                            <h2 id="application-form-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Apply to Join the Alliance
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Complete the form below and we'll review your application within 24 hours.
                            </p>
                        </div>

                        <Card className="bg-background border-border shadow-elegant">
                            <CardContent className="p-6 md:p-8">
                                <AllianceApplicationForm />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Keep Your Brand and Grow Your Business?
                        </h2>
                        <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
                            Apply now to discuss how the Alliance can help you place more candidates while staying 100% independent.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="hero" onClick={scrollToForm} className="w-full sm:w-auto">
                                Apply to Join
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link href="/for-recruiters">
                                <Button size="lg" variant="heroOutline" className="w-full sm:w-auto">
                                    Compare All Options
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AllianceClient;
