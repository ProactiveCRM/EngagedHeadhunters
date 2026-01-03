"use client";

import { useState, useEffect } from 'react';
import {
    DollarSign,
    TrendingUp,
    BarChart3,
    FileText,
    CheckCircle,
    Users,
    ArrowRight,
    Loader2,
    ShieldCheck,
    Globe,
    Lock,
    Search,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { ServiceSchema } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SkipNavigation } from '@/components/navigation/SkipNavigation';

interface SalaryResult {
    role: string;
    location: string;
    experienceLevel: string;
    industry: string;
    baseSalary: {
        low: number;
        mid: number;
        high: number;
        currency: string;
    };
    totalCompensation: {
        low: number;
        mid: number;
        high: number;
        currency: string;
        includes: string[];
    };
    marketPosition: string;
    bonusRange: string;
    insights: string[];
    dataSource: string;
    disclaimer: string;
}

const SalaryGuideClient = () => {
    const [formData, setFormData] = useState({
        role: '',
        location: 'Houston, TX',
        experienceLevel: '6-10',
        industry: 'Technology',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SalaryResult | null>(null);
    const [showResults, setShowResults] = useState(false);

    const industries = [
        { name: 'Healthcare', description: 'Medical professionals, administrators, and clinical leadership' },
        { name: 'Technology', description: 'Software engineering, IT leadership, and technology executives' },
        { name: 'Finance', description: 'Banking, investment, and corporate finance' },
        { name: 'Manufacturing', description: 'Operations, quality, and industrial leadership' },
        { name: 'Sales', description: 'Base salary, commission structures, and OTE benchmarks' },
        { name: 'Executive', description: 'C-suite and board-level total compensation packages' }
    ];

    const locations = [
        'Houston, TX', 'Dallas, TX', 'Austin, TX', 'San Antonio, TX',
        'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL',
        'Boston, MA', 'Seattle, WA', 'Denver, CO', 'Atlanta, GA',
        'Miami, FL', 'Phoenix, AZ', 'Other'
    ];

    const experienceLevels = [
        { value: '0-2', label: '0-2 Years (Entry Level)' },
        { value: '3-5', label: '3-5 Years (Mid Level)' },
        { value: '6-10', label: '6-10 Years (Senior)' },
        { value: '10+', label: '10+ Years (Executive)' }
    ];

    const reportBenefits = [
        {
            icon: BarChart3,
            title: 'Market-Accurate Data',
            description: 'Real compensation data from actual placements, not just self-reported surveys.'
        },
        {
            icon: TrendingUp,
            title: 'Trend Analysis',
            description: 'Understand how compensation is trending in your specific industry and vertical.'
        },
        {
            icon: Users,
            title: 'Competitive Benchmarking',
            description: 'See how your compensation compares to regional and national market rates.'
        },
        {
            icon: FileText,
            title: 'Negotiation Support',
            description: 'Data-backed insights to support salary negotiations and retention strategies.'
        }
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.role.trim()) {
            toast.error('Please enter a job title/role');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('salary-lookup', {
                body: {
                    role: formData.role,
                    location: formData.location,
                    experienceLevel: formData.experienceLevel,
                    industry: formData.industry,
                    userEmail: formData.email || null
                }
            });

            if (error) throw error;

            if (data?.success && data?.data) {
                setResult(data.data);
                setShowResults(true);
                toast.success('Salary data generated successfully!');
                window.scrollTo({ top: 100, behavior: 'smooth' });
            } else {
                throw new Error('Invalid response from salary lookup');
            }
        } catch (err) {
            console.error('Error fetching salary data:', err);
            toast.error('Failed to generate salary data. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function formatCurrency(value: number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <SkipNavigation />
            <ServiceSchema
                name="Executive Compensation Analysis"
                description="Market-accurate salary data and compensation benchmarks for executive and professional roles"
                url="https://www.engagedheadhunters.com/salary-guide"
                serviceType="Compensation Consulting"
            />
            <Navigation />

            <main id="main-content">
                {/* Hero Section */}
                <section className="relative pt-28 md:pt-40 pb-20 overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,_var(--honolulu-blue)_0%,_transparent_50%)] opacity-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,_var(--bright-orange)_0%,_transparent_40%)] opacity-10" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-left"
                            >
                                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                                    <ShieldCheck size={14} />
                                    <span>Confidential & Accurate</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                                    Executive
                                    <span className="text-primary block"> Salary Guide</span>
                                </h1>
                                <p className="text-xl text-slate-400 mb-8 max-w-xl">
                                    Stop guessing. Harness real-time placement data to benchmark compensation,
                                    win negotiations, and scale your leadership team with precision.
                                </p>

                                {!showResults && (
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <Button asChild size="lg" className="h-14 px-8 text-lg shadow-glow">
                                            <Link href="#salary-tool">
                                                Generate My Report
                                                <ArrowRight className="ml-2" size={20} />
                                            </Link>
                                        </Button>
                                        <div className="flex -space-x-3 items-center">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                                </div>
                                            ))}
                                            <span className="ml-4 text-sm text-slate-400">Joined by 1,200+ leaders this month</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Tool Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                id="salary-tool"
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <Card className="relative bg-slate-900 border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
                                    <AnimatePresence mode="wait">
                                        {!showResults ? (
                                            <motion.div
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="p-8"
                                            >
                                                <div className="mb-8">
                                                    <h3 className="text-2xl font-bold text-white mb-2">Configure Your Report</h3>
                                                    <p className="text-slate-400">Get specific benchmarks for your unique profile.</p>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-5">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="role" className="text-slate-300">Job Title / Role *</Label>
                                                        <div className="relative">
                                                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                            <Input
                                                                id="role"
                                                                value={formData.role}
                                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                                placeholder="e.g., VP Operating, CFO, Tech Lead"
                                                                required
                                                                className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:ring-primary h-12"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="industry" className="text-slate-300">Industry</Label>
                                                            <select
                                                                id="industry"
                                                                value={formData.industry}
                                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                                className="w-full h-12 px-3 rounded-md border border-slate-700 bg-slate-800/50 text-white focus:ring-primary focus:border-primary outline-none"
                                                            >
                                                                {industries.map(ind => (
                                                                    <option key={ind.name} value={ind.name}>{ind.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="experience" className="text-slate-300">Experience</Label>
                                                            <select
                                                                id="experience"
                                                                value={formData.experienceLevel}
                                                                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                                                className="w-full h-12 px-3 rounded-md border border-slate-700 bg-slate-800/50 text-white focus:ring-primary focus:border-primary outline-none"
                                                            >
                                                                {experienceLevels.map(level => (
                                                                    <option key={level.value} value={level.value}>{level.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="location" className="text-slate-300">Target Location</Label>
                                                        <select
                                                            id="location"
                                                            value={formData.location}
                                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                            className="w-full h-12 px-3 rounded-md border border-slate-700 bg-slate-800/50 text-white focus:ring-primary focus:border-primary outline-none"
                                                        >
                                                            {locations.map(loc => (
                                                                <option key={loc} value={loc}>{loc}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="email" className="text-slate-300">Work Email (for detailed PDF copy)</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            placeholder="name@company.com"
                                                            className="bg-slate-800/50 border-slate-700 text-white h-12"
                                                        />
                                                    </div>

                                                    <Button type="submit" className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg font-bold transition-all" disabled={loading}>
                                                        {loading ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                                Analyzing Market Data...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Compare Salary Now
                                                                <ArrowRight className="ml-2" size={20} />
                                                            </>
                                                        )}
                                                    </Button>
                                                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">
                                                        <Lock className="inline mr-1" size={10} /> Secure & Encrypted Data
                                                    </p>
                                                </form>
                                            </motion.div>
                                        ) : result && (
                                            <motion.div
                                                key="results"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-8"
                                            >
                                                <div className="flex justify-between items-start mb-8">
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Market Intelligence</h3>
                                                        <p className="text-primary font-medium">{result.role}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => { setShowResults(false); setResult(null); }} className="border-slate-700 text-slate-400 hover:text-white">
                                                        Edit Parameters
                                                    </Button>
                                                </div>

                                                <div className="space-y-8">
                                                    <div className="grid grid-cols-3 gap-1 divide-x divide-slate-800 bg-slate-800/30 rounded-xl overflow-hidden py-6 border border-slate-800">
                                                        <div className="px-4 text-center">
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">25th Percentile</p>
                                                            <p className="text-xl font-bold text-white">{formatCurrency(result.baseSalary.low)}</p>
                                                        </div>
                                                        <div className="px-4 text-center border-primary/20">
                                                            <p className="text-[10px] text-primary uppercase font-bold mb-2">Target Median</p>
                                                            <p className="text-3xl font-black text-primary">{formatCurrency(result.baseSalary.mid)}</p>
                                                        </div>
                                                        <div className="px-4 text-center">
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">75th Percentile</p>
                                                            <p className="text-xl font-bold text-white">{formatCurrency(result.baseSalary.high)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                            <TrendingUp size={80} />
                                                        </div>
                                                        <div className="relative z-10">
                                                            <p className="text-sm text-slate-400 mb-1">Total Recommended Compensation (OTE)</p>
                                                            <p className="text-4xl font-bold text-white mb-4">
                                                                {formatCurrency(result.totalCompensation.low)} - {formatCurrency(result.totalCompensation.high)}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {result.totalCompensation.includes.map(item => (
                                                                    <span key={item} className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 font-bold uppercase tracking-wider">{item}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {result.insights.map((insight, idx) => (
                                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                                                <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={16} />
                                                                <p className="text-sm text-slate-300">{insight}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="pt-4">
                                                        <Button asChild className="w-full h-14 bg-white text-slate-950 hover:bg-slate-200 font-black text-lg group shadow-xl shadow-primary/10">
                                                            <a href="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call" target="_blank" rel="noopener noreferrer">
                                                                Request Official Valuation
                                                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                                            </a>
                                                        </Button>
                                                        <p className="text-[10px] text-slate-500 mt-4 italic text-center leading-relaxed">
                                                            {result.disclaimer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Trust & Methodology Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                                    The Science Behind Our
                                    <span className="text-primary"> Intelligence</span>
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed">
                                    Unlike generic job board data, our benchmarks are pulled from active placement cycles,
                                    executive negotiations, and verified offer letters in your specific market.
                                </p>
                            </div>
                            <div className="flex items-center gap-6 text-slate-400">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-900">10k+</p>
                                    <p className="text-xs uppercase tracking-widest font-bold">Data Points</p>
                                </div>
                                <div className="h-10 w-px bg-slate-200" />
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-900">48h</p>
                                    <p className="text-xs uppercase tracking-widest font-bold">Refresh Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {reportBenefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10 }}
                                    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                        <benefit.icon className="text-primary group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industry Breakdown Section */}
                <section className="py-24 bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-white mb-6">Sectors We Master</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                                We maintain specialized compensation desks for these core disciplines,
                                ensuring deeper insight than generalist firms.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                            {industries.map((industry, index) => (
                                <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-primary/50 transition-all group cursor-default">
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20">
                                                <DollarSign className="text-primary" size={24} />
                                            </div>
                                            <ArrowRight className="text-slate-700 group-hover:text-primary transition-colors translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" size={20} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{industry.name}</h3>
                                        <p className="text-slate-400 leading-relaxed text-sm">{industry.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    variant="candidate"
                    title="Unlock Your True Market Value"
                    description="Standard reports only tell part of the story. Our search consultants can walk you through the nuances of equity, bonuses, and leverage in the current cycle."
                    primaryButtonText="Schedule Private Strategy Session"
                    bookingUrl="https://crm.engagedheadhunters.com/widget/bookings/confidential-career-call"
                    showJobsLink={false}
                />
            </main>

            <Footer />
        </div>
    );
};

export default SalaryGuideClient;
