"use client";

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const PrivacyPolicyClient = () => {
    return (
        <div className="min-h-screen bg-background">
            <SkipNavigation />
            <Navigation />

            <main id="main-content" className="pt-20">
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                Privacy Policy
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Last updated: January 1, 2025
                            </p>
                        </div>

                        <Card className="bg-card text-card-foreground border-border shadow-md">
                            <CardContent className="p-8 space-y-8">
                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Engaged Headhunters ("we," "our," or "us") is committed to protecting your privacy.
                                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                                        when you use our executive search and recruiting services.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                                            <p className="text-muted-foreground leading-relaxed mb-2">
                                                We may collect personal information that you provide directly to us, including:
                                            </p>
                                            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                                                <li>Name, email address, and phone number</li>
                                                <li>Professional background and employment history</li>
                                                <li>Resume and portfolio materials</li>
                                                <li>References and recommendations</li>
                                                <li>Salary expectations and compensation information</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Company Information</h3>
                                            <p className="text-muted-foreground leading-relaxed mb-2">
                                                For our corporate clients, we may collect:
                                            </p>
                                            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                                                <li>Company name and industry information</li>
                                                <li>Job descriptions and requirements</li>
                                                <li>Organizational structure and culture details</li>
                                                <li>Budget and timeline information</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        We use the information we collect for various purposes, including:
                                    </p>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                        <li>Providing executive search and recruiting services</li>
                                        <li>Matching candidates with appropriate opportunities</li>
                                        <li>Communicating with clients and candidates</li>
                                        <li>Conducting background checks and reference verification</li>
                                        <li>Improving our services and developing new offerings</li>
                                        <li>Complying with legal obligations</li>
                                    </ul>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            We do not sell, trade, or otherwise transfer your personal information to third parties
                                            without your consent, except as described in this Privacy Policy:
                                        </p>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">With Clients</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We share candidate information with potential employers only with explicit consent
                                                and after determining mutual interest.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Service Providers</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We may engage trusted third-party service providers to assist with background checks,
                                                reference verification, and other recruiting-related services.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Legal Requirements</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                We may disclose information when required by law or to protect our rights and safety.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We implement appropriate technical and organizational security measures to protect your
                                        personal information against unauthorized access, alteration, disclosure, or destruction.
                                        These measures include encryption, secure servers, and access controls.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We retain personal information for as long as necessary to provide our services and
                                        fulfill the purposes outlined in this Privacy Policy. Candidate information may be
                                        retained for future opportunities unless you request removal.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        You have certain rights regarding your personal information:
                                    </p>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                        <li>Access to your personal information</li>
                                        <li>Correction of inaccurate information</li>
                                        <li>Deletion of your information (subject to legal obligations)</li>
                                        <li>Restriction of processing</li>
                                        <li>Data portability</li>
                                        <li>Withdrawal of consent</li>
                                    </ul>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Storage and Processing</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Your information is stored and processed in the United States. We implement
                                        appropriate safeguards to protect your data in compliance with applicable federal
                                        and Virginia state data protection laws.
                                    </p>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        If you have questions about this Privacy Policy or wish to exercise your rights,
                                        please contact us at:
                                    </p>
                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                                        <p className="text-foreground font-medium">Engaged Headhunters</p>
                                        <p className="text-muted-foreground">249 Central Park Ave Suite 300-90</p>
                                        <p className="text-muted-foreground">Virginia Beach, VA 23462</p>
                                        <p className="text-muted-foreground">Phone: (757) 720-7173</p>
                                    </div>
                                </section>

                                <Separator className="bg-border" />

                                <section className="text-left">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We may update this Privacy Policy from time to time. We will notify you of any
                                        material changes by posting the new Privacy Policy on our website and updating
                                        the "Last updated" date.
                                    </p>
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

export default PrivacyPolicyClient;
