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

const TechnologyRecruitingClient = () => {
    const techRoles = [
        {
            title: "Software Engineering",
            description: "Full-stack developers, architects, and engineering leaders driving innovation.",
            searchTime: "20-35 days"
        },
        {
            title: "Cybersecurity",
            description: "Security architects and professionals protecting digital assets.",
            searchTime: "25-40 days"
        },
        {
            title: "Data & Analytics",
            description: "Data scientists and engineers transforming data into insights.",
            searchTime: "20-35 days"
        },
        {
            title: "AI/ML Leadership",
            description: "Machine learning engineers and AI specialists leading transformation.",
            searchTime: "30-45 days"
        },
        {
            title: "Product Leadership",
            description: "Product managers and leaders defining technology strategy.",
            searchTime: "25-40 days"
        },
        {
            title: "Cloud Architecture",
            description: "Cloud engineers and architects scaling digital infrastructure.",
            searchTime: "20-30 days"
        }
    ];

    const specialties = [
        "Software Development & Engineering",
        "Cybersecurity & Information Security",
        "Data Science & Analytics",
        "Artificial Intelligence & Machine Learning",
        "Cloud Computing & DevOps",
        "Mobile & Web Development",
        "Product Management & Strategy",
        "Technology Leadership & CTO Roles",
        "IT Infrastructure & Operations",
        "Emerging Technologies (Blockchain, IoT)"
    ];

    return (
        <div className="min-h-screen bg-background">
            <ServiceSchema
                name="Technology Recruiting & IT Talent Acquisition"
                description="Expert technology recruiting services for software engineers, CTOs, data scientists, and IT leaders driving digital transformation."
                url="https://www.engagedheadhunters.com/technology-recruiting"
                serviceType="Technology Recruiting"
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
                { name: 'Services', url: 'https://www.engagedheadhunters.com/services' },
                { name: 'Technology Recruiting', url: 'https://www.engagedheadhunters.com/technology-recruiting' }
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
                                        Technology Recruiting Excellence
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                    Technology Recruiting &<br />
                                    <span className="text-primary">IT Talent Acquisition</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Software engineers to CTOs for the digital transformation era. Our technology recruiting
                                    specialists understand the rapidly evolving tech landscape and deliver the innovative
                                    professionals who drive technological advancement.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
                                        Start Tech Search
                                        <ArrowRight className="ml-2" size={20} />
                                    </Link>
                                    <Link href="/case-studies" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                                        View Case Studies
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400"
                                    alt="Technology professionals"
                                    loading="lazy"
                                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                                    <div className="text-2xl font-bold">Technology</div>
                                    <div className="text-primary-foreground/80">Recruiting Expertise</div>
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
                                <div className="text-muted-foreground">Tech Placement Success</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Fast</div>
                                <div className="text-muted-foreground">Time to Fill</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Deep</div>
                                <div className="text-muted-foreground">Tech Networks</div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold text-primary mb-2">Placement</div>
                                <div className="text-muted-foreground">Guarantee</div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Technology Roles */}
                <section className="py-20 bg-muted">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Technology Roles We Fill
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                                From emerging startups to Fortune 500 enterprises, we place the technology professionals
                                who build, secure, and scale digital solutions across every tech domain.
                            </p>
                        </div>

                        <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 list-none">
                            {techRoles.map((role, index) => (
                                <li key={index} className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-2xl" role="img" aria-hidden="true">💻</span>
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
                                    Technology Specialties We Serve
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Our technology recruiting specialists stay current with the latest trends and emerging
                                    technologies, ensuring we can identify and attract top talent across all technology domains.
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
                                <h3 className="text-2xl font-bold text-foreground mb-6">Technology Recruiting Expertise</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🔧</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Technical Assessment</h4>
                                            <p className="text-muted-foreground text-sm">Rigorous technical screening and coding evaluations</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">🛡️</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Security Clearance</h4>
                                            <p className="text-muted-foreground text-sm">Government and enterprise security cleared professionals</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">☁️</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Cloud Expertise</h4>
                                            <p className="text-muted-foreground text-sm">AWS, Azure, GCP certified professionals</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-xl mr-3 mt-1" role="img" aria-hidden="true">⚡</span>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Rapid Scaling</h4>
                                            <p className="text-muted-foreground text-sm">Quick team expansion for high-growth tech companies</p>
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
                            <p className="text-muted-foreground">Book directly with our technology recruiting team - no phone tag required.</p>
                        </div>
                        <GHLCalendarEmbed
                            bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                            source="technology-recruiting-page"
                        />
                    </div>
                </section>

                <CTASection
                    variant="employer"
                    title="Ready to Scale Your Technology Team?"
                    description="Connect with our technology recruiting specialists to discuss your hiring needs and discover how we can deliver the innovative professionals your organization requires."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                />
            </main>

            <Footer />
        </div>
    );
};

export default TechnologyRecruitingClient;
