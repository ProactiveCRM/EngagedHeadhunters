"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import StickyCTA from '@/components/StickyCTA';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const ContractStaffingClient = () => {
    return (
        <div className="min-h-screen bg-background">
            <ServiceSchema
                name="Contract Staffing & Project-Based Hiring"
                description="Flexible contract staffing solutions for project-based and interim positions with specialized contractors."
                url="https://www.engagedheadhunters.com/contract-staffing"
                serviceType="Contract Staffing"
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
                { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
                { name: 'Contract Staffing', url: 'https://www.engagedheadhunters.com/contract-staffing' }
            ]} />

            <Navigation />
            <StickyCTA />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-24 bg-gradient-to-br from-muted to-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <Link href="/services" className="text-primary hover:text-primary/80 font-medium mb-6 inline-block">
                                ← Back to Services
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                Contract Staffing &<br />
                                <span className="text-primary">Project & Contract Hiring</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
                                Specialized contractors for project-based and interim positions. Our contract staffing solutions provide flexible workforce options for specialized projects and interim leadership needs.
                            </p>
                            <div className="flex justify-center gap-4 mb-12">
                                <Link
                                    href="/contract-careers"
                                    className="text-primary hover:text-primary/80 font-medium underline"
                                >
                                    View Contract Opportunities →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schedule Consultation Section */}
                <section id="booking-calendar" className="py-20 bg-background scroll-mt-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Schedule Your Consultation</h2>
                            <p className="text-muted-foreground">Book directly with our contract staffing team - no phone tag required.</p>
                        </div>
                        <GHLCalendarEmbed
                            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                            source="contract-staffing-page"
                        />
                    </div>
                </section>

                <CTASection
                    variant="employer"
                    title="Ready to Access Contract Talent?"
                    description="Connect with our contract staffing specialists to discuss your project needs and discover how we can deliver the specialized professionals your organization requires."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                />
            </main>

            <Footer />
        </div>
    );
};

export default ContractStaffingClient;
