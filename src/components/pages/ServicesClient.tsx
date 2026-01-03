"use client";

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useAnalytics } from '@/hooks/useAnalytics';

const ServicesClient = () => {
    const { trackCTAClick } = useAnalytics();
    const services = [
        {
            slug: "executive-search",
            emoji: "🏢",
            title: "Executive Search",
            subtitle: "C-Suite & Leadership Hiring",
            description: "Board-level and C-suite recruitment for transformational leadership roles.",
            features: ["CEO/COO/CFO placement", "Board of Directors", "Succession planning", "Leadership assessment"],
            stats: { placements: "3,800+", avgSalary: "$650K", timeToFill: "60-90 days" }
        },
        {
            slug: "healthcare-staffing",
            emoji: "🏥",
            title: "Healthcare Staffing",
            subtitle: "Medical & Healthcare Recruiting",
            description: "Specialized healthcare professionals from nurses to hospital executives.",
            features: ["Hospital administration", "Nursing leadership", "Physician recruitment", "Healthcare IT"],
            stats: { placements: "5,000+", avgSalary: "$350K", timeToFill: "30-45 days" }
        },
        {
            slug: "technology-recruiting",
            emoji: "💻",
            title: "Technology Recruiting",
            subtitle: "IT & Tech Talent Acquisition",
            description: "Software engineers to CTOs for the digital transformation era.",
            features: ["Software development", "Cybersecurity", "AI/ML specialists", "Product leadership"],
            stats: { placements: "7,500+", avgSalary: "$425K", timeToFill: "20-35 days" }
        },
        {
            slug: "finance-recruiting",
            emoji: "💰",
            title: "Finance Recruiting",
            subtitle: "Financial Services Hiring",
            description: "Investment banking to wealth management across financial services.",
            features: ["Investment banking", "Private equity", "Risk management", "FinTech leadership"],
            stats: { placements: "4,200+", avgSalary: "$500K", timeToFill: "25-40 days" }
        },
        {
            slug: "manufacturing-recruiting",
            emoji: "🏭",
            title: "Manufacturing Recruiting",
            subtitle: "Industrial & Operations Hiring",
            description: "Operations leaders who optimize processes and drive innovation.",
            features: ["Plant management", "Supply chain", "Quality control", "Engineering leadership"],
            stats: { placements: "3,100+", avgSalary: "$325K", timeToFill: "35-50 days" }
        },
        {
            slug: "sales-recruiting",
            emoji: "📈",
            title: "Sales Recruiting",
            subtitle: "Sales & Business Development",
            description: "Revenue-driving sales professionals and business development leaders.",
            features: ["Sales leadership", "Business development", "Account management", "Channel partners"],
            stats: { placements: "6,200+", avgSalary: "$275K", timeToFill: "25-35 days" }
        },
        {
            slug: "contract-staffing",
            emoji: "⏱️",
            title: "Contract Staffing",
            subtitle: "Project & Contract Hiring",
            description: "Specialized contractors for project-based and interim positions.",
            features: ["Project management", "Interim executives", "Specialized consulting", "Technical contracts"],
            stats: { placements: "8,500+", avgSalary: "$150K", timeToFill: "10-20 days" }
        },
        {
            slug: "temporary-staffing",
            emoji: "👥",
            title: "Temporary Staffing",
            subtitle: "Short-term & Seasonal Staffing",
            description: "Flexible workforce solutions for peak demand and seasonal needs.",
            features: ["Seasonal workers", "Peak demand support", "Administrative staff", "Event staffing"],
            stats: { placements: "12,000+", avgSalary: "$65K", timeToFill: "5-15 days" }
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Needs Assessment",
            description: "Deep consultation to understand your specific requirements and organizational culture."
        },
        {
            step: "02",
            title: "Talent Sourcing",
            description: "Leverage our 500+ recruiter network to identify and engage top candidates."
        },
        {
            step: "03",
            title: "Candidate Evaluation",
            description: "Rigorous screening, assessment, and cultural fit analysis."
        },
        {
            step: "04",
            title: "Presentation & Interview",
            description: "Coordinated interview process with detailed candidate insights."
        }
    ];

    const guarantees = [
        { emoji: "🛡️", title: "180-Day Guarantee", description: "Full replacement guarantee on all executive placements" },
        { emoji: "⭐", title: "95% Success Rate", description: "Industry-leading placement success across all service lines" },
        { emoji: "🌍", title: "Nationwide Coverage", description: "500+ markets served with local expertise" },
        { emoji: "🎯", title: "30-Day Average", description: "Faster time-to-fill without compromising quality" }
    ];

    return (
        <div className="min-h-screen">
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com' },
                { name: 'Services', url: 'https://www.engagedheadhunters.com/services' }
            ]} />
            <Navigation />

            <main id="main-content">
                {/* Hero Section - Enhanced */}
                <section className="pt-28 md:pt-32 relative overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30" />

                    {/* Animated Decorations */}
                    <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-blob opacity-40" />
                    <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-blob opacity-30" style={{ animationDelay: '-5s' }} />

                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 1px, transparent 0)`,
                            backgroundSize: '50px 50px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                        <div className="text-center mb-16">
                            <div className="mb-6 animate-fade-in">
                                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                                    <span className="animate-pulse" role="img" aria-hidden="true">✨</span>
                                    Premier Staffing & Recruiting Services
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                                Comprehensive Staffing &<br />
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    Recruiting Services
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
                                From C-suite executives to specialized contractors, we deliver tailored staffing and recruiting
                                services across every industry and role level. Our proven methodology and extensive network
                                ensure you find the right talent, faster.
                            </p>

                            {/* Service Stats - Enhanced */}
                            <div className="grid md:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
                                <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                                    <div className="text-muted-foreground">Total Placements</div>
                                </div>
                                <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                                    <div className="text-muted-foreground">Markets Served</div>
                                </div>
                                <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-bold text-primary mb-2">8</div>
                                    <div className="text-muted-foreground">Service Specializations</div>
                                </div>
                                <div className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                                    <div className="text-muted-foreground">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid - Enhanced */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Specialized Recruiting Solutions
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                                Every industry has unique challenges. Our specialized recruiting services deliver
                                targeted solutions with deep industry expertise and proven results.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-20">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={`/services/${service.slug}`}
                                    className="group bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-border/50 hover:border-primary/30"
                                    onClick={() => trackCTAClick(service.title, `/services/${service.slug}`)}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300">
                                                <span className="text-3xl group-hover:scale-110 transition-transform duration-300" role="img" aria-hidden="true">{service.emoji}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                                <p className="text-primary font-semibold">{service.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-6">{service.description}</p>

                                    <div className="mb-6">
                                        <h4 className="font-semibold text-foreground mb-3">Key Specialties:</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-primary">{service.stats.placements}</div>
                                            <div className="text-xs text-muted-foreground">Placements</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-primary">{service.stats.avgSalary}</div>
                                            <div className="text-xs text-muted-foreground">Avg Salary</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-primary">{service.stats.timeToFill}</div>
                                            <div className="text-xs text-muted-foreground">Time to Fill</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section - Enhanced */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Our Proven Staffing Process
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Two decades of refinement have created a methodology that consistently
                                delivers exceptional results across all service lines.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="bg-card rounded-xl p-6 shadow-lg text-center border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                                    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                                        {step.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Guarantees Section - Enhanced */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Our Service Guarantees
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                We stand behind every placement with industry-leading guarantees and service standards.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {guarantees.map((guarantee, index) => (
                                <div key={index} className="text-center group">
                                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300" role="img" aria-hidden="true">{guarantee.emoji}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{guarantee.title}</h3>
                                    <p className="text-muted-foreground">{guarantee.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection
                    variant="employer"
                    title="Ready to Transform Your Hiring?"
                    description="Connect with our staffing specialists to discuss your specific needs and discover how we can accelerate your talent acquisition."
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                />
            </main>

            <Footer />
        </div>
    );
};

export default ServicesClient;
