"use client";

import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import GHLCalendarEmbed from '@/components/GHLCalendarEmbed';
import StickyCTA from '@/components/StickyCTA';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const HealthcareStaffingClient = () => {
    const healthcareRoles = [
        {
            title: "Hospital Administration",
            description: "C-suite healthcare executives who drive operational excellence and patient outcomes.",
            searchTime: "45-75 days"
        },
        {
            title: "Nursing Leadership",
            description: "Chief Nursing Officers and nursing directors who elevate care standards.",
            searchTime: "30-45 days"
        },
        {
            title: "Physician Recruitment",
            description: "Specialists and primary care physicians across all medical disciplines.",
            searchTime: "60-90 days"
        },
        {
            title: "Healthcare IT",
            description: "Technology leaders driving digital transformation in healthcare.",
            searchTime: "30-60 days"
        },
        {
            title: "Medical Device",
            description: "Sales and engineering professionals in medical technology.",
            searchTime: "25-45 days"
        },
        {
            title: "Pharmaceutical",
            description: "Research, development, and commercial leaders in pharma and biotech.",
            searchTime: "45-75 days"
        }
    ];

    const specialties = [
        "Hospital & Health System Leadership",
        "Nursing & Clinical Leadership",
        "Physician & Provider Recruitment",
        "Healthcare Technology & IT",
        "Medical Device & Equipment",
        "Pharmaceutical & Biotechnology",
        "Healthcare Finance & Operations",
        "Quality & Regulatory Affairs",
        "Population Health & Analytics",
        "Telemedicine & Digital Health"
    ];

    return (
        <div className="min-h-screen bg-background">
            <ServiceSchema
                name="Healthcare Staffing & Medical Recruiting"
                description="Specialized healthcare staffing and medical recruiting services for nursing leadership, hospital administration, and healthcare IT professionals."
                url="https://www.engagedheadhunters.com/healthcare-staffing"
                serviceType="Healthcare Staffing"
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
                { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
                { name: 'Healthcare Staffing', url: 'https://www.engagedheadhunters.com/healthcare-staffing' }
            ]} />

            <Navigation />
            <StickyCTA />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-24 bg-gradient-to-br from-muted to-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="mb-6">
                                    <Link href="/services" className="text-primary hover:text-primary/80 font-medium">
                                        ← Back to Services
                                    </Link>
                                </div>
                                <div className="mb-6">
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                        Healthcare Staffing Excellence
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                    Healthcare Staffing &<br />
                                    <span className="text-primary">Medical Recruiting</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Specialized healthcare professionals from nurses to hospital executives. Our healthcare recruiting
                                    experts understand the unique challenges of medical staffing and deliver the qualified professionals
                                    who improve patient outcomes and operational excellence.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                                        Start Healthcare Search
                                        <ArrowRight className="ml-2" size={20} />
                                    </Link>
                                    <Link href="/case-studies" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                                        View Success Stories
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=400"
                                    alt="Healthcare professionals"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                                    <div className="text-2xl font-bold">Healthcare</div>
                                    <div className="text-primary-foreground/80">Staffing Expertise</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Differentiators */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ul className="grid md:grid-cols-4 gap-8 text-center list-none">
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Proven</div>
                                <div className="text-muted-foreground">Healthcare Placement Success</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Fast</div>
                                <div className="text-muted-foreground">Time to Fill</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Deep</div>
                                <div className="text-muted-foreground">Healthcare Networks</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Placement</div>
                                <div className="text-muted-foreground">Guarantee</div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Healthcare Roles */}
                <section className="py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Healthcare Roles We Staff
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                                From front-line caregivers to C-suite healthcare executives, we place the qualified
                                professionals who drive exceptional patient care and operational performance.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 list-none">
                            {healthcareRoles.map((role, index) => (
                                <li key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">🏥</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6">{role.description}</p>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Typical Timeline:</span>
                                        <span className="text-sm font-semibold text-primary">{role.searchTime}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="text-center mt-8">
                            <p className="text-muted-foreground">
                                For compensation benchmarking, <Link href="/salary-guide" className="text-primary hover:underline">request our salary guide</Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Specialties */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-foreground mb-6">
                                    Healthcare Specialties We Serve
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Our healthcare recruiting specialists understand the complexities of medical staffing
                                    across all care settings and specialties, from acute care hospitals to emerging digital health companies.
                                </p>

                                <ul className="grid grid-cols-1 gap-3 list-none">
                                    {specialties.map((specialty, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                            <span className="text-foreground">{specialty}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-muted p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold text-foreground mb-6">Healthcare Recruiting Expertise</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🏥</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Licensed Healthcare Professionals</h4>
                                            <p className="text-muted-foreground text-sm">Credentialing, licensing, and compliance expertise</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🩺</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Clinical Specialties</h4>
                                            <p className="text-muted-foreground text-sm">Deep knowledge across all medical specialties</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">💊</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Healthcare Technology</h4>
                                            <p className="text-muted-foreground text-sm">Digital health and healthcare IT expertise</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🚀</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Rapid Deployment</h4>
                                            <p className="text-muted-foreground text-sm">Quick response for urgent healthcare staffing needs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schedule Consultation Section */}
                <section id="booking-calendar" className="py-20 bg-muted scroll-mt-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Schedule Your Consultation</h2>
                            <p className="text-muted-foreground">Book directly with our healthcare staffing team - no phone tag required.</p>
                        </div>
                        <GHLCalendarEmbed
                            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                            source="healthcare-staffing-page"
                        />
                    </div>
                </section>

                <CTASection
                    variant="employer"
                    title="Ready to Enhance Your Healthcare Team?"
                    description="Connect with our healthcare recruiting specialists to discuss your staffing needs and discover how we can deliver the qualified professionals your organization requires."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                />
            </main>

            <Footer />
        </div>
    );
};

export default HealthcareStaffingClient;
