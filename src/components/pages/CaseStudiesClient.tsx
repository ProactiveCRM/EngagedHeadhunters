"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const CaseStudiesClient = () => {
    const caseStudies = [
        {
            id: 1,
            title: "Healthcare System Transformation",
            client: "Regional Healthcare Network",
            industry: "Healthcare",
            challenge: "450-bed hospital system needed a transformational CEO to lead digital modernization and improve patient outcomes while reducing costs.",
            solution: "Identified a seasoned healthcare executive with proven track record in digital transformation and operational efficiency improvements.",
            results: [
                "Significant reduction in operational costs within 12 months",
                "Notable improvement in patient satisfaction scores",
                "Successful implementation of AI-driven care coordination",
                "Reduced average length of stay"
            ],
            timeToFill: "28 days",
            placement: "CEO"
        },
        {
            id: 2,
            title: "FinTech Scaling Success",
            client: "Series B FinTech Startup",
            industry: "Technology",
            challenge: "Rapidly growing fintech company needed a CTO to scale engineering team while maintaining product quality and security.",
            solution: "Recruited a technology leader with experience scaling engineering organizations in highly regulated financial environments.",
            results: [
                "Successfully scaled engineering team significantly",
                "Reduced deployment time from weeks to hours",
                "Achieved SOC 2 Type II compliance",
                "Major increase in product development velocity"
            ],
            timeToFill: "21 days",
            placement: "CTO"
        },
        {
            id: 3,
            title: "Manufacturing Excellence",
            client: "Industrial Manufacturing Corp",
            industry: "Manufacturing",
            challenge: "500-employee manufacturing company needed a COO to implement lean manufacturing principles and reduce waste.",
            solution: "Found an operations executive with Six Sigma expertise and experience in lean transformation across multiple manufacturing environments.",
            results: [
                "Significant reduction in manufacturing waste",
                "Notable improvement in production efficiency",
                "Major reduction in defect rates",
                "Substantial annual cost savings achieved"
            ],
            timeToFill: "35 days",
            placement: "COO"
        },
        {
            id: 4,
            title: "Private Equity Portfolio Optimization",
            client: "Mid-Market Private Equity Fund",
            industry: "Finance",
            challenge: "PE fund needed experienced portfolio company CEOs for 3 acquisitions in different industries within 90 days.",
            solution: "Leveraged deep network to identify and place three industry-specific CEOs with proven track records in value creation.",
            results: [
                "All 3 CEO positions filled within 90-day deadline",
                "Portfolio companies achieved strong EBITDA growth",
                "Successful exits generating excellent return multiples",
                "Enhanced operational efficiency across all portfolio companies"
            ],
            timeToFill: "Average 32 days",
            placement: "3 CEOs"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <Navigation />
            <StickyCTA />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-20 bg-primary text-primary-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Proven Results That Drive Success
                            </h1>
                            <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto">
                                Real transformations. Measurable impact. Exceptional leadership placements that deliver
                                bottom-line results for organizations across industries.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Case Studies Grid */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                Success Stories That Speak for Themselves
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Challenge → Solution → Results. See how our executive placements have transformed
                                organizations and delivered measurable business impact.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {caseStudies.map((study) => (
                                <div key={study.id} className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                                    <div className="grid lg:grid-cols-3 gap-8 p-8">
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center mb-4">
                                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mr-3">
                                                    {study.industry}
                                                </span>
                                                <span className="text-muted-foreground">{study.placement} Placement</span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-foreground mb-3">{study.title}</h3>
                                            <p className="text-muted-foreground mb-2">{study.client}</p>

                                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                                <div>
                                                    <h4 className="font-semibold text-foreground mb-3 text-red-600">Challenge</h4>
                                                    <p className="text-muted-foreground text-sm">{study.challenge}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground mb-3 text-blue-600">Solution</h4>
                                                    <p className="text-muted-foreground text-sm">{study.solution}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-muted/30 rounded-lg p-6">
                                            <h4 className="font-semibold text-foreground mb-4 text-green-600">Results</h4>
                                            <ul className="space-y-2 mb-6 text-left">
                                                {study.results.map((result, idx) => (
                                                    <li key={idx} className="flex items-start text-sm">
                                                        <ArrowRight className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                                                        <span className="text-muted-foreground">{result}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="border-t border-border pt-4">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-primary">{study.timeToFill}</div>
                                                    <div className="text-sm text-muted-foreground">Time to Fill</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Write Your Success Story?
                        </h2>
                        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                            Join organizations that have transformed their leadership and achieved
                            exceptional results through our executive search expertise.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/contact"
                                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Start Your Search
                            </Link>
                            <Link
                                href="/agents"
                                className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Meet Our Team
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CaseStudiesClient;
