"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { usePathnames, groupLocationsByRegion } from '@/hooks/useLocation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const LocationsClient = () => {
    const { data: locations, isLoading } = usePathnames();
    const regions = locations ? groupLocationsByRegion(locations) : [];

    const benefits = [
        {
            title: "Local Market Expertise",
            description: "Deep understanding of regional hiring trends, salary benchmarks, and industry dynamics.",
            emoji: "🎯"
        },
        {
            title: "Established Networks",
            description: "Strong relationships with local employers and professional talent pools in each market.",
            emoji: "👥"
        },
        {
            title: "Cultural Alignment",
            description: "Understanding of local business culture and what makes professionals successful in each region.",
            emoji: "⭐"
        },
        {
            title: "Rapid Response",
            description: "Local presence enables faster candidate identification and placement timelines.",
            emoji: "⏱️"
        }
    ];

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-muted to-background py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-6">
                            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                                Nationwide Service Areas
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                            Local Headhunters<br />
                            <span className="text-primary">Nationwide Coverage</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
                            Premier recruiting agency serving 50+ major metropolitan areas across the United States.
                            Local market expertise with national recruiting standards, delivering exceptional talent
                            solutions wherever your business operates.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="px-8">
                                <a
                                    href="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Find Local Recruiter
                                    <ArrowRight className="ml-2" size={20} />
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="px-8">
                                <Link href="/salary-guide">View Salary Guide</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Areas by Region */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Markets We Serve
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                            From major metropolitan areas to emerging markets, our local recruiting specialists
                            understand the unique dynamics of each region and deliver tailored talent solutions.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="space-y-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gradient-to-br from-muted to-background rounded-2xl p-8">
                                    <Skeleton className="h-8 w-32 mx-auto mb-8" />
                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {[1, 2, 3, 4].map((j) => (
                                            <Skeleton key={j} className="h-40" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {regions.map((region, regionIndex) => (
                                <div key={regionIndex} className="bg-gradient-to-br from-muted to-background rounded-2xl p-8 shadow-lg">
                                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{region.name}</h3>

                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {region.cities.map((city, cityIndex) => (
                                            <Link
                                                key={cityIndex}
                                                href={city.id === 'houston' ? '/houston' : `/locations/${city.id}`}
                                                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-foreground mb-1">
                                                            {city.display_name.split(',')[0]}
                                                        </h4>
                                                        <p className="text-muted-foreground text-sm">
                                                            Metro Population: {city.population || 'Growing'}
                                                        </p>
                                                    </div>
                                                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                                        <span className="text-xl" role="img" aria-hidden="true">📍</span>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="font-semibold text-foreground mb-2">Key Industries:</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(city.industries || []).map((industry, idx) => (
                                                            <span key={idx} className="bg-muted text-primary px-3 py-1 rounded-full text-xs font-medium">
                                                                {industry}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center pt-4 border-t border-border">
                                                    <ArrowRight className="text-primary" size={16} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Local Benefits */}
            <section className="py-20 bg-gradient-to-br from-muted to-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Why Choose Local Recruiting Expertise
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                            Local market knowledge combined with national recruiting standards delivers
                            superior results for both employers and candidates.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-card rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl" role="img" aria-hidden="true">{benefit.emoji}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default LocationsClient;
