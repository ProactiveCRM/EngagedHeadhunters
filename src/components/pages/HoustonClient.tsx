"use client";

import { Building, Users, Target, Award, MapPin, ArrowRight, CheckCircle, BarChart, Globe } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';

const HoustonClient = () => {
    const houstonStats = [
        { icon: Building, value: "2,500+", label: "Major Employers", description: "Fortune 500 companies headquartered in Houston" },
        { icon: Users, value: "3.2M", label: "Talent Pool", description: "Professionals in Greater Houston metro area" },
        { icon: Target, value: "Deep", label: "Market Expertise", description: "Comprehensive Houston market knowledge" },
        { icon: Award, value: "Proven", label: "Track Record", description: "Established presence in Houston's executive market" }
    ];

    const industries = [
        {
            name: "Energy & Oil",
            description: "Leading energy capital with major oil & gas companies",
            companies: ["ExxonMobil", "Shell", "BP America", "ConocoPhillips"]
        },
        {
            name: "Healthcare",
            description: "Texas Medical Center - world's largest medical complex",
            companies: ["MD Anderson", "Houston Methodist", "Memorial Hermann", "Texas Children's"]
        },
        {
            name: "Technology",
            description: "Growing tech hub with major corporate relocations",
            companies: ["Microsoft", "Google", "Amazon", "Meta"]
        },
        {
            name: "Manufacturing",
            description: "Industrial manufacturing and petrochemical processing",
            companies: ["Dow Chemical", "LyondellBasell", "Phillips 66", "Chevron Phillips"]
        }
    ];

    const marketInsights = [
        {
            title: "Talent Pool Analysis",
            insights: [
                "3.2M professionals in Greater Houston metropolitan area",
                "65% of executives open to new opportunities",
                "Strong talent pipeline from University of Houston and Rice University",
                "Lower cost of living attracts top talent from coastal markets"
            ]
        },
        {
            title: "Hiring Trends",
            insights: [
                "35% increase in executive searches in energy transition roles",
                "Healthcare leadership demand up 40% post-pandemic",
                "Technology roles growing 25% annually",
                "Average time-to-fill: 32 days (below national average)"
            ]
        },
        {
            title: "Salary Benchmarks",
            insights: [
                "CEO compensation: $850K - $2.5M+ (Energy sector leads)",
                "CFO compensation: $650K - $1.8M+ (15% above national average)",
                "VP-level roles: $300K - $800K+ depending on industry",
                "Cost of living 8% below national average drives competitive packages"
            ]
        }
    ];

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-muted to-background py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="mb-6">
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                    #1 Houston Recruiting Agency
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                Houston's Premier<br />
                                <span className="text-primary">Recruiting Agency</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Leading recruiting agency in Houston, Texas, specializing in executive search and professional staffing
                                across Energy, Healthcare, Technology, and Manufacturing sectors. Deep local market expertise with
                                global recruiting standards.
                            </p>

                            <div className="flex items-center mb-8">
                                <MapPin className="text-primary mr-2" size={20} />
                                <span className="text-muted-foreground">Serving Greater Houston Metropolitan Area</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="px-8">
                                    <a
                                        href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Start Houston Search
                                        <ArrowRight className="ml-2" size={20} />
                                    </a>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="px-8">
                                    <Link href="/salary-guide">View Market Report</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=600&h=400"
                                alt="Houston skyline"
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                                <div className="text-2xl font-bold">Expert</div>
                                <div className="text-primary-foreground/80">Houston Recruiters</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Houston Market Stats */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Houston Market Leadership
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                            As Houston's leading recruiting agency, we have unparalleled insight into the local talent market,
                            industry dynamics, and hiring trends that drive successful executive placements.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {houstonStats.map((stat, index) => (
                            <div key={index} className="bg-gradient-to-br from-card to-muted rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow border">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="text-primary" size={24} />
                                </div>
                                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                                <div className="text-lg font-semibold text-primary mb-2">{stat.label}</div>
                                <div className="text-sm text-muted-foreground">{stat.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Houston Industries */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Houston Industry Expertise
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                            Deep recruiting expertise across Houston's major industries, with established relationships
                            at leading companies and comprehensive understanding of local market dynamics.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {industries.map((industry, index) => (
                            <div key={index} className="bg-card rounded-xl p-8 shadow-lg border">
                                <h3 className="text-2xl font-bold text-foreground mb-4">{industry.name}</h3>
                                <p className="text-muted-foreground mb-6">{industry.description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-foreground mb-3">Major Partnerships:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {industry.companies.map((company, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                                {company}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Insights */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Houston Talent Market Insights
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                            Exclusive market intelligence and hiring data from Houston's leading recruiting agency,
                            giving you the competitive advantage in talent acquisition.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {marketInsights.map((insight, index) => (
                            <div key={index} className="bg-gradient-to-br from-muted to-background p-8 rounded-xl shadow-lg border">
                                <h3 className="text-xl font-bold text-foreground mb-6">{insight.title}</h3>
                                <div className="space-y-4">
                                    {insight.insights.map((item, idx) => (
                                        <div key={idx} className="flex items-start">
                                            <BarChart className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default HoustonClient;
