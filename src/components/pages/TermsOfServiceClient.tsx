"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const TermsOfServiceClient = () => {
    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <Navigation />

            <main id="main-content" className="pt-20">
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                Terms of Service
                            </h1>
                            <p className="text-xl text-muted-foreground transition-colors">
                                Last updated: January 1, 2025
                            </p>
                        </div>

                        <Card className="bg-card text-card-foreground border-border shadow-md">
                            <CardContent className="p-8 space-y-8">
                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        By accessing or using Engaged Headhunters' services, you agree to be bound by these
                                        Terms of Service ("Terms"). If you disagree with any part of these terms, you may
                                        not access our services.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        Engaged Headhunters provides executive search and recruiting services, including:
                                    </p>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                        <li>C-Suite and senior executive search</li>
                                        <li>Board of Directors placement</li>
                                        <li>Succession planning consultation</li>
                                        <li>Interim leadership placement</li>
                                        <li>Retained search services</li>
                                        <li>Market intelligence and salary benchmarking</li>
                                    </ul>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Client Obligations</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Information Accuracy</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Clients must provide accurate, complete, and current information about position
                                                requirements, company culture, and compensation packages.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Exclusivity</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                For retained searches, clients agree to work exclusively with Engaged Headhunters
                                                for the agreed-upon period and not engage other search firms for the same position.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Timely Response</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Clients commit to reviewing candidates and providing feedback within agreed timeframes
                                                to maintain search momentum.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Candidate Obligations</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Truthful Information</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Candidates must provide accurate employment history, educational background,
                                                and other relevant information.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Confidentiality</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Candidates agree to maintain confidentiality regarding client information
                                                and opportunities presented.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Professional Conduct</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Candidates commit to professional behavior throughout the search process
                                                and prompt communication regarding their status.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Fees and Payment</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Retained Search Fees</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Fees are typically one-third of the placed candidate's first-year total compensation
                                                and are paid in three installments: upon assignment commencement, shortlist presentation,
                                                and successful placement.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Expenses</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Reasonable expenses including travel, accommodation, and research costs are
                                                billed separately with client approval.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Payment Terms</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Invoices are due within 30 days of receipt. Late payments may incur interest charges.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Guarantee Period</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We provide a 12-month guarantee on all placements. If a placed candidate leaves
                                        or is terminated for cause within this period, we will conduct a replacement search
                                        at no additional fee, subject to the same terms and conditions.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Confidentiality</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        All parties agree to maintain strict confidentiality regarding proprietary information,
                                        candidate details, and client information shared during the search process. This
                                        obligation survives termination of our relationship.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Engaged Headhunters' liability is limited to the fees paid for services. We are not
                                        liable for indirect, incidental, or consequential damages. Our obligation is to
                                        conduct professional searches, not to guarantee specific outcomes.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Intellectual Property</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        All methodologies, processes, and materials developed by Engaged Headhunters remain
                                        our intellectual property. Client-specific deliverables become the property of the
                                        client upon full payment.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Termination</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Either party may terminate the engagement with 30 days' written notice. Upon termination,
                                        all outstanding fees become due, and confidentiality obligations remain in effect.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        These Terms are governed by the laws of the Commonwealth of Virginia. Any disputes will be resolved
                                        through binding arbitration in Virginia Beach, Virginia.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        For questions about these Terms of Service, please contact:
                                    </p>
                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                                        <p className="text-foreground font-medium">Engaged Headhunters</p>
                                        <p className="text-muted-foreground">249 Central Park Ave Suite 300-90</p>
                                        <p className="text-muted-foreground">Virginia Beach, VA 23462</p>
                                        <p className="text-muted-foreground">Phone: (757) 720-7173</p>
                                    </div>
                                </section>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfServiceClient;
