"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import CTASection from '@/components/CTASection';
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

const NichePageClient = () => {
    const { niche } = useParams();

    const nicheData = {
        healthcare: {
            emoji: "🏥",
            title: "Healthcare",
            description: "Transform patient care through exceptional leadership",
            problem: "Healthcare organizations face unprecedented challenges: rising costs, staffing shortages, regulatory complexity, and the need for digital transformation while maintaining quality patient care.",
            solution: "Our healthcare recruiting specialists understand the unique demands of healthcare leadership. We identify executives who can navigate complex regulatory environments, drive operational efficiency, and lead digital transformation while never losing sight of patient outcomes.",
            placements: "5,000+",
            avgSalary: "$350K",
            avgTimeToFill: "28 days",
            successRate: "95%",
            specialties: ["Hospital Administration", "Pharmaceutical Leadership", "Medical Devices", "Healthcare IT", "Clinical Research", "Senior Living", "Mental Health", "Telehealth"],
            processSteps: [
                {
                    title: "Healthcare Market Analysis",
                    description: "Deep dive into healthcare trends, regulatory changes, and organizational challenges specific to your segment."
                },
                {
                    title: "Leadership Assessment",
                    description: "Comprehensive evaluation of clinical expertise, operational acumen, and cultural fit within healthcare environments."
                },
                {
                    title: "Stakeholder Alignment",
                    description: "Coordination with medical staff, board members, and regulatory bodies to ensure seamless leadership transitions."
                }
            ],
            featuredAgent: {
                name: "James Pemberton",
                title: "Founder & CEO - Expert Headhunter",
                image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
                rating: 5.0,
                placements: 500,
                calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            }
        },
        technology: {
            emoji: "💻",
            title: "Technology",
            description: "Drive digital transformation with visionary tech leaders",
            problem: "Technology companies struggle to find leaders who can scale rapidly, navigate complex technical architectures, manage global teams, and stay ahead of constantly evolving digital landscapes.",
            solution: "Our technology recruiting team combines deep technical knowledge with executive search expertise. We identify leaders who understand both the technical and business sides of technology, from AI and cloud architecture to product strategy and user experience.",
            placements: "7,500+",
            avgSalary: "$425K",
            avgTimeToFill: "25 days",
            successRate: "97%",
            specialties: ["Software Engineering", "Product Leadership", "AI/ML", "Cybersecurity", "Cloud Architecture", "DevOps", "Data Science", "Mobile Development"],
            processSteps: [
                {
                    title: "Technical Assessment",
                    description: "Rigorous evaluation of technical expertise, architectural thinking, and ability to lead engineering organizations."
                },
                {
                    title: "Innovation Leadership",
                    description: "Assessment of product vision, market understanding, and ability to drive technological innovation at scale."
                },
                {
                    title: "Scaling Expertise",
                    description: "Evaluation of experience building and scaling high-performance technology teams in fast-growth environments."
                }
            ],
            featuredAgent: {
                name: "James Pemberton",
                title: "Founder & CEO - Expert Headhunter",
                image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
                rating: 5.0,
                placements: 500,
                calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            }
        },
        finance: {
            emoji: "💰",
            title: "Finance",
            description: "Build world-class finance and accounting leadership teams",
            problem: "Financial services organizations need leaders who can navigate complex regulations, drive profitability, manage risk, and lead digital transformation in an increasingly competitive landscape.",
            solution: "Our finance recruiting specialists bring deep expertise in banking, insurance, investment management, and corporate finance. We identify CFOs, controllers, and finance executives who combine technical expertise with strategic vision.",
            placements: "3,200+",
            avgSalary: "$380K",
            avgTimeToFill: "30 days",
            successRate: "94%",
            specialties: ["CFO Search", "Investment Banking", "Private Equity", "Corporate Finance", "Risk Management", "Compliance", "Treasury", "Financial Planning"],
            processSteps: [
                {
                    title: "Financial Acumen Assessment",
                    description: "Rigorous evaluation of financial expertise, strategic thinking, and track record of driving business results."
                },
                {
                    title: "Regulatory Knowledge",
                    description: "Assessment of compliance expertise and ability to navigate complex financial regulations."
                },
                {
                    title: "Stakeholder Management",
                    description: "Evaluation of experience working with boards, investors, and cross-functional leadership teams."
                }
            ],
            featuredAgent: {
                name: "James Pemberton",
                title: "Founder & CEO - Expert Headhunter",
                image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
                rating: 5.0,
                placements: 500,
                calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            }
        },
        manufacturing: {
            emoji: "🏭",
            title: "Manufacturing",
            description: "Optimize operations with proven manufacturing leaders",
            problem: "Manufacturing companies face pressure to modernize operations, implement automation, manage supply chains, and develop sustainable practices while maintaining quality and efficiency.",
            solution: "Our manufacturing recruiting team understands the unique challenges of industrial leadership. We identify executives who can drive operational excellence, implement lean principles, and lead Industry 4.0 transformation.",
            placements: "2,800+",
            avgSalary: "$320K",
            avgTimeToFill: "32 days",
            successRate: "93%",
            specialties: ["Plant Management", "Supply Chain", "Quality Control", "Operations Excellence", "Lean Manufacturing", "Engineering Leadership", "EHS Management", "Automation"],
            processSteps: [
                {
                    title: "Operational Assessment",
                    description: "Evaluation of operational expertise, lean manufacturing experience, and track record of efficiency improvements."
                },
                {
                    title: "Technical Leadership",
                    description: "Assessment of engineering background and ability to drive technological advancement in manufacturing."
                },
                {
                    title: "Safety & Compliance",
                    description: "Verification of EHS expertise and commitment to workplace safety and regulatory compliance."
                }
            ],
            featuredAgent: {
                name: "James Pemberton",
                title: "Founder & CEO - Expert Headhunter",
                image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
                rating: 5.0,
                placements: 500,
                calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            }
        },
        sales: {
            emoji: "📈",
            title: "Sales",
            description: "Accelerate revenue growth with elite sales leadership",
            problem: "Companies struggle to find sales leaders who can build high-performing teams, develop winning strategies, and consistently exceed revenue targets in competitive markets.",
            solution: "Our sales recruiting specialists identify revenue leaders who combine strategic vision with hands-on execution. We find executives who can build teams, develop processes, and drive sustainable growth.",
            placements: "4,100+",
            avgSalary: "$340K",
            avgTimeToFill: "26 days",
            successRate: "96%",
            specialties: ["VP of Sales", "Chief Revenue Officer", "Sales Operations", "Business Development", "Enterprise Sales", "Channel Sales", "Sales Enablement", "Customer Success"],
            processSteps: [
                {
                    title: "Revenue Track Record",
                    description: "Deep analysis of past performance, quota attainment, and ability to build and scale sales organizations."
                },
                {
                    title: "Leadership Style",
                    description: "Assessment of team-building capabilities, coaching approach, and ability to develop high-performing sales cultures."
                },
                {
                    title: "Strategic Thinking",
                    description: "Evaluation of market strategy, go-to-market expertise, and ability to adapt to changing market conditions."
                }
            ],
            featuredAgent: {
                name: "James Pemberton",
                title: "Founder & CEO - Expert Headhunter",
                image: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
                rating: 5.0,
                placements: 500,
                calendlyUrl: "https://crm.engagedheadhunters.com/widget/bookings/request-talent"
            }
        }
    };

    const currentNiche = nicheData[niche as keyof typeof nicheData] || nicheData.healthcare;

    const seoDescription = `Expert ${currentNiche.title.toLowerCase()} recruiting and executive search services. ${currentNiche.description}. ${currentNiche.placements} placements with ${currentNiche.successRate} success rate.`;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SkipNavigation />
            <ServiceSchema
                name={`${currentNiche.title} Recruiting & Executive Search`}
                description={seoDescription}
                url={`https://www.engagedheadhunters.com/niches/${niche}`}
                serviceType={`${currentNiche.title} Recruiting`}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://www.engagedheadhunters.com/' },
                { name: 'Niches', url: 'https://www.engagedheadhunters.com/niches' },
                { name: `${currentNiche.title} Recruiting`, url: `https://www.engagedheadhunters.com/niches/${niche}` }
            ]} />
            <Navigation />
            <StickyCTA />

            <main id="main-content">
                {/* Hero Section */}
                <section className="pt-20 bg-primary text-primary-foreground text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-left">
                                <div className="flex items-center mb-6">
                                    <div className="bg-primary-foreground/20 w-20 h-20 rounded-full flex items-center justify-center mr-4 border border-primary-foreground/10">
                                        <span className="text-4xl" role="img" aria-hidden="true">{currentNiche.emoji}</span>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{currentNiche.title} Recruiting</h1>
                                        <p className="text-xl text-primary-foreground/90">{currentNiche.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                    <div className="text-3xl font-bold mb-2 text-white">{currentNiche.placements}</div>
                                    <div className="text-primary-foreground/80">Placements</div>
                                </div>
                                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                    <div className="text-3xl font-bold mb-2 text-white">{currentNiche.avgSalary}</div>
                                    <div className="text-primary-foreground/80">Avg. Salary</div>
                                </div>
                                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                    <div className="text-3xl font-bold mb-2 text-white">{currentNiche.avgTimeToFill}</div>
                                    <div className="text-primary-foreground/80">Avg. Fill Time</div>
                                </div>
                                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                    <div className="text-3xl font-bold mb-2 text-white">{currentNiche.successRate}</div>
                                    <div className="text-primary-foreground/80">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Problem/Solution Section */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="bg-card text-card-foreground rounded-xl p-8 border border-border shadow-sm text-left">
                                <h2 className="text-3xl font-bold text-foreground mb-6">The Challenge</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">{currentNiche.problem}</p>
                            </div>
                            <div className="bg-card text-card-foreground rounded-xl p-8 border border-border shadow-sm text-left">
                                <h2 className="text-3xl font-bold text-foreground mb-6">Our Solution</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">{currentNiche.solution}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specialties Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                {currentNiche.title} Specialties
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
                                Deep expertise across every critical function within the {currentNiche.title.toLowerCase()} industry.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {currentNiche.specialties.map((specialty, index) => (
                                <div key={index} className="bg-card text-card-foreground rounded-lg p-6 border border-border shadow-sm text-center font-medium">
                                    <span className="text-2xl block mx-auto mb-3" role="img" aria-hidden="true">✅</span>
                                    <h3 className="font-semibold text-foreground">{specialty}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-20 bg-background text-foreground">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                Our {currentNiche.title} Search Process
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
                                A specialized approach tailored to the unique demands of {currentNiche.title.toLowerCase()} leadership.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {currentNiche.processSteps.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 border-2 border-primary/20">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Agent Section */}
                <section className="py-20 bg-card text-card-foreground border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                Your {currentNiche.title} Specialist
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
                                Work directly with our founder who understands the {currentNiche.title.toLowerCase()} industry inside and out.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="bg-background text-foreground rounded-xl p-8 border border-border shadow-md">
                                <div className="flex items-start space-x-6 text-left">
                                    <img
                                        src={currentNiche.featuredAgent.image}
                                        alt={currentNiche.featuredAgent.name}
                                        loading="lazy"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-foreground mb-1">{currentNiche.featuredAgent.name}</h3>
                                        <p className="text-primary font-semibold mb-2">{currentNiche.featuredAgent.title}</p>
                                        <div className="flex items-center mb-4">
                                            <Star className="text-yellow-500 fill-current" size={18} />
                                            <span className="ml-1 font-semibold">{currentNiche.featuredAgent.rating}</span>
                                            <span className="ml-4 text-muted-foreground">{currentNiche.featuredAgent.placements}+ placements</span>
                                        </div>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            With over 20 years of executive search experience, James specializes in finding transformational leaders across multiple industries.
                                        </p>
                                        <div className="flex space-x-4">
                                            <Link
                                                href="/james-pemberton"
                                                className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-semibold text-center transition-colors border border-border"
                                            >
                                                View Profile
                                            </Link>
                                            <a
                                                href={currentNiche.featuredAgent.calendlyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded-lg font-semibold text-center transition-colors inline-flex items-center justify-center shadow-sm"
                                            >
                                                <Calendar className="mr-2" size={16} />
                                                Book Consultation
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection
                    variant="hybrid"
                    title={`Ready to Find Your Next ${currentNiche.title} Leader?`}
                    description={`Connect with our ${currentNiche.title.toLowerCase()} recruiting specialists to discuss your hiring needs.`}
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/request-talent"
                    showJobsLink={true}
                />
            </main>

            <Footer />
        </div>
    );
};

export default NichePageClient;
